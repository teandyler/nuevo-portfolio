import { Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tyler-dean-mundy-54903465/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/teandyler', label: 'GitHub' },
    { icon: Mail, href: 'mailto:tyler.mundy.ux@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <p className="text-gray-500">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
