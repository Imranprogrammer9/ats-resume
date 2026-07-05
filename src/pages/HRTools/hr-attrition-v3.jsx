import { useState, useCallback, useEffect } from "react";

// ─── GOOGLE SHEETS — replace with your Apps Script URL ───────────────────────
const SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const LS = {
  get: (k) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del: (k) => { try { localStorage.removeItem(k); } catch {} },
};

// ─── ASSESSMENT DATA ──────────────────────────────────────────────────────────
const FACTORS = [
  {
    id: "engagement", label: "Employee Engagement", icon: "💬", weight: 0.25, color: "#38bdf8",
    questions: [
      { id: "q1", text: "What was the employee's last engagement survey score?", options: [
        { label: "8–10 · Highly Engaged", score: 1 },
        { label: "5–7 · Moderately Engaged", score: 4 },
        { label: "3–4 · Low Engagement", score: 7 },
        { label: "0–2 · Actively Disengaged", score: 10 },
        { label: "No survey taken", score: 6 },
      ]},
      { id: "q2", text: "How actively does this employee participate in team meetings?", options: [
        { label: "Always contributes ideas", score: 1 },
        { label: "Sometimes participates", score: 4 },
        { label: "Rarely speaks up", score: 7 },
        { label: "Frequently absent from meetings", score: 10 },
      ]},
      { id: "q3", text: "Has the employee volunteered for new projects in the last 6 months?", options: [
        { label: "Yes, multiple times", score: 1 },
        { label: "Once or twice", score: 4 },
        { label: "Only when asked", score: 6 },
        { label: "Never", score: 10 },
      ]},
    ],
  },
  {
    id: "salary", label: "Salary Competitiveness", icon: "💰", weight: 0.20, color: "#34d399",
    questions: [
      { id: "q1", text: "How does the employee's salary compare to market rate for their role?", options: [
        { label: "10%+ above market", score: 1 },
        { label: "At market rate", score: 3 },
        { label: "5–10% below market", score: 6 },
        { label: "10–20% below market", score: 8 },
        { label: "20%+ below market", score: 10 },
      ]},
      { id: "q2", text: "When did this employee last receive a salary raise?", options: [
        { label: "Within last 6 months", score: 1 },
        { label: "6–12 months ago", score: 3 },
        { label: "1–2 years ago", score: 6 },
        { label: "More than 2 years ago", score: 9 },
        { label: "Never received a raise", score: 10 },
      ]},
      { id: "q3", text: "Has the employee raised compensation concerns?", options: [
        { label: "No concerns raised", score: 1 },
        { label: "Mentioned casually once", score: 4 },
        { label: "Raised formally once", score: 7 },
        { label: "Raised multiple times", score: 10 },
      ]},
    ],
  },
  {
    id: "growth", label: "Career Growth", icon: "📈", weight: 0.15, color: "#fbbf24",
    questions: [
      { id: "q1", text: "When was the employee's last promotion or role advancement?", options: [
        { label: "Within last year", score: 1 },
        { label: "1–2 years ago", score: 3 },
        { label: "2–3 years ago", score: 6 },
        { label: "3–5 years ago", score: 8 },
        { label: "Never promoted", score: 10 },
      ]},
      { id: "q2", text: "Does the employee have an active Individual Development Plan (IDP)?", options: [
        { label: "Yes, actively followed", score: 1 },
        { label: "Yes, but rarely reviewed", score: 5 },
        { label: "No IDP in place", score: 8 },
        { label: "No growth path expressed", score: 10 },
      ]},
      { id: "q3", text: "How satisfied is the employee with career growth opportunities here?", options: [
        { label: "Very satisfied", score: 1 },
        { label: "Somewhat satisfied", score: 4 },
        { label: "Neutral / Uncertain", score: 6 },
        { label: "Dissatisfied", score: 8 },
        { label: "Very dissatisfied / Looking elsewhere", score: 10 },
      ]},
    ],
  },
  {
    id: "absenteeism", label: "Attendance", icon: "📅", weight: 0.15, color: "#a78bfa",
    questions: [
      { id: "q1", text: "How many unplanned absences in the last 3 months?", options: [
        { label: "0 absences", score: 1 },
        { label: "1–2 absences", score: 3 },
        { label: "3–4 absences", score: 6 },
        { label: "5–6 absences", score: 8 },
        { label: "7+ absences", score: 10 },
      ]},
      { id: "q2", text: "How is the employee's punctuality and on-time arrival?", options: [
        { label: "Always on time", score: 1 },
        { label: "Occasionally late (1–2×/month)", score: 4 },
        { label: "Frequently late (weekly)", score: 7 },
        { label: "Chronic lateness / pattern", score: 10 },
      ]},
      { id: "q3", text: "Is there a concerning pattern in absences (e.g. Mondays, before reviews)?", options: [
        { label: "No pattern detected", score: 1 },
        { label: "Slight pattern noticed", score: 5 },
        { label: "Clear pattern, under monitoring", score: 8 },
        { label: "Confirmed pattern, HR involved", score: 10 },
      ]},
    ],
  },
  {
    id: "manager", label: "Manager Relationship", icon: "👤", weight: 0.15, color: "#f472b6",
    questions: [
      { id: "q1", text: "How would you rate the quality of manager feedback this employee receives?", options: [
        { label: "Regular, constructive feedback", score: 1 },
        { label: "Occasional feedback only", score: 4 },
        { label: "Rare or inconsistent", score: 7 },
        { label: "No meaningful feedback given", score: 10 },
      ]},
      { id: "q2", text: "Has there been any recorded conflict between employee and manager?", options: [
        { label: "No conflicts", score: 1 },
        { label: "Minor disagreement, resolved", score: 3 },
        { label: "Ongoing tension reported", score: 7 },
        { label: "Formal complaint filed", score: 10 },
      ]},
      { id: "q3", text: "Based on 1-on-1s, how is the employee's trust in leadership?", options: [
        { label: "High trust, feels supported", score: 1 },
        { label: "Moderate trust", score: 4 },
        { label: "Low trust, skeptical", score: 7 },
        { label: "No trust, disengaged", score: 10 },
      ]},
    ],
  },
  {
    id: "training", label: "Learning & Dev", icon: "🎓", weight: 0.10, color: "#fb923c",
    questions: [
      { id: "q1", text: "What % of assigned training has the employee completed this year?", options: [
        { label: "90–100% completed", score: 1 },
        { label: "60–89% completed", score: 3 },
        { label: "30–59% completed", score: 6 },
        { label: "Less than 30% completed", score: 9 },
        { label: "0% — no training taken", score: 10 },
      ]},
      { id: "q2", text: "How does the employee respond to learning opportunities?", options: [
        { label: "Actively seeks new skills", score: 1 },
        { label: "Participates when scheduled", score: 4 },
        { label: "Needs encouragement", score: 6 },
        { label: "Resistant or indifferent", score: 9 },
      ]},
      { id: "q3", text: "Is there a growing skill gap vs. current role requirements?", options: [
        { label: "No gap — skills match or exceed role", score: 1 },
        { label: "Minor gap, being addressed", score: 4 },
        { label: "Moderate gap, plan needed", score: 7 },
        { label: "Significant gap, performance impacted", score: 10 },
      ]},
    ],
  },
];

const RISK = {
  LOW:      { label: "LOW RISK",      color: "#22c55e", bg: "#052e16", border: "#166534", summary: "Employee is stable. Sustain what's working with regular recognition and career conversations.", steps: ["Schedule quarterly check-ins to maintain momentum", "Recognise achievements in team settings", "Discuss 12-month career goals proactively", "Benchmark compensation at next review cycle"] },
  MODERATE: { label: "MODERATE RISK", color: "#fbbf24", bg: "#1c1500", border: "#92400e", summary: "Early warning signs detected. Proactive intervention within 30 days can prevent escalation.", steps: ["Schedule a stay interview this month", "Review salary vs. market benchmarks immediately", "Create or refresh the employee's IDP", "Move 1-on-1s to bi-weekly cadence", "Assign a meaningful stretch project"] },
  HIGH:     { label: "HIGH RISK",     color: "#f97316", bg: "#1c0a00", border: "#9a3412", summary: "Significant flight risk. Take action within 1–2 weeks or departure becomes likely.", steps: ["Immediate manager intervention — do not delay", "Conduct a confidential stay interview within 7 days", "Escalate compensation review to HR leadership", "Identify internal mobility or promotion opportunities", "Begin quiet succession planning for this role"] },
  CRITICAL: { label: "CRITICAL RISK", color: "#ef4444", bg: "#1c0000", border: "#991b1b", summary: "Exit likely imminent. Emergency retention measures or transition planning must begin today.", steps: ["Escalate to HR Director and Department Head today", "Assemble an emergency retention package", "Arrange exit-prevention meeting with senior leadership", "Activate succession plan immediately", "Begin knowledge transfer documentation now"] },
};

function getRisk(score) {
  if (score <= 3) return { key: "LOW", ...RISK.LOW };
  if (score <= 6) return { key: "MODERATE", ...RISK.MODERATE };
  if (score <= 8) return { key: "HIGH", ...RISK.HIGH };
  return { key: "CRITICAL", ...RISK.CRITICAL };
}

function calcScores(answers) {
  return FACTORS.map(f => {
    const qs = f.questions.filter(q => answers[f.id]?.[q.id] !== undefined);
    const avg = qs.length ? qs.reduce((s, q) => s + answers[f.id][q.id], 0) / qs.length : 0;
    return { ...f, raw: avg, weighted: avg * f.weight };
  });
}

async function pushToSheets(payload) {
  try {
    await fetch(SHEET_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch {}
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, placeholder, type = "text", required, disabled }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 10, letterSpacing: "1.5px", color: "#475569", marginBottom: 5, textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type} value={value} placeholder={placeholder} disabled={disabled}
        onChange={e => onChange && onChange(e.target.value)}
        style={{ width: "100%", background: disabled ? "#070f1a" : "#0b1628", border: "1px solid #1e293b", borderRadius: 8, padding: "11px 14px", color: disabled ? "#475569" : "#e2e8f0", fontSize: 14, transition: "border-color .2s", opacity: disabled ? 0.6 : 1 }}
        onFocus={e => !disabled && (e.target.style.borderColor = "#38bdf8")}
        onBlur={e => (e.target.style.borderColor = "#1e293b")}
      />
    </div>
  );
}

function Btn({ children, onClick, disabled, variant = "primary", color, full, size = "md" }) {
  const pad = size === "sm" ? "8px 16px" : size === "lg" ? "15px 24px" : "12px 20px";
  const fs = size === "sm" ? 12 : size === "lg" ? 15 : 13;
  const bg = disabled ? "#0f172a" : variant === "primary"
    ? (color ? `linear-gradient(135deg,${color}cc,${color})` : "linear-gradient(135deg,#1d4ed8,#0891b2)")
    : variant === "ghost" ? "transparent" : "#0f172a";
  const clr = disabled ? "#334155" : variant === "primary" ? (color ? "#000" : "#fff") : "#64748b";
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: pad, fontSize: fs, fontWeight: 700, letterSpacing: "0.5px", background: bg, border: variant === "outline" ? "1px solid #1e293b" : "none", borderRadius: 9, color: clr, cursor: disabled ? "not-allowed" : "pointer", width: full ? "100%" : undefined, transition: "all .2s", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      {children}
    </button>
  );
}

function Gauge({ score, size = 140 }) {
  const risk = getRisk(score);
  const r = size * 0.37, circ = 2 * Math.PI * r, offset = circ * (1 - score / 10);
  const cx = size / 2, cy = size / 2;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth={size * 0.09} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={risk.color} strokeWidth={size * 0.09}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke .4s" }} />
        <text x={cx} y={cy - 4} textAnchor="middle" fill={risk.color} fontSize={size * 0.17} fontWeight="900" fontFamily="'Courier New',monospace">{score.toFixed(2)}</text>
        <text x={cx} y={cy + size * 0.1} textAnchor="middle" fill="#334155" fontSize={size * 0.07} fontFamily="sans-serif">/ 10</text>
      </svg>
      <span style={{ padding: "4px 16px", borderRadius: 4, background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color, fontWeight: 800, fontSize: 10, letterSpacing: "2px", fontFamily: "monospace" }}>{risk.label}</span>
    </div>
  );
}

function Stepper({ current }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
        {FACTORS.map((f, i) => (
          <div key={f.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            {i < FACTORS.length - 1 && (
              <div style={{ position: "absolute", top: 15, left: "50%", width: "100%", height: 2, background: i < current ? f.color : "#1e293b", transition: "background .4s", zIndex: 0 }} />
            )}
            <div style={{ width: 30, height: 30, borderRadius: "50%", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < current ? 13 : 15, background: i < current ? f.color : i === current ? "#0f172a" : "#070f1a", border: i === current ? `2px solid ${f.color}` : i < current ? "none" : "2px solid #1e293b", color: i < current ? "#000" : "inherit", fontWeight: i < current ? 900 : "normal", boxShadow: i === current ? `0 0 16px ${f.color}40` : "none", transition: "all .35s" }}>
              {i < current ? "✓" : f.icon}
            </div>
            <span style={{ fontSize: 9, color: i === current ? f.color : "#334155", marginTop: 5, textAlign: "center", lineHeight: 1.2, maxWidth: 46 }}>{f.label}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 2, background: "#070f1a", borderRadius: 2, marginTop: 6 }}>
        <div style={{ height: "100%", width: `${(current / FACTORS.length) * 100}%`, background: `linear-gradient(90deg, #38bdf8, ${FACTORS[Math.min(current, FACTORS.length - 1)].color})`, borderRadius: 2, transition: "width .45s ease" }} />
      </div>
    </div>
  );
}

// ─── DOWNLOAD GATE MODAL ──────────────────────────────────────────────────────
function DownloadGate({ onDone, onClose }) {
  const [form, setForm] = useState({ name: "", contactType: "email", contact: "" });
  const set = k => v => setForm(p => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.contact.trim();

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000c", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 16 }}>
      <div style={{ background: "#070f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 28, maxWidth: 420, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: "#38bdf8", fontSize: 10, letterSpacing: "3px", margin: "0 0 4px" }}>ALMOST THERE</p>
            <h3 style={{ color: "#f1f5f9", fontWeight: 900, fontSize: 18, margin: 0 }}>Download your report</h3>
            <p style={{ color: "#475569", fontSize: 12, margin: "6px 0 0", lineHeight: 1.5 }}>One-time only — we remember you after this.</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#475569", fontSize: 22, cursor: "pointer", lineHeight: 1, padding: 0 }}>×</button>
        </div>

        <Field label="Your full name" value={form.name} onChange={set("name")} placeholder="e.g. Amina Tariq" required />

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 10, letterSpacing: "1.5px", color: "#475569", marginBottom: 5, textTransform: "uppercase" }}>Contact <span style={{ color: "#ef4444" }}>*</span></label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {[["email", "📧 Email"], ["linkedin", "💼 LinkedIn"]].map(([t, lbl]) => (
              <button key={t} onClick={() => setForm(p => ({ ...p, contactType: t, contact: "" }))}
                style={{ flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 700, background: form.contactType === t ? "#1e3a5f" : "#0f172a", border: form.contactType === t ? "1px solid #38bdf8" : "1px solid #1e293b", borderRadius: 8, color: form.contactType === t ? "#38bdf8" : "#64748b", cursor: "pointer" }}>
                {lbl}
              </button>
            ))}
          </div>
          <input
            type={form.contactType === "email" ? "email" : "text"}
            value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
            placeholder={form.contactType === "email" ? "you@company.com" : "linkedin.com/in/yourname"}
            style={{ width: "100%", background: "#0b1628", border: "1px solid #1e293b", borderRadius: 8, padding: "11px 14px", color: "#e2e8f0", fontSize: 14 }}
            onFocus={e => e.target.style.borderColor = "#38bdf8"}
            onBlur={e => e.target.style.borderColor = "#1e293b"}
          />
        </div>

        <p style={{ color: "#1e293b", fontSize: 10, lineHeight: 1.6, marginBottom: 16 }}>🔒 Stored privately. Never shared or sold.</p>

        <Btn full size="lg" disabled={!valid} onClick={() => valid && onDone(form)}>
          Download Report →
        </Btn>
      </div>
    </div>
  );
}

// ─── RESULT PAGE ──────────────────────────────────────────────────────────────
function ResultPage({ answers, empInfo, user, onNewAssessment }) {
  const [showGate, setShowGate] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const factorScores = calcScores(answers);
  const total = factorScores.reduce((s, f) => s + f.weighted, 0);
  const risk = getRisk(total);
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

  const doDownload = async (u) => {
    setDownloading(true);
    const payload = {
      timestamp: new Date().toISOString(),
      assessorName: u.name, contact: u.contact, contactType: u.contactType,
      employeeName: empInfo.name, department: empInfo.department,
      role: empInfo.role, manager: empInfo.manager,
      totalScore: total.toFixed(2), riskLevel: risk.label,
      ...Object.fromEntries(factorScores.map(f => [`${f.id}_score`, f.weighted.toFixed(2)])),
    };
    await pushToSheets(payload);
    const rows = [
      ["HR ATTRITION RISK REPORT — " + today],
      [],
      ["ASSESSED BY", u.name, u.contactType === "email" ? "Email" : "LinkedIn", u.contact],
      ["EMPLOYEE", empInfo.name], ["DEPARTMENT", empInfo.department],
      ["ROLE", empInfo.role], ["MANAGER", empInfo.manager],
      [],
      ["FACTOR", "RAW SCORE /10", "WEIGHT", "WEIGHTED"],
      ...factorScores.map(f => [f.label, f.raw.toFixed(2), `${(f.weight * 100).toFixed(0)}%`, f.weighted.toFixed(2)]),
      [],
      ["TOTAL RISK SCORE", total.toFixed(2)],
      ["RISK LEVEL", risk.label],
      ["SUMMARY", risk.summary],
      [],
      ["RECOMMENDED ACTIONS"],
      ...risk.steps.map((s, i) => [`${i + 1}.`, s]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `attrition-${empInfo.name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.csv`;
    a.click();
    setDownloading(false);
    setShowGate(false);
  };

  const handleDownloadClick = () => {
    if (user) { doDownload(user); }
    else { setShowGate(true); }
  };

  const handleGateDone = (form) => {
    const u = { name: form.name, contact: form.contact, contactType: form.contactType };
    LS.set("hr_user", u);
    doDownload(u);
  };

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      {showGate && <DownloadGate onDone={handleGateDone} onClose={() => setShowGate(false)} />}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <span style={{ fontSize: 10, letterSpacing: "4px", color: "#22c55e" }}>✓ ASSESSMENT COMPLETE</span>
        <h2 style={{ color: "#f1f5f9", fontWeight: 900, fontSize: 22, margin: "6px 0 4px" }}>Risk Score Report</h2>
        <span style={{ color: "#334155", fontSize: 12 }}>{today}</span>
      </div>

      {/* Employee summary card */}
      <div style={{ background: "#070f1a", border: "1px solid #1e293b", borderRadius: 12, padding: 16, marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["Employee", empInfo.name], ["Department", empInfo.department], ["Role", empInfo.role], ["Manager", empInfo.manager]].map(([k, v]) => (
          <div key={k}>
            <p style={{ color: "#334155", fontSize: 9, letterSpacing: "1px", margin: "0 0 2px", textTransform: "uppercase" }}>{k}</p>
            <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, margin: 0 }}>{v || "—"}</p>
          </div>
        ))}
      </div>

      {/* Score + factor bars */}
      <div style={{ background: "#070f1a", border: `1px solid ${risk.border}`, borderRadius: 14, padding: 20, marginBottom: 16, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <Gauge score={total} size={148} />
        <div style={{ flex: 1, minWidth: 180 }}>
          <p style={{ color: "#334155", fontSize: 9, letterSpacing: "2px", margin: "0 0 12px", textTransform: "uppercase" }}>Factor Breakdown</p>
          {factorScores.map(f => (
            <div key={f.id} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ color: "#94a3b8", fontSize: 11 }}>{f.icon} {f.label}</span>
                <span style={{ color: f.color, fontFamily: "monospace", fontWeight: 700, fontSize: 11 }}>{f.weighted.toFixed(2)}</span>
              </div>
              <div style={{ height: 4, background: "#1e293b", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${(f.raw / 10) * 100}%`, background: f.color, borderRadius: 2, transition: "width 1.1s cubic-bezier(.4,0,.2,1)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk summary */}
      <div style={{ background: risk.bg, borderLeft: `4px solid ${risk.color}`, border: `1px solid ${risk.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 14 }}>
        <p style={{ color: risk.color, fontSize: 9, letterSpacing: "2px", fontWeight: 800, margin: "0 0 6px", textTransform: "uppercase" }}>{risk.label} — Summary</p>
        <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{risk.summary}</p>
      </div>

      {/* Action steps — always visible, no lock */}
      <div style={{ background: "#070f1a", border: "1px solid #1e293b", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <p style={{ color: "#475569", fontSize: 9, letterSpacing: "2px", margin: "0 0 12px", textTransform: "uppercase" }}>Recommended Actions</p>
        {risk.steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, padding: "10px 12px", background: "#0b1628", borderRadius: 8, alignItems: "flex-start" }}>
            <span style={{ minWidth: 20, height: 20, borderRadius: "50%", background: risk.bg, border: `1px solid ${risk.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: risk.color, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Download + new assessment */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: 14 }}>
        <button onClick={handleDownloadClick} disabled={downloading}
          style={{ padding: "13px 20px", background: downloading ? "#0f172a" : "linear-gradient(135deg,#1d4ed8,#0891b2)", border: "none", borderRadius: 10, color: downloading ? "#334155" : "#fff", fontWeight: 800, fontSize: 14, cursor: downloading ? "not-allowed" : "pointer", letterSpacing: "0.5px" }}>
          {downloading ? "⏳ Preparing..." : user ? "📥 Download CSV Report" : "📥 Download Report"}
        </button>
        <button onClick={() => window.print()}
          style={{ padding: "13px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, color: "#64748b", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          🖨️ Print
        </button>
      </div>

      {/* Score guide */}
      <div style={{ background: "#070f1a", borderRadius: 10, padding: "10px 16px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {[["0–3", "#22c55e", "Low"], ["3.1–6", "#fbbf24", "Moderate"], ["6.1–8", "#f97316", "High"], ["8.1–10", "#ef4444", "Critical"]].map(([r, c, l]) => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
            <span style={{ color: "#475569", fontSize: 11 }}>{r} — {l}</span>
          </div>
        ))}
      </div>

      <Btn full variant="outline" onClick={onNewAssessment}>↩ Assess another employee</Btn>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // Persistent state
  const [user, setUser]           = useState(() => LS.get("hr_user"));           // { name, contact, contactType }
  const [lastEmp, setLastEmp]     = useState(() => LS.get("hr_last_emp") || {}); // prefill for next time

  // Session state
  const [step, setStep]           = useState("emp-info");   // emp-info | factor | result
  const [factorIdx, setFactorIdx] = useState(0);
  const [empInfo, setEmpInfo]     = useState({ name: "", department: lastEmp.department || "", role: lastEmp.role || "", manager: lastEmp.manager || "" });
  const [answers, setAnswers]     = useState({});

  const handleAnswer = useCallback((fId, qId, score) => {
    setAnswers(p => ({ ...p, [fId]: { ...(p[fId] || {}), [qId]: score } }));
  }, []);

  const cur     = FACTORS[factorIdx];
  const curAns  = answers[cur?.id] || {};
  const allDone = cur?.questions.every(q => curAns[q.id] !== undefined);
  const empReady = empInfo.name.trim() && empInfo.department.trim();

  const goNext = () => {
    if (factorIdx < FACTORS.length - 1) { setFactorIdx(i => i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { setStep("result"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const goBack = () => {
    if (factorIdx > 0) setFactorIdx(i => i - 1);
    else setStep("emp-info");
  };

  const startAssessment = () => {
    // Save employee dept/role/manager for next time (not name — that always changes)
    const toSave = { department: empInfo.department, role: empInfo.role, manager: empInfo.manager };
    LS.set("hr_last_emp", toSave);
    setLastEmp(toSave);
    setStep("factor");
    setFactorIdx(0);
    setAnswers({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const newAssessment = () => {
    setEmpInfo({ name: "", department: lastEmp.department || "", role: lastEmp.role || "", manager: lastEmp.manager || "" });
    setAnswers({});
    setFactorIdx(0);
    setStep("emp-info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    LS.del("hr_user");
    setUser(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#020817", fontFamily: "'Segoe UI','Helvetica Neue',sans-serif", color: "#e2e8f0", padding: "24px 16px" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input { font-family: inherit; }
        button { font-family: inherit; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        @media print { .no-print { display: none !important; } }
      `}</style>

      <div style={{ maxWidth: 660, margin: "0 auto" }}>

        {/* Top bar */}
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0f172a", border: "1px solid #1e293b", borderRadius: 50, padding: "6px 16px" }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 9, letterSpacing: "3px", color: "#38bdf8", fontWeight: 700 }}>HR ANALYTICS PRO</span>
            </div>
            <h1 style={{ color: "#f1f5f9", fontWeight: 900, fontSize: "clamp(18px,4vw,26px)", marginTop: 10, letterSpacing: "-0.5px" }}>
              Attrition <span style={{ color: "#ef4444" }}>Risk</span> Assessment
            </h1>
            <p style={{ color: "#334155", fontSize: 11, marginTop: 3 }}>18 questions · 6 risk dimensions · instant score</p>
          </div>

          {/* User badge / logout */}
          {user && (
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>👋 {user.name.split(" ")[0]}</p>
              <button onClick={logout} style={{ background: "none", border: "none", color: "#334155", fontSize: 11, cursor: "pointer", textDecoration: "underline", marginTop: 2 }}>Log out</button>
            </div>
          )}
        </div>

        {/* ── STEP: EMPLOYEE INFO ── */}
        {step === "emp-info" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div style={{ background: "#070f1a", border: "1px solid #1e293b", borderRadius: 16, padding: 24, marginBottom: 14 }}>
              <p style={{ color: "#334155", fontSize: 9, letterSpacing: "2px", marginBottom: 20, textTransform: "uppercase" }}>
                Who are you assessing today?
              </p>

              <Field label="Employee full name" value={empInfo.name}
                onChange={v => setEmpInfo(p => ({ ...p, name: v }))}
                placeholder="e.g. Ahmed Raza" required />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Department" value={empInfo.department}
                  onChange={v => setEmpInfo(p => ({ ...p, department: v }))}
                  placeholder="e.g. Sales" required />
                <Field label="Role / Job Title" value={empInfo.role}
                  onChange={v => setEmpInfo(p => ({ ...p, role: v }))}
                  placeholder="e.g. Account Manager" />
              </div>

              <Field label="Reporting Manager" value={empInfo.manager}
                onChange={v => setEmpInfo(p => ({ ...p, manager: v }))}
                placeholder="e.g. Usman Tariq" />

              {lastEmp.department && (
                <p style={{ color: "#334155", fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
                  💡 Department, role and manager pre-filled from your last assessment.
                </p>
              )}
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
              {[["18", "Questions"], ["6", "Risk Factors"], ["~5", "Minutes"]].map(([n, l]) => (
                <div key={l} style={{ background: "#070f1a", border: "1px solid #1e293b", borderRadius: 10, padding: "14px 0", textAlign: "center" }}>
                  <p style={{ color: "#38bdf8", fontWeight: 900, fontSize: 22, fontFamily: "monospace" }}>{n}</p>
                  <p style={{ color: "#334155", fontSize: 11, marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>

            <Btn full size="lg" disabled={!empReady} onClick={startAssessment}>
              Begin Assessment →
            </Btn>
          </div>
        )}

        {/* ── STEP: FACTOR QUESTIONS ── */}
        {step === "factor" && cur && (
          <div style={{ animation: "fadeUp .35s ease" }}>
            <Stepper current={factorIdx} />

            <div style={{ background: "#070f1a", border: `1px solid ${cur.color}25`, borderRadius: 16, padding: 24, marginBottom: 14 }}>
              {/* Factor header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid #0f172a" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cur.color}18`, border: `1px solid ${cur.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{cur.icon}</div>
                <div>
                  <p style={{ color: "#334155", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase" }}>Factor {factorIdx + 1} of {FACTORS.length}</p>
                  <p style={{ color: cur.color, fontWeight: 800, fontSize: 17 }}>{cur.label}</p>
                  <p style={{ color: "#334155", fontSize: 11 }}>Weight: {(cur.weight * 100).toFixed(0)}% of total score</p>
                </div>
              </div>

              {/* Questions */}
              {cur.questions.map((q, qi) => (
                <div key={q.id} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ minWidth: 22, height: 22, borderRadius: "50%", background: cur.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#000", flexShrink: 0 }}>{qi + 1}</span>
                    <p style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 500, lineHeight: 1.55 }}>{q.text}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingLeft: 32 }}>
                    {q.options.map(opt => {
                      const sel = curAns[q.id] === opt.score;
                      return (
                        <button key={opt.label} onClick={() => handleAnswer(cur.id, q.id, opt.score)}
                          style={{ padding: "10px 14px", background: sel ? `${cur.color}18` : "#0b1628", border: `1.5px solid ${sel ? cur.color : "#1e293b"}`, borderRadius: 8, color: sel ? cur.color : "#64748b", fontSize: 13, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all .15s" }}>
                          <span>{opt.label}</span>
                          {sel && <span style={{ fontSize: 10, background: cur.color, color: "#000", borderRadius: 4, padding: "2px 8px", fontWeight: 700, flexShrink: 0 }}>Score {opt.score}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress text */}
            <p style={{ color: "#1e293b", fontSize: 11, textAlign: "center", marginBottom: 10 }}>
              {Object.keys(curAns).length} / {cur.questions.length} answered
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
              <Btn variant="outline" onClick={goBack}>← Back</Btn>
              <Btn color={cur.color} disabled={!allDone} onClick={goNext}>
                {factorIdx === FACTORS.length - 1 ? "View Results →" : "Next →"}
              </Btn>
            </div>
          </div>
        )}

        {/* ── STEP: RESULT ── */}
        {step === "result" && (
          <ResultPage
            answers={answers}
            empInfo={empInfo}
            user={user}
            onNewAssessment={newAssessment}
          />
        )}

      </div>
    </div>
  );
}
