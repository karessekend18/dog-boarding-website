import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sampleClients = [
  { id: 1, name: 'Sarah M.', email: 'sarah@email.com', phone: '555-1234', dogs: 2, notes: 'Prefers morning drop-offs' },
  { id: 2, name: 'James T.', email: 'james@email.com', phone: '555-2345', dogs: 1, notes: '' },
  { id: 3, name: 'Emily R.', email: 'emily@email.com', phone: '555-3456', dogs: 3, notes: 'Has a shy dog' },
];

export default function ClientsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clientId = Number(id);
  const client = sampleClients.find(c => c.id === clientId);

  if (!client) {
    return (
      <Layout>
        <section className="py-8 bg-background min-h-screen">
          <div className="container">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-xl">Client not found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We couldn't find that client.</p>
                <div className="mt-4">
                  <Button onClick={() => navigate('/admin/clients')}>Back to Clients</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 bg-background min-h-screen">
        <div className="container">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl">Client: {client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{client.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{client.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dogs</p>
                  <p className="font-medium text-foreground">{client.dogs}</p>
                </div>
                {client.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium text-foreground">{client.notes}</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button onClick={() => navigate('/admin/clients')}>Back</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

