import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CaseStudyCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
}

export function CaseStudyCard({ id, title, summary, image, tags }: CaseStudyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top-left hover:scale-105 transition-transform duration-300"
          style={{ objectPosition: 'top left' }}
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-teal-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">{summary}</p>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Link to={`/case-studies/${id}`}>
          <Button variant="secondary" className="cursor-pointer justify-between gap-4">
            View Case Study
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
