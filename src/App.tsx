import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/layout/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ServicesPage = lazy(() => import('./pages/Services/index'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));
const HRToolsPage = lazy(() => import('./pages/HRTools/index'));
const AttritionPredictorPage = lazy(() => import('./pages/HRTools/AttritionPredictorPage'));
const IndustriesPage = lazy(() => import('./pages/Industries'));
const BlogPage = lazy(() => import('./pages/Blog/index'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const FAQPage = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return <div className="min-h-screen bg-cream" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/hr-tools" element={<HRToolsPage />} />
            <Route path="/hr-tools/attrition-predictor" element={<AttritionPredictorPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Analytics />
    </BrowserRouter>
  );
}
