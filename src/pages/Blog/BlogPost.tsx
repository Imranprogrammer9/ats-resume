import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-forest mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Article Not Found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <>
      <section className="bg-forest pt-16 pb-16 relative overflow-hidden">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-slate-light text-xs mb-6">
            <Link to="/" className="hover:text-brass-light transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-brass-light transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-brass-light truncate max-w-xs">{post.title}</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-2xs font-bold tracking-wider bg-brass text-white px-3 py-1.5 rounded-full inline-block mb-5">
              {post.category}
            </span>
            <h1 className="text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.12 }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-light text-sm">
              <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime} min read</span>
              <span>{post.date}</span>
              <span>{post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-sand">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-forest/[0.07] p-8 prose max-w-none">
                <p className="text-slate-brand font-light leading-relaxed text-base mb-6">{post.excerpt}</p>
                <p className="text-slate-brand font-light leading-relaxed mb-6">
                  This is a full article placeholder. In a production environment, this content would be sourced from a CMS (such as Sanity, Contentful, or a Supabase-backed markdown store) and rendered with full rich-text support including headings, images, code blocks, and pull quotes.
                </p>
                <p className="text-slate-brand font-light leading-relaxed mb-6">
                  The HR Vanguard blog publishes practical, evidence-based content on human resources management, talent acquisition, employee retention, and workforce analytics — all reviewed against SHRM guidelines before publication.
                </p>
                <div className="bg-brass/8 border border-brass/25 rounded-xl p-5 mt-8">
                  <p className="text-forest text-sm font-medium mb-1">SHRM Content Standard</p>
                  <p className="text-slate-brand text-xs font-light leading-relaxed">
                    This article has been reviewed against SHRM (Society for Human Resource Management) guidelines to ensure accuracy and professional integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <Link to="/blog" className="flex items-center gap-2 text-sm font-medium text-slate-brand hover:text-forest transition-colors">
                  <ArrowLeft size={14} />
                  All Articles
                </Link>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl border border-forest/[0.07] p-5 mb-4">
                <p className="text-2xs font-semibold tracking-wider uppercase text-slate-brand mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-2xs bg-sand border border-forest/10 text-slate-brand px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-forest rounded-xl p-6">
                <p className="text-brass-light text-2xs font-semibold tracking-wider uppercase mb-3">Enjoyed This?</p>
                <h4 className="text-white text-lg font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Get HR Insights Monthly</h4>
                <p className="text-slate-light text-xs font-light mb-4">SHRM-aligned articles delivered to your inbox. No spam.</p>
                <input type="email" placeholder="your@email.com" className="input-field-dark text-sm mb-3" />
                <button className="w-full btn-primary text-sm justify-center">Subscribe</button>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-forest mb-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="group bg-white rounded-xl border border-forest/[0.07] p-5 hover:border-brass/20 hover:shadow-medium transition-all"
                  >
                    <span className="text-2xs font-bold tracking-wider text-brass block mb-2">{r.category}</span>
                    <h4 className="text-forest text-sm font-semibold leading-snug group-hover:text-brass transition-colors mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {r.title}
                    </h4>
                    <div className="flex items-center gap-1 text-2xs text-slate-brand font-medium">
                      Read <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
