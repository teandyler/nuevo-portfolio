import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, UserSearch } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
const userTestPhoto = new URL("../assets/user-test-dark.jpg", import.meta.url).href;

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
      <ImageWithFallback
          src={userTestPhoto}
          alt="Professional portrait"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <h1 className="text-[40px] text-gray-200 mb-0 tracking-widest">
            Tyler Mundy
          </h1>
          <h2 className="font-light text-sky-300 text-md tracking-widest mb-8 uppercase">DESIGN LEADER & SYSTEMS BUILDER</h2> 
          <p className="text-gray-300 mb-12 max-w-2xl leading-relaxed tracking-wide">
            I'm a design leader, problem solver, husband and dad. With 13+ years of experience, I've helped teams build products that millions love to use and help guide designers into effective leaders.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/case-studies">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                About Me
                <UserSearch className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
