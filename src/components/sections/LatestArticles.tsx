import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blog';

export default function LatestArticles() {
  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const secondary = BLOG_POSTS.filter((p) => p.id !== featured?.id).slice(0, 2);

  return (
    <section className="py-24 overflow-hidden relative" style={{ background: '#0E1F15' }}>
      <div className="dot-grid-light absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="section-label">HR Insights</span>
            <h2 className="text-white mt-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, lineHeight: 1.18, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
              Latest Articles &{' '}
              <span className="text-brass-light" style={{ fontStyle: 'italic' }}>Research</span>
            </h2>
            <div className="gold-rule" />
            <p className="text-slate-light text-base font-light leading-relaxed max-w-lg">
              SHRM-aligned articles on hiring, retention, workforce analytics, and the future of work.
            </p>
          </div>
          <Link
            to="/blog"
            className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-lg border transition-all duration-200"
            style={{ color: 'white', borderColor: 'rgba(255,255,255,0.20)', background: 'transparent' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#D4A84B'; (e.currentTarget as HTMLElement).style.color = '#D4A84B'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.20)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
          >
            All Articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[featured, ...secondary].map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col flex-1 rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-strong"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(181,133,42,0.30)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <div
                  className="h-40 relative flex items-end p-5"
                  style={{ background: 'linear-gradient(150deg, #0E1F15 0%, #1B3A2D 100%)' }}
                >
                  <div className="dot-grid-light absolute inset-0" />
                  <span className="relative text-2xs font-bold tracking-wider bg-brass text-white px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-slate-light text-xs mb-3">
                    <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-white text-base font-semibold leading-snug mb-2 group-hover:text-brass-light transition-colors flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {post.title}
                  </h3>
                  <p className="text-slate-light text-xs font-light leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-brass-light text-xs font-semibold mt-auto">
                    Read Article
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
