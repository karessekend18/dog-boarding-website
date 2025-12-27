import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const sampleClients = [
	{ id: 1, name: 'Sarah M.', email: 'sarah@email.com', phone: '555-1234', dogs: 2 },
	{ id: 2, name: 'James T.', email: 'james@email.com', phone: '555-2345', dogs: 1 },
	{ id: 3, name: 'Emily R.', email: 'emily@email.com', phone: '555-3456', dogs: 3 },
];

export default function Clients() {
	const [q, setQ] = useState('');

	const filtered = sampleClients.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));

	return (
		<Layout>
			<section className="py-8 bg-background min-h-screen">
				<div className="container">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="font-display text-3xl font-bold text-foreground">Clients</h1>
							<p className="text-muted-foreground">Manage your client list and contact details.</p>
						</div>
						<div className="w-64">
							<Input placeholder="Search clients..." value={q} onChange={(e) => setQ(e.target.value)} />
						</div>
					</div>

					<Card className="border-0 shadow-soft">
						<CardContent>
							<div className="space-y-4">
								{filtered.map(c => (
									<div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
										<div>
											<p className="font-semibold text-foreground">{c.name}</p>
											<p className="text-sm text-muted-foreground">{c.email} · {c.phone}</p>
										</div>
										<div className="text-right">
											<p className="text-sm text-muted-foreground">{c.dogs} dogs</p>
											<div className="mt-2 flex gap-2">
												<Button asChild variant="ghost" size="sm">
													<Link to={`/admin/clients/${c.id}`}>View</Link>
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</Layout>
	);
}
