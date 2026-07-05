import type { AssessmentAnswers, EmployeeInfo, AssessorInfo, FactorScore, RiskLevel } from '../types';

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function generateCSV(
  empInfo: EmployeeInfo,
  assessor: AssessorInfo,
  factorScores: FactorScore[],
  totalScore: number,
  risk: RiskLevel,
  answers: AssessmentAnswers,
): string {
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const rows: string[][] = [
    [`HR ATTRITION RISK REPORT — ${today}`],
    [],
    ['ASSESSED BY', assessor.name, assessor.contactType === 'email' ? 'Email' : 'LinkedIn', assessor.contact],
    ['EMPLOYEE', empInfo.name],
    ['DEPARTMENT', empInfo.department],
    ['ROLE', empInfo.role],
    ['MANAGER', empInfo.manager],
    [],
    ['FACTOR', 'RAW SCORE /10', 'WEIGHT', 'WEIGHTED'],
    ...factorScores.map((f) => [
      f.label,
      f.raw.toFixed(2),
      `${(f.weight * 100).toFixed(0)}%`,
      f.weighted.toFixed(2),
    ]),
    [],
    ['TOTAL RISK SCORE', totalScore.toFixed(2)],
    ['RISK LEVEL', risk.label],
    ['SUMMARY', risk.summary],
    [],
    ['RECOMMENDED ACTIONS'],
    ...risk.steps.map((s, i) => [`${i + 1}.`, s]),
  ];

  return rows.map((r) => r.map(escapeCSV).join(',')).join('\n');
}

export function downloadCSV(content: string, filename: string): void {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/csv' }));
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
