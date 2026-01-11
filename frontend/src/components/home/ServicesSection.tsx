import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Scissors, MapPin, ArrowRight } from 'lucide-react';
import dogsPlayingImg from '@/assets/dogs-playing.jpg';
import dogSleepingImg from '@/assets/dog-sleeping.jpg';
import dogWalkingImg from '@/assets/dog-walking.jpg';
import dogGroomingImg from '@/assets/dog-grooming.jpg';
import homelyfoodImg from '@/assets/homelyfood.jpg';
import { Home, PawPrint} from 'lucide-react';



const services = [
  {
    icon: Moon,
    title: 'Boarding',
    description: 'Cozy overnight stays with 24/7 supervision, comfy beds, and bedtime snacks.',
    image: dogSleepingImg

  },
  {
    icon: Sun,
    title: 'Daycare',
    description: 'Full-day fun with playtime, socialization, and plenty of exercise.',
    image: dogsPlayingImg
  },
  {
    icon: MapPin,
    title: 'Dog Walking',
    description: 'Daily adventures in the neighborhood to keep your dog happy and healthy.',
    image: dogWalkingImg,

  },
 {
    icon: Home,
    title: 'Homely Food',
    description: 'Fresh, home-cooked meals prepared with care to keep your fur baby comfortable and happy.',
    image: homelyfoodImg
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything Your Pup Needs
          </h2>
          <p className="text-muted-foreground">
            We offer comprehensive care
            tailored to your dog's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group overflow-hidden border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-medium">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <p className="text-primary font-semibold">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="default" size="lg">
            <Link to="/services">
              View All Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
