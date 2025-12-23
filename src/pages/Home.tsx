import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div>
      <Hero />
      
      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">What I Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I specialize in transforming complex problems into elegant, user-friendly solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-sky-600">✦</span>
              </div>
              <h3 className="text-gray-900 mb-3">UX Strategy</h3>
              <p className="text-gray-600">
                Aligning user needs with business goals to create meaningful product experiences
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-sky-600">✦</span>
              </div>
              <h3 className="text-gray-900 mb-3">Product Design</h3>
              <p className="text-gray-600">
                Crafting intuitive interfaces that delight users and drive engagement
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-sky-600">✦</span>
              </div>
              <h3 className="text-gray-900 mb-3">Team Leadership</h3>
              <p className="text-gray-600">
                Building and mentoring high-performing design teams that ship great products
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-gray-900 mb-4">Ready to see my work?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore case studies showcasing my approach to design thinking, problem-solving, and delivering impact.
          </p>
          <Link to="/case-studies">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
              View Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
