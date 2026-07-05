import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="text-[8rem] font-bold leading-none mb-4 select-none" style={{ color: 'rgba(27,58,45,0.08)', fontFamily: 'Poppins, sans-serif' }}>
          404
        </div>
        <h1 className="text-3xl font-bold text-forest mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Page Not Found</h1>
        <p className="text-slate-brand font-light mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn-primary">
            <Home size={15} />
            Back to Home
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Us
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
