import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Dog, Send } from 'lucide-react';

export default function DogRegistration() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Owner Info
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    // Dog Info
    dogName: '',
    breed: '',
    age: '',
    weight: '',
    gender: '',
    spayedNeutered: '',
    color: '',
    // Health Info
    vaccinations: '',
    lastVetVisit: '',
    vetName: '',
    vetPhone: '',
    medicalConditions: '',
    medications: '',
    allergies: '',
    // Behavior Info
    temperament: '',
    goodWithDogs: '',
    goodWithKids: '',
    fears: '',
    feedingSchedule: '',
    foodBrand: '',
    specialInstructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Registration Complete!',
      description: "We've received your dog's information. We'll contact you to schedule a meet & greet.",
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 bg-gradient-hero text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Dog Registration Form
            </h1>
            <p className="text-lg text-primary-foreground/90 animate-fade-in-up">
              Please fill out this form before your dog's first stay with us.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container">
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              {[
                { num: 1, label: 'Owner Info' },
                { num: 2, label: 'Dog Info' },
                { num: 3, label: 'Health Info' },
                { num: 4, label: 'Behavior' },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-display font-bold transition-all ${
                      step > s.num
                        ? 'bg-primary text-primary-foreground'
                        : step === s.num
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="h-5 w-5" /> : s.num}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                    step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {s.label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      step > s.num ? 'bg-primary' : 'bg-secondary'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-background">
        <div className="container max-w-3xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Owner Info */}
            {step === 1 && (
              <Card className="border-0 shadow-soft animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-display text-2xl flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                    Owner Information
                  </CardTitle>
                  <CardDescription>Tell us about yourself so we can reach you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                      <Input name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                      <Input name="address" value={formData.address} onChange={handleChange} required placeholder="123 Main St, City" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Emergency Contact *</label>
                      <Input name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required placeholder="Emergency contact name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Emergency Phone *</label>
                      <Input name="emergencyPhone" type="tel" value={formData.emergencyPhone} onChange={handleChange} required placeholder="(555) 987-6543" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>Next Step</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Dog Info */}
            {step === 2 && (
              <Card className="border-0 shadow-soft animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-display text-2xl flex items-center gap-2">
                    <Dog className="h-8 w-8 text-primary" />
                    Dog Information
                  </CardTitle>
                  <CardDescription>Tell us about your furry friend.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Dog's Name *</label>
                      <Input name="dogName" value={formData.dogName} onChange={handleChange} required placeholder="Max" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Breed *</label>
                      <Input name="breed" value={formData.breed} onChange={handleChange} required placeholder="Golden Retriever" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Age *</label>
                      <Input name="age" value={formData.age} onChange={handleChange} required placeholder="3 years" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Weight *</label>
                      <Input name="weight" value={formData.weight} onChange={handleChange} required placeholder="65 lbs" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Color *</label>
                      <Input name="color" value={formData.color} onChange={handleChange} required placeholder="Golden" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Gender *</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full h-11 rounded-lg border border-input bg-background px-3 text-foreground">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Spayed/Neutered? *</label>
                      <select name="spayedNeutered" value={formData.spayedNeutered} onChange={handleChange} required className="w-full h-11 rounded-lg border border-input bg-background px-3 text-foreground">
                        <option value="">Select option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
                    <Button type="button" onClick={nextStep}>Next Step</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Health Info */}
            {step === 3 && (
              <Card className="border-0 shadow-soft animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Health Information</CardTitle>
                  <CardDescription>Important health details for your dog's safety.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Vaccination Status *</label>
                    <Textarea name="vaccinations" value={formData.vaccinations} onChange={handleChange} required placeholder="List current vaccinations and dates (Rabies, DHPP, Bordetella, etc.)" rows={3} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Vet Visit</label>
                      <Input name="lastVetVisit" type="date" value={formData.lastVetVisit} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Vet Name</label>
                      <Input name="vetName" value={formData.vetName} onChange={handleChange} placeholder="Dr. Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Vet Phone</label>
                    <Input name="vetPhone" type="tel" value={formData.vetPhone} onChange={handleChange} placeholder="(555) 111-2222" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Medical Conditions</label>
                    <Textarea name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} placeholder="Any health issues we should know about?" rows={2} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Medications</label>
                    <Textarea name="medications" value={formData.medications} onChange={handleChange} placeholder="List any medications with dosage and timing" rows={2} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Allergies</label>
                    <Input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Food or environmental allergies" />
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
                    <Button type="button" onClick={nextStep}>Next Step</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Behavior */}
            {step === 4 && (
              <Card className="border-0 shadow-soft animate-fade-in">
                <CardHeader>
                  <CardTitle className="font-display text-2xl">Behavior & Preferences</CardTitle>
                  <CardDescription>Help us understand your dog's personality.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Temperament *</label>
                    <select name="temperament" value={formData.temperament} onChange={handleChange} required className="w-full h-11 rounded-lg border border-input bg-background px-3 text-foreground">
                      <option value="">Select temperament</option>
                      <option value="calm">Calm & Relaxed</option>
                      <option value="playful">Playful & Energetic</option>
                      <option value="shy">Shy & Reserved</option>
                      <option value="friendly">Very Friendly</option>
                      <option value="anxious">Anxious</option>
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Good with other dogs? *</label>
                      <select name="goodWithDogs" value={formData.goodWithDogs} onChange={handleChange} required className="w-full h-11 rounded-lg border border-input bg-background px-3 text-foreground">
                        <option value="">Select option</option>
                        <option value="yes">Yes, loves other dogs</option>
                        <option value="sometimes">Sometimes, depends</option>
                        <option value="no">Prefers to be alone</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Good with kids?</label>
                      <select name="goodWithKids" value={formData.goodWithKids} onChange={handleChange} className="w-full h-11 rounded-lg border border-input bg-background px-3 text-foreground">
                        <option value="">Select option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Fears or Triggers</label>
                    <Input name="fears" value={formData.fears} onChange={handleChange} placeholder="Thunderstorms, vacuum, strangers, etc." />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Feeding Schedule *</label>
                      <Input name="feedingSchedule" value={formData.feedingSchedule} onChange={handleChange} required placeholder="e.g., 7am and 6pm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Food Brand *</label>
                      <Input name="foodBrand" value={formData.foodBrand} onChange={handleChange} required placeholder="Brand and type of food" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Special Instructions</label>
                    <Textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} placeholder="Any other important information we should know?" rows={3} />
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
                    <Button type="submit">
                      Submit Registration
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
