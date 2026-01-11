import { Outlet } from 'react-router-dom';
import AdminNavbar from '@/pages/admin/AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNavbar />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
}
