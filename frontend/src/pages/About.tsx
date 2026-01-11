import { Layout } from '@/components/Layout';
import { Heart, Users, Award, Clock, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-dog.jpg';

const values = [
  {
    icon: Heart,
    title: 'Love & Care',
    description: 'Every dog is treated as part of our family with individual attention and affection.',
  },
  {
    icon: Users,
    title: 'Small Groups',
    description: 'We keep our guest numbers limited to ensure personalized care for each pup.',
  },
  {
    icon: Award,
    title: 'Experience',
    description: 'Over 10 years of professional pet care experience you can trust.',
  },
  {
    icon: Clock,
    title: '24/7 Care',
    description: 'Round-the-clock supervision and care for your peace of mind.',
  },
];

const features = [

  'Daily photo and video updates',
  'Spacious terrace for playtime',

  'Home cooked meals provided',
  'Medication administration if needed'

];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              About Cheezy's Homestay For Dogs
            </h1>
            <p className="text-lg text-primary-foreground/90 animate-fade-in-up">
              We're a family-run dog boarding homestay dedicated to providing 
              the same love and care you give your furry friend at home.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Dream Born From Love
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cheezy’s Homestay for Dogs was born from a place of deep love and remembrance.

                  Our beloved and beautiful Cheezy girl, was more than just a pet — she was family. When we lost her in 2014, the emptiness she left behind inspired something meaningful. In her memory, Kenneth and Rehana decided to open their home to other furry companions who deserved the same warmth, care, and affection that Cheezy had always known.
                </p>
                <p>
                   What began as a tribute to Cheezy soon grew into a homestay built on compassion, trust, and genuine love for animals. At Cheezy’s Homestay, dogs are not treated as customers, but as family. Every fur baby receives personal attention, care, and comfort in a safe, home-like environment.
                </p>
                <p>
                  This is not just a business — it is a passion. A home where every wagging tail is welcomed, every paw is cared for, and every dog is loved as our own.
                  Because every dog deserves a second home filled with love.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <img 
                src={heroImage} 
                alt="Happy dog at Cheezy's Homestay For Dogs"
                className="rounded-2xl shadow-medium w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-4 rounded-xl shadow-medium">
                <p className="font-display text-3xl font-bold">10+</p>
                <p className="text-sm">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at Cheezy's Homestay For Dogs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-card p-6 rounded-xl shadow-soft text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                What Makes Us Different
              </h2>
              <p className="text-muted-foreground mb-8">
                We go above and beyond to ensure your dog's stay is comfortable, 
                safe, and filled with love.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={feature} 
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Meet & Greet Policy
              </h3>
              <p className="text-muted-foreground mb-4">
                We require a meet & greet for all first-time guests. This allows us to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Get to know your dog's personality</span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Ensure your fur baby is comfortable in our home</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">Answer all your questions in person</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
