import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import caseStudiesData from '../data/caseStudies.json';

// Helper function to render markdown-like content with bullet points
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentParagraph: string[] = [];
  let listItems: React.ReactElement[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith('- ')) {
      // If we have accumulated paragraph text, render it first
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="text-slate-300 mb-4 leading-relaxed">
            {currentParagraph.join('\n')}
          </p>
        );
        currentParagraph = [];
      }
      
      const listItem = trimmed.substring(2);
      // Handle bold text
      const parts = listItem.split(/\*\*(.*?)\*\*/);
      const listContent = parts.map((part, i) => 
        i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part
      );
      
      listItems.push(
        <li key={`li-${index}`} className="flex items-start gap-3 mb-3">
          <span className="text-indigo-400 mt-1">•</span>
          <span className="text-slate-300">{listContent}</span>
        </li>
      );
    } else if (trimmed === '') {
      // Empty line - close current paragraph or list
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="space-y-3 mb-6 list-none">
            {listItems}
          </ul>
        );
        listItems = [];
      } else if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${index}`} className="text-slate-300 mb-4 leading-relaxed">
            {currentParagraph.join('\n')}
          </p>
        );
        currentParagraph = [];
      }
    } else {
      // Regular text line
      if (listItems.length > 0) {
        // Close the list first
        elements.push(
          <ul key={`ul-${index}`} className="space-y-3 mb-6 list-none">
            {listItems}
          </ul>
        );
        listItems = [];
      }
      currentParagraph.push(trimmed);
    }
  });

  // Handle remaining content
  if (listItems.length > 0) {
    elements.push(
      <ul key="ul-final" className="space-y-3 mb-6 list-none">
        {listItems}
      </ul>
    );
  }
  
  if (currentParagraph.length > 0) {
    elements.push(
      <p key="p-final" className="text-slate-300 mb-4 leading-relaxed">
        {currentParagraph.join('\n')}
      </p>
    );
  }

  return <div>{elements}</div>;
}

export function CaseStudyDetail() {
  const { id } = useParams();
  const study = caseStudiesData[id as keyof typeof caseStudiesData];

  if (!study) {
    return (
      <div className="bg-slate-950 text-white pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-indigo-400 hover:text-indigo-300">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  // Load images
  const heroImage = new URL(`../assets/${study.heroImage}`, import.meta.url).href;
  const problemImage = new URL(`../assets/${study.problemImage}`, import.meta.url).href;
  const solutionImage = new URL(`../assets/${study.solutionImage}`, import.meta.url).href;
  
  // Handle solution URL - if it's a PDF file, convert to asset URL, otherwise use as-is (external URL)
  const solutionUrl = study.solutionUrl && study.solutionUrl.endsWith('.pdf')
    ? new URL(`../assets/${study.solutionUrl}`, import.meta.url).href
    : study.solutionUrl;

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" as any }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" }
  };

  return (
    <div className="bg-slate-950 text-white pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          <ImageWithFallback
            src={heroImage}
            alt={study.title}
            className="w-full h-full object-cover mix-blend-luminosity object-top-left"
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-8">
              <span className="text-indigo-300">Case Study</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {study.title}
            </h1>
            <p className="text-lg font-light text-slate-300 mb-12 max-w-3xl mx-auto leading-8">
              {study.subtitle}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {study.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-cyan-900/80 backdrop-blur-sm border border-cyan-800 rounded-full text-cyan-400 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Project Overview */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="whileInView"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-fuchsia-900/20 backdrop-blur-sm border border-fuchsia-800 rounded-xl p-6"
              >
                <div className="text-fuchsia-400 mb-2">Role</div>
                <div className="text-fuchsia-100">{study.role}</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-fuchsia-900/20 backdrop-blur-sm border border-fuchsia-800 rounded-xl p-6"
              >
                <div className="text-fuchsia-400 mb-2">Timeline</div>
                <div className="text-fuchsia-100">{study.timeline}</div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="bg-fuchsia-900/20 backdrop-blur-sm border border-fuchsia-800 rounded-xl p-6"
              >
                <div className="text-fuchsia-400 mb-2">Team</div>
                <div className="text-fuchsia-100">{study.team}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full p-1">
            <div className="w-1.5 h-3 bg-slate-600 rounded-full mx-auto" />
          </div>
        </motion.div>
      </section>
      
      {/* TL;DR Section */}
      <section className="py-32 bg-gradient-to-b from-emerald-900 to-emerald-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto justify-center items-center flex flex-col">
            <h2 className="text-3xl md:text-4xl mb-6 text-center font-bold text-emerald-100">TL;DR</h2>
            <p className="text-xl leading-10 text-center max-w-2xl text-green-400">
              {study.tldr}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
            {/* Problem Image */}
            <div className="mb-12 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
              <ImageWithFallback
                src={problemImage}
                alt="Problem illustration"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold">Problem</h2>
              <div className="max-w-none leading-8">
              <p className="text-slate-100 text-xl leading-10 max-w-2xl">{renderContent(study.problem)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-32 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-12 text-center font-bold">Solution</h2>
            
            {/* Solution Image */}
            <div className="mb-12 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
              <ImageWithFallback
                src={solutionImage}
                alt="Solution illustration"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {solutionUrl && (
              <div className="mb-8 text-center">
                <a href={solutionUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    {study.solutionButtonText}
                  </Button>
                </a>
              </div>
            )}
            
            <div className="max-w-none">
            <p className="text-slate-100 text-lg leading-8 max-w-2xl">{renderContent(study.solution)}</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Impact & Metrics Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-12 text-center font-bold">Impact & Metrics</h2>
            <div className="max-w-none">
            <p className="text-slate-100 text-lg leading-8 max-w-2xl">{renderContent(study.impact)}</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Learnings Section */}
      <section className="py-32 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl md:text-4xl mb-4 text-center font-bold flex items-center justify-center gap-3">Learnings</h2>
            <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-8">
              <p className="text-slate-300 text-lg leading-relaxed">
                {study.learnings}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* What's Next Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl md:text-4xl mb-4 text-center font-bold flex items-center justify-center gap-3">What's Next</h2>
            <div className="bg-green-900/20 border border-green-800 rounded-xl p-8">
              <p className="text-slate-300 text-lg leading-relaxed">
                {study.whatsNext}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Navigation */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="mt-20 pt-12 border-t border-slate-800">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
