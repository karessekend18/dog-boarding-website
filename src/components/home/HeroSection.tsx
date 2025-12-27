import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Shield, Home } from 'lucide-react';
import heroImage from '@/assets/hero-dog.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Happy dog relaxing at home" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Heart className="h-4 w-4 text-coral" />
            <span className="text-sm font-medium">Trusted by 500+ Pet Parents</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            A Home Away From Home For Your Furry Friend
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience the warmth of a loving homestay where your dog is treated like family. 
            Personalized care, cozy environment, and endless belly rubs guaranteed.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Book a Stay
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/services">
                Our Services
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Fully Insured</p>
                <p className="text-xs text-primary-foreground/70">Your pet is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Home Environment</p>
                <p className="text-xs text-primary-foreground/70">Not a kennel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
