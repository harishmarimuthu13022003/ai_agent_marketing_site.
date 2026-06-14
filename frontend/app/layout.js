import './globals.css';

export const metadata = {
  title: 'Aether AI - Enterprise-Grade AI Agents',
  description: 'Deploy custom AI agents that actually get work done. Aether AI handles workflow automation, deep research, and customer support with secure, reliable, role-based orchestration.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-950 text-slate-100 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
