import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Star, Send } from 'lucide-react';

const existingFeedback = [
	{
		name: 'Sarah M.',
		dogName: 'Max',
		rating: 5,
		date: '2 weeks ago',
		text: "I was so nervous leaving Max for the first time, but the team at Cheezy's Homestay For Dogs made it so easy. He came home happy and tired from all the fun! The daily photo updates were the best part.",
	},
	{
		name: 'James T.',
		dogName: 'Luna',
		rating: 5,
		date: '1 month ago',
		text: "Luna absolutely loves her stays here. She gets so excited when we pull up to the house! The personalized attention she receives is incredible. Best dog boarding experience ever.",
	},
	{
		name: 'Emily R.',
		dogName: 'Cooper',
		rating: 5,
		date: '1 month ago',
		text: "Cooper has stayed at Cheezy's Homestay For Dogs multiple times now and we couldn't be happier. They remember his favorite toys and his special dietary needs. True professionals who genuinely love dogs!",
	},
	{
		name: 'Michael K.',
		dogName: 'Bella',
		rating: 4,
		date: '2 months ago',
		text: "Great experience overall. Bella had a wonderful time and came back very happy. The only reason for 4 stars is that I wish they had evening pick-up hours, but otherwise excellent service!",
	},
];

export default function Feedback() {
	const { toast } = useToast();
	const { userRole } = useAuth();
	const isAdmin = userRole === 'admin';
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		dogName: '',
		feedback: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (rating === 0) {
			toast({
				title: 'Please select a rating',
				description: 'We value your feedback - please select a star rating.',
				variant: 'destructive',
			});
			return;
		}
		toast({
			title: 'Thank You!',
			description: 'Your feedback has been submitted successfully.',
		});
		setFormData({ name: '', email: '', dogName: '', feedback: '' });
		setRating(0);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<Layout>
			{/* Hero */}
			<section className="relative py-20 bg-gradient-hero text-primary-foreground">
				<div className="container">
					<div className="max-w-2xl">
						<h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
							Feedback & Reviews
						</h1>
						<p className="text-lg text-primary-foreground/90 animate-fade-in-up">
							We love hearing from our pet parents! Share your experience and help
							other dog owners discover the Pawsome difference.
						</p>
					</div>
				</div>
			</section>

			{/* Feedback Form & Reviews */}
			<section className="py-20 bg-background">
				<div className="container">
					<div className={`grid ${isAdmin ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-12`}>
						{/* Submit Feedback (hidden for admins) */}
						{!isAdmin && (
							<div>
								<Card className="border-0 shadow-soft sticky top-24">
									<CardHeader>
										<CardTitle className="font-display text-2xl">
											Share Your Experience
										</CardTitle>
										<CardDescription>
											Your feedback helps us improve and helps other pet parents make
											decisions.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form onSubmit={handleSubmit} className="space-y-6">
											{/* Star Rating */}
											<div>
												<label className="block text-sm font-medium text-foreground mb-3">
													Your Rating *
												</label>
												<div className="flex gap-2">
													{[1, 2, 3, 4, 5].map((star) => (
														<button
															key={star}
															type="button"
															onClick={() => setRating(star)}
															onMouseEnter={() => setHoveredRating(star)}
															onMouseLeave={() => setHoveredRating(0)}
															className="focus:outline-none transition-transform hover:scale-110"
														>
															<Star
																className={`h-8 w-8 transition-colors ${
																	star <= (hoveredRating || rating)
																		? 'fill-accent text-accent'
																		: 'text-muted-foreground'
																}`}
															/>
														</button>
													))}
												</div>
											</div>

											<div className="grid sm:grid-cols-2 gap-4">
												<div>
													<label
														htmlFor="name"
														className="block text-sm font-medium text-foreground mb-2"
													>
														Your Name *
													</label>
													<Input
														id="name"
														name="name"
														value={formData.name}
														onChange={handleChange}
														required
														placeholder="John Doe"
													/>
												</div>
												<div>
													<label
														htmlFor="dogName"
														className="block text-sm font-medium text-foreground mb-2"
													>
														Your Dog's Name *
													</label>
													<Input
														id="dogName"
														name="dogName"
														value={formData.dogName}
														onChange={handleChange}
														required
														placeholder="Max"
													/>
												</div>
											</div>

											<div>
												<label
													htmlFor="email"
													className="block text-sm font-medium text-foreground mb-2"
												>
													Email Address *
												</label>
												<Input
													id="email"
													name="email"
													type="email"
													value={formData.email}
													onChange={handleChange}
													required
													placeholder="john@example.com"
												/>
											</div>

											<div>
												<label
													htmlFor="feedback"
													className="block text-sm font-medium text-foreground mb-2"
												>
													Your Feedback *
												</label>
												<Textarea
													id="feedback"
													name="feedback"
													value={formData.feedback}
													onChange={handleChange}
													required
													placeholder="Tell us about your experience..."
													rows={5}
												/>
											</div>

											<Button type="submit" size="lg" className="w-full">
												Submit Feedback
												<Send className="h-4 w-4 ml-2" />
											</Button>
										</form>
									</CardContent>
								</Card>
							</div>
						)}

						{/* Existing Reviews */}
						<div>
							<h2 className="font-display text-2xl font-bold text-foreground mb-6">
								What Pet Parents Say
							</h2>
							<div className="space-y-6">
								{existingFeedback.map((review, index) => (
									<Card
										key={index}
										className="border-0 shadow-soft animate-fade-in-up"
										style={{ animationDelay: `${index * 0.1}s` }}
									>
										<CardContent className="p-6">
											<div className="flex items-start justify-between mb-4">
												<div className="flex items-center gap-3">
													<div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
														{review.name.split(' ').map((n) => n[0]).join('')}
													</div>
													<div>
														<p className="font-semibold text-foreground">
															{review.name}
														</p>
														<p className="text-sm text-muted-foreground">
															Pet parent of {review.dogName}
														</p>
													</div>
												</div>
												<span className="text-sm text-muted-foreground">
													{review.date}
												</span>
											</div>
											<div className="flex gap-1 mb-3">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${
															i < review.rating
																? 'fill-accent text-accent'
																: 'text-muted-foreground'
														}`}
													/>
												))}
											</div>
											<p className="text-foreground leading-relaxed">
												{review.text}
											</p>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
}
