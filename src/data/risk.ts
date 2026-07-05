import type { RiskLevel } from '../types';

export const RISK_LEVELS: Record<string, RiskLevel> = {
  LOW: {
    key: 'LOW',
    label: 'LOW RISK',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: '#166534',
    summary: 'Employee is stable. Sustain what\'s working with regular recognition and career conversations.',
    steps: [
      'Schedule quarterly check-ins to maintain momentum',
      'Recognise achievements in team settings',
      'Discuss 12-month career goals proactively',
      'Benchmark compensation at next review cycle',
    ],
  },
  MODERATE: {
    key: 'MODERATE',
    label: 'MODERATE RISK',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.08)',
    border: '#92400e',
    summary: 'Early warning signs detected. Proactive intervention within 30 days can prevent escalation.',
    steps: [
      'Schedule a stay interview this month',
      'Review salary vs. market benchmarks immediately',
      'Create or refresh the employee\'s IDP',
      'Move 1-on-1s to bi-weekly cadence',
      'Assign a meaningful stretch project',
    ],
  },
  HIGH: {
    key: 'HIGH',
    label: 'HIGH RISK',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: '#9a3412',
    summary: 'Significant flight risk. Take action within 1–2 weeks or departure becomes likely.',
    steps: [
      'Immediate manager intervention — do not delay',
      'Conduct a confidential stay interview within 7 days',
      'Escalate compensation review to HR leadership',
      'Identify internal mobility or promotion opportunities',
      'Begin quiet succession planning for this role',
    ],
  },
  CRITICAL: {
    key: 'CRITICAL',
    label: 'CRITICAL RISK',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: '#991b1b',
    summary: 'Exit likely imminent. Emergency retention measures or transition planning must begin today.',
    steps: [
      'Escalate to HR Director and Department Head today',
      'Assemble an emergency retention package',
      'Arrange exit-prevention meeting with senior leadership',
      'Activate succession plan immediately',
      'Begin knowledge transfer documentation now',
    ],
  },
};
