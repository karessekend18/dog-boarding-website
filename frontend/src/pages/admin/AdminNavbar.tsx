import { Link, NavLink } from 'react-router-dom';

export default function AdminNavbar() {
  const navItemClass =
    'px-3 py-2 rounded-md text-sm font-medium hover:bg-muted';

  const activeClass =
    'bg-primary text-primary-foreground';

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-14 items-center gap-6">
        <Link to="/admin/dashboard" className="font-bold">
          Admin Panel
        </Link>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeClass : ''}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeClass : ''}`
          }
        >
          Bookings
        </NavLink>

        <NavLink
          to="/admin/calendar"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeClass : ''}`
          }
        >
          Calendar
        </NavLink>

        <NavLink
          to="/admin/reviews"
          className={({ isActive }) =>
            `${navItemClass} ${isActive ? activeClass : ''}`
          }
        >
          Reviews
        </NavLink>
      </div>
    </nav>
  );
}
