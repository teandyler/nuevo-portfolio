import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  ExternalLink, 
  Box, 
  Palette, 
  Users, 
  FileText,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router-dom';

// Helper to get image URL from asset name
function getImageUrl(imageName: string) {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}

// Import Entrata SVG icons
const entrataIcons = [
  new URL('../assets/svg icons from entrata/Apartments.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Appliances.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Beach Access.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Browser.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Bug.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Bulk Apply.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Cat.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Cleaning.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Clubhouse.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/First Floor.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Landscaping.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Maintenance.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Move Out.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Package.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Piggy Bank.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Remodel.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Robot.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/School.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Signature.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Three D.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Tools.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/View.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Volleyball.svg', import.meta.url).href,
  new URL('../assets/svg icons from entrata/Z Wave On.svg', import.meta.url).href,
];

export function EntrataPatternLibrary() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" }
  };

  const metrics = [
    {
      value: '328k+',
      label: 'Components Used',
      description: '~6.3k per week, powering nearly every Entrata product interface and rocketing the speed of product development.'
    },
    {
      value: '268',
      label: 'Unique Components',
      description: 'Built using 152 tokenized styles for ultimate consistency.'
    },
    {
      value: '200+',
      label: 'Published Updates',
      description: 'Around 20 branches merged to improve performance and scale.'
    },
    {
      value: '532',
      label: 'Custom SVG Icons',
      description: '70 new additions this year for brand cohesion and clarity.'
    }
  ];

  const solutions = [
    {
      icon: Box,
      title: 'Component Standardization',
      description: 'Unified React and Figma components reduced redundant builds and enabled rapid interface updates.'
    },
    {
      icon: Palette,
      title: 'Tokenized Design Language',
      description: 'Systematic design tokens ensure consistency across colors, typography, spacing, and more.'
    },
    {
      icon: Users,
      title: 'Cross-Discipline Governance',
      description: 'Design and engineering teams collaborate on component standards and documentation.'
    },
    {
      icon: FileText,
      title: 'Documentation & Advocacy',
      description: 'Comprehensive guides and active support empower teams to build confidently.'
    }
  ];

  const outcomes = [
    'Reduced time to market by 40–50%',
    'Lowered design debt and engineering redundancy',
    'Unified Entrata\'s product suite under one cohesive visual system',
    'Freed teams to focus on innovation instead of production work'
  ];

  return (
    <div className="bg-slate-950 text-white pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
          <ImageWithFallback
            src={getImageUrl("design-system.png")}
            alt="Blueprint background"
            className="w-full h-full object-cover mix-blend-luminosity"
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
              Entrata Pattern Library 2024
            </h1>
            <p className="text-xl font-light text-slate-300 mb-12 max-w-3xl mx-auto leading-8">
              The foundation of Entrata's product experience — built to scale design quality, speed, and cohesion across the platform.
            </p>
            <p className="text-slate-400 mb-4 max-w-3xl mx-auto leading-4 text-xs font-light italic">Below are some of the usage metrics and work carried out in 2024.</p>
            
            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="whileInView"
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-fuchsia-900/20 backdrop-blur-sm border border-fuchsia-800 rounded-xl p-6"
                >
                  <div className="text-fuchsia-400 mb-1">{metric.value}</div>
                  <div className="text-fuchsia-100">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <a href="https://entrata.github.io/figma_make_components_storybook/?path=/docs/introduction--docs" target="_blank">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Live System
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full p-1">
            <div className="w-1.5 h-3 bg-slate-600 rounded-full mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Challenge Section */}
      <section className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl mb-16 text-center">
              The Challenge: A Fragmented Design Ecosystem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-slate-300 mb-6 leading-relaxed">
                As Entrata's platform expanded, multiple product teams were designing in silos. Without a shared system, we faced inconsistent visuals, duplicated work, and longer build times.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Each product felt different, making it harder for customers to navigate and harder for teams to maintain. Design debt was accumulating, and velocity was slowing down.
              </p>
              
              <div className="mt-8 space-y-3">
                {[
                  'Inconsistent UI patterns across products',
                  'Duplicated components and design work',
                  'Slower development cycles',
                  'Growing technical and design debt'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5" />
                    <span className="text-slate-400">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <div className="aspect-square bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden">
                <ImageWithFallback
                  src={getImageUrl("design-system.png")}
                  alt="Fragmented design"
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl mb-6 text-center">
              The Solution: Building a Unified Design System
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-center text-lg">
              I created a comprehensive pattern library that serves as the single source of truth for Entrata's design and development teams.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8 h-full hover:bg-slate-800/70 transition-colors">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                    <solution.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-white mb-2 text-xl">{solution.title}</h3>
                  <p className="text-slate-400 leading-8">
                    {solution.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="mb-6">Impact & Metrics</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">
              The numbers tell the story of transformation and scale
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
              >
                <div className="text-indigo-400 mb-3 text-2xl">
                  {metric.value}
                </div>
                <h3 className="text-white mb-3 text-xl">{metric.label}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual Chart */}
          <motion.div {...fadeInUp}>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8">
              <h3 className="text-white mb-8 text-center text-2xl">Component Usage Growth</h3>
              <div className="flex items-end justify-between gap-2 h-64">
                {[30, 45, 55, 70, 60, 85, 90, 95, 100, 92, 88, 95].map((height, index) => (
                  <motion.div
                    key={index}
                    className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg relative group cursor-pointer"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded text-xs whitespace-nowrap">
                      {(height * 3.28).toFixed(1)}k
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-slate-500">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </Card>
          </motion.div>

          {/* Icon Grid Preview */}
          <motion.div {...fadeInUp} className="mt-12">
            <div className="text-center mb-8">
              <h3 className="text-white mb-2 text-2xl">532 Custom Icons</h3>
              <p className="text-slate-400">Unified visual language across all products</p>
            </div>
            <div className="grid grid-cols-8 md:grid-cols-12 gap-4">
              {entrataIcons.map((iconPath, index) => (
                <motion.div
                  key={index}
                  className="aspect-square bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center hover:bg-slate-700/50 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.02 }}
                >
                  <img 
                    src={iconPath} 
                    alt={`Icon ${index + 1}`}
                    className="w-6 h-6 object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(90%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(110%) contrast(100%)' }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Outcomes Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGludGVyZmFjZSUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjI3NTY5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Dashboard background"
            className="w-full h-full object-cover blur-2xl"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="mb-8 text-3xl md:text-4xl">
                Driving Entrata's Product Velocity and Quality
              </h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                The Entrata Pattern Library transformed how design and engineering teams build.
              </p>
              
              <div className="space-y-4">
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{outcome}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8">
                <TrendingUp className="w-12 h-12 text-indigo-400 mb-6" />
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Development Speed</span>
                      <span className="text-green-400">+50%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-600 to-green-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: '50%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Design Consistency</span>
                      <span className="text-green-400">+85%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">Team Satisfaction</span>
                      <span className="text-green-400">+92%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: '92%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Looking Ahead Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300">Next Evolution</span>
            </div>
            <h2 className="mb-6 text-3xl md:text-4xl">
              What's Next: Automation and Intelligence
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
              The next evolution of the Entrata Pattern Library focuses on automation, token-driven pipelines, and AI-assisted design workflows.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {[
              {
                icon: Zap,
                title: 'Token Automation',
                description: 'Automated design token syncing between Figma and code'
              },
              {
                icon: Sparkles,
                title: 'AI-Assisted Workflows',
                description: 'Intelligent component generation with Figma Make and Vercel v0'
              },
              {
                icon: TrendingUp,
                title: 'Living Infrastructure',
                description: 'Self-documenting, analytics-driven component evolution'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 p-8 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white mb-2 text-xl">{feature.title}</h3>
                  <p className="text-slate-400 leading-8">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="pb-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">      
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Bottom Navigation */}
          <motion.div
            {...fadeInUp}
            className="mt-20 pt-12 border-t border-slate-800"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Case Studies
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
