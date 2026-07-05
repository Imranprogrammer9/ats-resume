import { FACTORS } from '../data/factors';
import { RISK_LEVELS } from '../data/risk';
import type { AssessmentAnswers, FactorScore, RiskLevel } from '../types';

export function calcScores(answers: AssessmentAnswers): FactorScore[] {
  return FACTORS.map((f) => {
    const qs = f.questions.filter((q) => answers[f.id]?.[q.id] !== undefined);
    const avg = qs.length
      ? qs.reduce((s, q) => s + answers[f.id][q.id], 0) / qs.length
      : 0;
    return { ...f, raw: avg, weighted: avg * f.weight };
  });
}

export function getRisk(score: number): RiskLevel {
  if (score <= 3) return RISK_LEVELS.LOW;
  if (score <= 6) return RISK_LEVELS.MODERATE;
  if (score <= 8) return RISK_LEVELS.HIGH;
  return RISK_LEVELS.CRITICAL;
}

export function calcTotalScore(answers: AssessmentAnswers): number {
  return calcScores(answers).reduce((s, f) => s + f.weighted, 0);
}
