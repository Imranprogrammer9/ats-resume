import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, BarChart2, FileDown } from 'lucide-react';
import AttritionPredictor from '../../components/tools/AttritionPredictor';

export default function AttritionPredictorPage() {
  return (
    <>
      <section className="bg-forest py-10 border-b border-brass/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-light text-xs mb-6">
            <Link to="/" className="hover:text-brass-light transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-brand" />
            <Link to="/hr-tools" className="hover:text-brass-light transition-colors">HR Tools</Link>
            <ChevronRight size={12} className="text-slate-brand" />
            <span className="text-brass-light">Attrition Predictor</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-3">
                Flagship HR Tool · Free to Use
              </span>
              <h1
                className="text-white mb-3"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.1 }}
              >
                Employee Attrition{' '}
                <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Risk</span>{' '}
                Predictor
              </h1>
              <p className="text-slate-light font-light leading-relaxed text-sm">
                A weighted scoring engine across 6 risk dimensions and 18 diagnostic questions. Assess any employee's attrition risk in approximately 5 minutes and receive instant, actionable recommendations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 flex-wrap"
            >
              {[
                { icon: BarChart2, text: '6 Risk Dimensions', sub: 'Engagement, Salary, Growth, Attendance, Manager, L&D' },
                { icon: Shield, text: '18 Questions', sub: 'Calibrated diagnostic questions with weighted scoring' },
                { icon: FileDown, text: 'Free Export', sub: 'CSV report and Google Sheets integration' },
              ].map(({ icon: Icon, text, sub }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4 flex-1 min-w-[180px]"
                >
                  <Icon size={16} className="text-brass flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-xs font-semibold">{text}</div>
                    <div className="text-slate-light text-2xs mt-0.5 leading-snug">{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AttritionPredictor />
        </div>
      </section>
    </>
  );
}
