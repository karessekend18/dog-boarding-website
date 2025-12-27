import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah M.',
    dogName: 'Max',
    rating: 5,
    text: "I was so nervous leaving Max for the first time, but the team at Cheezy's Homestay For Dogs made it so easy. He came home happy and tired from all the fun!",
    avatar: 'SM',
  },
  {
    name: 'James T.',
    dogName: 'Luna',
    rating: 5,
    text: "Luna absolutely loves her stays here. The daily photo updates give me so much peace of mind while I'm traveling. Best decision ever!",
    avatar: 'JT',
  },
  {
    name: 'Emily R.',
    dogName: 'Cooper',
    rating: 5,
    text: "The personalized care is incredible. They even remembered Cooper's favorite toys and his special dietary needs. True professionals!",
    avatar: 'ER',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            Happy Tails
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Pet Parents Say
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it - hear from the families who trust us with their furry loved ones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Pet parent of {testimonial.dogName}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
