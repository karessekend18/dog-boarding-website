import { Layout } from '@/components/Layout';
import { Home, PawPrint } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Moon, Sun, Scissors, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import dogsPlayingImg from '@/assets/dogs-playing.jpg';
import dogSleepingImg from '@/assets/dog-sleeping.jpg';
import dogWalkingImg from '@/assets/dog-walking.jpg';
import dogGroomingImg from '@/assets/dog-grooming.jpg';
import homelyfoodImg from '@/assets/homelyfood.jpg';
import treatsImg from '@/assets/treats.jpg';

const services = [
  {
    id: 'boarding',
    icon: Moon,
    title: 'Boarding',
    description: 'Your dog will enjoy a comfortable overnight stay in our loving home environment.',
    image: dogSleepingImg,
    price: '$45',
    priceUnit: 'per night',
    features: [
      'Comfortable sleeping arrangements',
      '24/7 supervision and care',
        'Evening and morning walks',
      'Daily photo updates'
    ],
  },
  {
    id: 'daycare',
    icon: Sun,
    title: 'Daycare',
    description: 'A full day of fun, exercise, and socialization with other friendly dogs.',
    image: dogsPlayingImg,
    price: '$30',
    priceUnit: 'per day',
    features: [
      'Supervised group play',
      'Indoor and outdoor activities',
      'Nap time in quiet area',
      'Socialization',
      'Photo updates throughout the day',
    ],
  },
  {
    id: 'walking',
    icon: MapPin,
    title: 'Dog Walking',
    description: 'Regular exercise and adventure in the great outdoors with our experienced walkers.',
    image: dogWalkingImg,
    price: '$20',
    priceUnit: 'per 30-min walk',
    features: [
      'Neighborhood walks'
    ],

  },
    {
      id: 'homely-food',
      icon: Home,
      title: 'Homely Food',
      description: 'Fresh, home-cooked meals prepared with love to provide comfort, familiarity, and proper nutrition for your fur baby.',
      image: homelyfoodImg,

      features: [
        'Fresh home-cooked meals',
        'Prepared with care and hygiene',
        'Comfort food for a home-like stay'
      ],
    },
    {
      id: 'playtime-treats',
      icon: PawPrint,
      title: 'Fun Playtime & Treats',
      description: 'Supervised play sessions combined with love, attention, and treats to keep your dogs happy and active.',
      image: treatsImg,

      features: [
        'Supervised indoor and outdoor play',
        'Mental and physical stimulation',
        'Healthy treats during the day',
        'Lots of love and personal attention'
      ],
    },



];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/90 animate-fade-in-up">
              From overnight stays to pamper sessions, we offer comprehensive care 
              tailored to your dog's unique needs and personality.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="rounded-2xl shadow-medium w-full h-80 object-cover"
                    />

                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </Layout>
  );
}
