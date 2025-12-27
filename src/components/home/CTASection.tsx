import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Spots Available</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Give Your Pup the Vacation They Deserve?
          </h2>
          
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Schedule a meet & greet today and see why hundreds of pet parents trust us 
            with their beloved companions.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="accent" size="xl">
              <Link to="/contact">
                Schedule Meet & Greet
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
