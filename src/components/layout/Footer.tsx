import { Link } from 'react-router-dom';

const footerLinks = {
  browse: [
    { label: 'Popular Anime', href: '/browse?sort=popular' },
    { label: 'New Releases', href: '/browse?sort=new' },
    { label: 'Movies', href: '/movies' },
    { label: 'Kids Content', href: '/kids' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gradient">AniStream</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your ultimate destination for anime and cartoon streaming. Watch thousands of episodes in multiple languages.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 AniStream. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Available in:</span>
            <div className="flex gap-2">
              {['🇺🇸', '🇸🇦', '🇫🇷', '🇩🇪', '🇷🇺', '🇨🇳'].map((flag, i) => (
                <span key={i} className="text-lg hover:scale-110 transition-transform cursor-pointer">
                  {flag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
