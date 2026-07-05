import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import TrustedBy from '../components/sections/TrustedBy';
import FeaturedServices from '../components/sections/FeaturedServices';
import HRTechPlatform from '../components/sections/HRTechPlatform';
import AttritionPreview from '../components/sections/AttritionPreview';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Testimonials from '../components/sections/Testimonials';
import IndustriesSection from '../components/sections/IndustriesSection';
import LatestArticles from '../components/sections/LatestArticles';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustedBy />
      <FeaturedServices />
      <HRTechPlatform />
      <AttritionPreview />
      <ProcessTimeline />
      <Testimonials />
      <IndustriesSection />
      <LatestArticles />
      <FAQSection />
      <CTASection />
    </>
  );
}
