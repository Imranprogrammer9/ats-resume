import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const FOOTER_LINKS = {
  Services: [
    { label: 'ATS Resume', href: '/services/ats-resume-writing' },
    { label: 'Recruitment', href: '/services/recruitment' },
    { label: 'LinkedIn Optimization', href: '/services/linkedin-optimization' },
  ],
  'HR Tools': [
    { label: 'Attrition Predictor', href: '/hr-tools/attrition-predictor' },
    { label: 'Resume Analyzer', href: '/hr-tools' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <footer style={{ background: '#080F0B' }} className="border-t border-brass/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>
                HR <span className="text-brass-light">Vanguard</span>
              </span>
            </Link>
            <p className="text-slate-brand text-sm font-light leading-relaxed mb-6 max-w-xs">
              Helping businesses hire better, retain top talent, and build high-performing teams through expert HR consulting and innovative HR technology.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <a href="mailto:hello@hrvanguard.com" className="flex items-center gap-2.5 text-sm text-slate-light hover:text-brass-light transition-colors">
                <Mail size={14} className="text-brass flex-shrink-0" />
                hello@hrvanguard.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-light">
                <Phone size={14} className="text-brass flex-shrink-0" />
                +1 (555) 000-0000
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-light">
                <MapPin size={14} className="text-brass flex-shrink-0" />
                Global · Remote-First
              </div>
            </div>

            <div className="flex gap-3">
              {[Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-light hover:text-brass-light hover:border-brass/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white text-xs font-semibold tracking-[0.12em] uppercase mb-4">{group}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link to={link.href} className="text-slate-brand text-sm hover:text-brass-light transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-10 border-t border-white/8 flex flex-row items-center justify-between gap-10 flex-wrap">
          <div>
            <h4 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              HR Insights, Delivered Monthly
            </h4>
            <p className="text-slate-brand text-sm">SHRM-aligned articles on retention, recruitment, and workforce analytics. No spam, ever.</p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[320px] flex-shrink-0">
            {submitted ? (
              <p className="text-brass-light text-sm font-medium py-3">You're subscribed. Thank you.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="flex-1 input-field-dark text-sm py-2.5" />
                <button type="submit" className="bg-brass hover:bg-brass-light text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 flex-shrink-0">
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-brand text-xs">© {new Date().getFullYear()} HR Vanguard. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <a key={t} href="#" className="text-slate-brand text-xs hover:text-brass-light transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
