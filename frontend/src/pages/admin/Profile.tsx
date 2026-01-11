import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <section className="py-8 bg-background">
        <div className="container max-w-2xl">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Admin Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-lg font-medium">{userRole ?? 'Unknown'}</p>

                <div className="pt-4">
                  <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

