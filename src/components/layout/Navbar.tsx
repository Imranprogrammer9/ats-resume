import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'ATS Resume', href: '/services/ats-resume-writing' },
      { label: 'Recruitment', href: '/services/recruitment' },
      { label: 'LinkedIn Optimization', href: '/services/linkedin-optimization' },
    ],
  },
  {
    label: 'HR Tools',
    href: '/hr-tools',
    children: [
      { label: 'Attrition Predictor', href: '/hr-tools/attrition-predictor', badge: 'Live' },
      { label: 'Resume Analyzer', href: '/hr-tools', badge: 'Soon' },
      { label: 'Salary Benchmark', href: '/hr-tools', badge: 'Soon' },
      { label: 'Interview Scorecard', href: '/hr-tools', badge: 'Soon' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

function Dropdown({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-strong border border-forest/[0.07] py-2 z-50"
        >
          {items.map((item) => (
            <Link
              key={item.href + item.label}
              to={item.href}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-brand hover:text-forest hover:bg-sand transition-colors duration-150"
            >
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span
                  className={`text-2xs font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    item.badge === 'Live'
                      ? 'bg-brass/10 text-brass'
                      : 'bg-forest/8 text-slate-brand'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      setActiveAccordion(null);
    }
  }, [mobileOpen]);

  return (
    <header
      className={`transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-medium border-b border-forest/[0.08]'
          : 'bg-white/95 backdrop-blur-sm border-b border-forest/[0.06]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl font-bold tracking-tight text-forest" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>
            HR <span className="text-brass-light">Vanguard</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.children ? (
                <button
                  className={`flex items-center gap-1 nav-link ${
                    location.pathname.startsWith(item.href) ? '!text-brass-light' : ''
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`nav-link ${location.pathname === item.href ? '!text-brass-light' : ''}`}
                >
                  {item.label}
                </Link>
              )}
              {item.children && (
                <Dropdown items={item.children} isOpen={openDropdown === item.label} />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-brass text-white text-xs font-semibold tracking-wide px-5 py-2.5 rounded-lg transition-all duration-200 hover:bg-brass-light hover:-translate-y-0.5 hover:shadow-brass"
          >
            Book Consultation
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-forest p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-forest/[0.08] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-forest hover:text-brass transition-colors border-b border-forest/[0.06] text-left"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 text-forest/60 ${
                          activeAccordion === item.label ? 'rotate-180 text-brass' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-3 text-sm font-medium text-forest hover:text-brass transition-colors border-b border-forest/[0.06]"
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <AnimatePresence initial={false}>
                      {activeAccordion === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 flex flex-col gap-0.5 pt-2 pb-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.href + child.label}
                                to={child.href}
                                className="py-2 text-xs text-slate-brand hover:text-brass-light transition-colors flex items-center gap-2"
                              >
                                {child.label}
                                {child.badge && (
                                  <span className="text-2xs bg-brass/10 text-brass px-1.5 py-0.5 rounded font-bold">
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <Link to="/contact" className="mt-3 btn-primary text-center text-sm">
                Book Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
