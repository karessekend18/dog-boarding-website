import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import dogsPlayingImg from '@/assets/dogs-playing.jpg';
import dogSleepingImg from '@/assets/dog-sleeping.jpg';
import dogWalkingImg from '@/assets/dog-walking.jpg';
import dogGroomingImg from '@/assets/dog-grooming.jpg';
import heroImage from '@/assets/hero-dog.jpg';

const galleryImages = [
  { src: heroImage, alt: 'Happy dog relaxing on the couch', category: 'Indoor' },
  { src: dogsPlayingImg, alt: 'Dogs playing in the garden', category: 'Playtime' },
  { src: dogSleepingImg, alt: 'Cozy nap time', category: 'Indoor' },
  { src: dogWalkingImg, alt: 'Adventure time on walks', category: 'Walks' },
  { src: dogGroomingImg, alt: 'Grooming session', category: 'Grooming' },
  { src: heroImage, alt: 'Living room relaxation', category: 'Indoor' },
  { src: dogsPlayingImg, alt: 'Outdoor fun', category: 'Playtime' },
  { src: dogSleepingImg, alt: 'Sweet dreams', category: 'Indoor' },
];

const categories = ['All', 'Indoor', 'Playtime', 'Walks', 'Grooming'];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Gallery
            </h1>
            <p className="text-lg text-primary-foreground/90 animate-fade-in-up">
              Take a peek at the happy pups who've stayed with us. From playtime 
              to naptime, every moment is captured with love.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-primary-foreground text-sm font-medium">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-primary/80 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            {selectedImage !== null && (
              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className="w-full h-auto rounded-xl"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
