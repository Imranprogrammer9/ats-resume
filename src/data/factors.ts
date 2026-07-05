import type { RiskFactor } from '../types';

export const FACTORS: RiskFactor[] = [
  {
    id: 'engagement',
    label: 'Employee Engagement',
    icon: '💬',
    weight: 0.25,
    color: '#38bdf8',
    questions: [
      {
        id: 'q1',
        text: "What was the employee's last engagement survey score?",
        options: [
          { label: '8–10 · Highly Engaged', score: 1 },
          { label: '5–7 · Moderately Engaged', score: 4 },
          { label: '3–4 · Low Engagement', score: 7 },
          { label: '0–2 · Actively Disengaged', score: 10 },
          { label: 'No survey taken', score: 6 },
        ],
      },
      {
        id: 'q2',
        text: 'How actively does this employee participate in team meetings?',
        options: [
          { label: 'Always contributes ideas', score: 1 },
          { label: 'Sometimes participates', score: 4 },
          { label: 'Rarely speaks up', score: 7 },
          { label: 'Frequently absent from meetings', score: 10 },
        ],
      },
      {
        id: 'q3',
        text: 'Has the employee volunteered for new projects in the last 6 months?',
        options: [
          { label: 'Yes, multiple times', score: 1 },
          { label: 'Once or twice', score: 4 },
          { label: 'Only when asked', score: 6 },
          { label: 'Never', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'salary',
    label: 'Salary Competitiveness',
    icon: '💰',
    weight: 0.20,
    color: '#34d399',
    questions: [
      {
        id: 'q1',
        text: "How does the employee's salary compare to market rate for their role?",
        options: [
          { label: '10%+ above market', score: 1 },
          { label: 'At market rate', score: 3 },
          { label: '5–10% below market', score: 6 },
          { label: '10–20% below market', score: 8 },
          { label: '20%+ below market', score: 10 },
        ],
      },
      {
        id: 'q2',
        text: 'When did this employee last receive a salary raise?',
        options: [
          { label: 'Within last 6 months', score: 1 },
          { label: '6–12 months ago', score: 3 },
          { label: '1–2 years ago', score: 6 },
          { label: 'More than 2 years ago', score: 9 },
          { label: 'Never received a raise', score: 10 },
        ],
      },
      {
        id: 'q3',
        text: 'Has the employee raised compensation concerns?',
        options: [
          { label: 'No concerns raised', score: 1 },
          { label: 'Mentioned casually once', score: 4 },
          { label: 'Raised formally once', score: 7 },
          { label: 'Raised multiple times', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'growth',
    label: 'Career Growth',
    icon: '📈',
    weight: 0.15,
    color: '#fbbf24',
    questions: [
      {
        id: 'q1',
        text: "When was the employee's last promotion or role advancement?",
        options: [
          { label: 'Within last year', score: 1 },
          { label: '1–2 years ago', score: 3 },
          { label: '2–3 years ago', score: 6 },
          { label: '3–5 years ago', score: 8 },
          { label: 'Never promoted', score: 10 },
        ],
      },
      {
        id: 'q2',
        text: 'Does the employee have an active Individual Development Plan (IDP)?',
        options: [
          { label: 'Yes, actively followed', score: 1 },
          { label: 'Yes, but rarely reviewed', score: 5 },
          { label: 'No IDP in place', score: 8 },
          { label: 'No growth path expressed', score: 10 },
        ],
      },
      {
        id: 'q3',
        text: 'How satisfied is the employee with career growth opportunities here?',
        options: [
          { label: 'Very satisfied', score: 1 },
          { label: 'Somewhat satisfied', score: 4 },
          { label: 'Neutral / Uncertain', score: 6 },
          { label: 'Dissatisfied', score: 8 },
          { label: 'Very dissatisfied / Looking elsewhere', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'absenteeism',
    label: 'Attendance',
    icon: '📅',
    weight: 0.15,
    color: '#a78bfa',
    questions: [
      {
        id: 'q1',
        text: 'How many unplanned absences in the last 3 months?',
        options: [
          { label: '0 absences', score: 1 },
          { label: '1–2 absences', score: 3 },
          { label: '3–4 absences', score: 6 },
          { label: '5–6 absences', score: 8 },
          { label: '7+ absences', score: 10 },
        ],
      },
      {
        id: 'q2',
        text: "How is the employee's punctuality and on-time arrival?",
        options: [
          { label: 'Always on time', score: 1 },
          { label: 'Occasionally late (1–2×/month)', score: 4 },
          { label: 'Frequently late (weekly)', score: 7 },
          { label: 'Chronic lateness / pattern', score: 10 },
        ],
      },
      {
        id: 'q3',
        text: 'Is there a concerning pattern in absences (e.g. Mondays, before reviews)?',
        options: [
          { label: 'No pattern detected', score: 1 },
          { label: 'Slight pattern noticed', score: 5 },
          { label: 'Clear pattern, under monitoring', score: 8 },
          { label: 'Confirmed pattern, HR involved', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'manager',
    label: 'Manager Relationship',
    icon: '👤',
    weight: 0.15,
    color: '#f472b6',
    questions: [
      {
        id: 'q1',
        text: 'How would you rate the quality of manager feedback this employee receives?',
        options: [
          { label: 'Regular, constructive feedback', score: 1 },
          { label: 'Occasional feedback only', score: 4 },
          { label: 'Rare or inconsistent', score: 7 },
          { label: 'No meaningful feedback given', score: 10 },
        ],
      },
      {
        id: 'q2',
        text: 'Has there been any recorded conflict between employee and manager?',
        options: [
          { label: 'No conflicts', score: 1 },
          { label: 'Minor disagreement, resolved', score: 3 },
          { label: 'Ongoing tension reported', score: 7 },
          { label: 'Formal complaint filed', score: 10 },
        ],
      },
      {
        id: 'q3',
        text: "Based on 1-on-1s, how is the employee's trust in leadership?",
        options: [
          { label: 'High trust, feels supported', score: 1 },
          { label: 'Moderate trust', score: 4 },
          { label: 'Low trust, skeptical', score: 7 },
          { label: 'No trust, disengaged', score: 10 },
        ],
      },
    ],
  },
  {
    id: 'training',
    label: 'Learning & Dev',
    icon: '🎓',
    weight: 0.10,
    color: '#fb923c',
    questions: [
      {
        id: 'q1',
        text: 'What % of assigned training has the employee completed this year?',
        options: [
          { label: '90–100% completed', score: 1 },
          { label: '60–89% completed', score: 3 },
          { label: '30–59% completed', score: 6 },
          { label: 'Less than 30% completed', score: 9 },
          { label: '0% — no training taken', score: 10 },
        ],
      },
      {
        id: 'q2',
        text: 'How does the employee respond to learning opportunities?',
        options: [
          { label: 'Actively seeks new skills', score: 1 },
          { label: 'Participates when scheduled', score: 4 },
          { label: 'Needs encouragement', score: 6 },
          { label: 'Resistant or indifferent', score: 9 },
        ],
      },
      {
        id: 'q3',
        text: 'Is there a growing skill gap vs. current role requirements?',
        options: [
          { label: 'No gap — skills match or exceed role', score: 1 },
          { label: 'Minor gap, being addressed', score: 4 },
          { label: 'Moderate gap, plan needed', score: 7 },
          { label: 'Significant gap, performance impacted', score: 10 },
        ],
      },
    ],
  },
];
