import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LoginModal from '@/components/LoginModal';

const clientLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/feedback', label: 'Feedback' },
];

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/calendar', label: 'Calendar' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userRole, isLoggedIn, login, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const links = userRole === 'admin' ? [...clientLinks.slice(0, 1), ...adminLinks] : clientLinks;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/favicon.ico" alt="logo" className="h-8 w-8 object-contain transition-transform group-hover:scale-110" />
            <span className="font-display text-xl font-bold text-primary">Cheezy's Homestay For Dogs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {userRole === 'admin' ? 'Admin' : 'Client'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* Show Profile link only for admins */}
                  {userRole === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem onClick={logout} className="gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                {/* Only show the login button when the admin login feature is enabled AND the user is on an /admin path */}
                {import.meta.env.VITE_ENABLE_ADMIN_LOGIN === 'true' && location.pathname.startsWith('/admin') && (
                  <>
                    <Button variant="default" size="sm" onClick={() => setLoginOpen(true)}>
                      Login
                    </Button>
                    <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-border flex gap-2 px-4">
                {isLoggedIn ? (
                  // When logged in on mobile we only show a logout button (admins can open profile via nav links)
                  <Button variant="outline" size="sm" onClick={() => { setIsOpen(false); logout(); }} className="w-full gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <>
                    {import.meta.env.VITE_ENABLE_ADMIN_LOGIN === 'true' && location.pathname.startsWith('/admin') && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => { setLoginOpen(true); setIsOpen(false); }} className="flex-1">
                          Login
                        </Button>
                        <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
