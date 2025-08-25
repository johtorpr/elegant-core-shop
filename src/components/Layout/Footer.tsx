import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'Sobre Nosotros', href: '/about' },
    { label: 'Política de Devoluciones', href: '/returns' },
    { label: 'Términos y Condiciones', href: '/terms' },
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Preguntas Frecuentes', href: '/faq' },
    { label: 'Guía de Tallas', href: '/size-guide' }
  ];

  const categories = [
    { label: 'Zapatillas Running', href: '/category/running' },
    { label: 'Zapatillas Casual', href: '/category/casual' },
    { label: 'Zapatillas Basketball', href: '/category/basketball' },
    { label: 'Zapatillas Lifestyle', href: '/category/lifestyle' },
    { label: 'Ofertas Especiales', href: '/deals' },
    { label: 'Nuevos Lanzamientos', href: '/new-arrivals' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container-responsive">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">
                Sneaker<span className="text-accent">Hub</span>
              </h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Tu tienda especializada en zapatillas de las mejores marcas. 
                Calidad, estilo y comodidad en cada paso que das.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 bg-secondary-foreground/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Av. Principal 123</p>
                    <p>Centro Comercial Plaza</p>
                    <p>Madrid, España 28001</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <p>+34 912 345 678</p>
                    <p>+34 600 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="text-sm">
                    <p>info@sneakerhub.com</p>
                    <p>ventas@sneakerhub.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Lun - Vie: 9:00 - 21:00</p>
                    <p>Sáb - Dom: 10:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Enlaces Útiles</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Categorías</h4>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors duration-200 hover:underline"
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-secondary-foreground/20 py-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Suscríbete a nuestro newsletter</h4>
              <p className="text-sm text-secondary-foreground/80">
                Recibe las últimas ofertas y novedades directamente en tu email
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-2 bg-background text-foreground border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="btn-primary px-6 py-2 whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-foreground/80">
              © 2024 SneakerHub. Todos los derechos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="/terms"
                className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                Términos de Uso
              </a>
              <a
                href="/privacy"
                className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                Privacidad
              </a>
              <a
                href="/cookies"
                className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};