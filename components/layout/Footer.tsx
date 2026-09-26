import Link from 'next/link'
import { Settings } from '@/lib/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

interface FooterProps {
  settings: Settings
}

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

const POLICY_LINKS = [
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/return-policy', label: 'Return Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
]

const CATEGORIES_LINKS = [
  { href: '/dry-fruits', label: 'Dry Fruits' },
  { href: '/nuts', label: 'Nuts' },
  { href: '/berries', label: 'Berries & Fruits' },
  { href: '/seeds', label: 'Seeds' },
  { href: '/makhana', label: 'Makhana' },
  { href: '/saffron', label: 'Saffron' },
  { href: '/wellness', label: 'Wellness' },
]

export function Footer({ settings }: FooterProps) {
  const waPhone = settings.whatsapp_number || '917082977350'
  const waUrl = buildWhatsAppUrl(waPhone, 'Hello Dhanya Trail! I would like to place an order.')
  const phone = settings.phone || '+91 70829 77350'
  const email = settings.email || 'Dhanayatrail@gmail.com'
  const address = settings.address || 'HTML Colony, Azad Nagar, Hisar, Haryana 125001'

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="footer-brand-devanagari">धन्य</div>
            <div className="footer-brand-name">Dhanya Trail</div>
            <div className="footer-brand-tagline">NUTS • DRY FRUITS • HEALTHY SNACKS</div>
            <p className="footer-brand-desc">
              A journey towards better choices. Premium dry fruits, nuts, berries, seeds and traditional wellness essentials — thoughtfully selected for everyday goodness.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
              style={{ display: 'inline-flex' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
              </svg>
              Order on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-heading">Quick Links</div>
            <div className="footer-links">
              {QUICK_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-heading">Shop By</div>
            <div className="footer-links">
              {CATEGORIES_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-heading">Contact Us</div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <a href={`tel:${phone}`} className="footer-link">{phone}</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <a href={`mailto:${email}`} className="footer-link">{email}</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                {address}
              </span>
            </div>

            <div style={{ marginTop: 'var(--space-lg)' }}>
              <div className="footer-heading">Policies</div>
              <div className="footer-links">
                {POLICY_LINKS.map(link => (
                  <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Dhanya Trail. All rights reserved. | Hisar, Haryana, India
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>
            Made with ❤️ in India
          </div>
        </div>
      </div>
    </footer>
  )
}
