import { CaseStudyCard } from '../components/CaseStudyCard';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles } from 'lucide-react';
import caseStudiesData from '../data/caseStudies.json';

// Helper to get image URL from asset name
function getImageUrl(imageName: string) {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}

export function CaseStudies() {
  // Map case studies data to card format - dynamically from JSON
  const caseStudies = Object.values(caseStudiesData).map((study) => ({
    id: study.id,
    title: study.title,
    summary: study.tldr,
    image: getImageUrl(study.heroImage),
    tags: study.tags,
  }));

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-gray-900 mb-6 font-semibold text-4xl md:text-5xl">Case Studies</h1>
            <p className="text-gray-600 leading-relaxed">
            I specialize in designing systems, workflows, and tools that help product teams move from ambiguity to clarity. My work sits at the intersection of design, product strategy, and enablement — building frameworks that empower teams to make better decisions faster, especially as organizations adopt AI-assisted workflows.
<br/><br/>Across these case studies, you’ll see a consistent theme:
<span className="font-semibold">Turning fragmented processes into clear, scalable systems that elevate quality, speed, and alignment.</span>

            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <span className="text-sky-300">Featured Case Study</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-4">Entrata Pattern Library 2024</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                A deep dive into building and scaling Entrata's design system — featuring 328k+ component insertions, 268 unique components, and measurable business impact across the product suite.
              </p>
              <Link to="/entrata-pattern-library">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  View Full Case Study
                </Button>
              </Link>
            </div>
            <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
              <img
                src="src/assets/design-system.png"
                alt="Entrata Pattern Library"
                className="w-full h-full object-cover object-top opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} {...study} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
