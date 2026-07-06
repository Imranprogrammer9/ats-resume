import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blog';

const CATEGORIES = ['All', 'Career Strategy', 'Talent Acquisition', 'Employee Retention', 'Employer Branding', 'Workforce Analytics'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="bg-forest pt-16 pb-20 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="text-2xs font-semibold tracking-[0.16em] uppercase text-brass-light block mb-4">HR Insights</span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.08 }}>
              Articles, Research &{' '}
              <span style={{ fontStyle: 'italic', color: '#D4A84B' }}>Insights</span>
            </h1>
            <div className="w-10 h-0.5 bg-brass mb-5" />
            <p className="text-slate-light font-light leading-relaxed">
              SHRM-aligned content on hiring, retention, workforce analytics, and the evolving world of HR. Every article reviewed before publication.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-brand" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="input-field pl-10 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-brass text-white'
                      : 'bg-white border border-forest/12 text-slate-brand hover:border-brass/25 hover:text-brass'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-brand">No articles found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col flex-1 bg-white rounded-xl border border-forest/[0.07] overflow-hidden hover:border-brass/20 hover:-translate-y-1 hover:shadow-medium transition-all"
                  >
                    <div
                      className="h-36 flex items-end p-4"
                      style={{ background: 'linear-gradient(150deg, #0E1F15 0%, #1B3A2D 100%)' }}
                    >
                      <span className="text-2xs font-bold tracking-wider bg-brass text-white px-2.5 py-0.5 rounded-full">{post.category}</span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex gap-3 text-slate-brand text-xs mb-2.5">
                        <span className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-forest text-base font-semibold leading-snug mb-2 group-hover:text-brass transition-colors flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {post.title}
                      </h3>
                      <p className="text-slate-brand text-xs font-light leading-relaxed mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-1 text-forest text-xs font-semibold mt-auto">
                        Read Article <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
