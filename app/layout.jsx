import { Montserrat } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/libs/constants';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  keywords: ["aksesori rumah", "dekorasi rumah", "peralatan kamar mandi", "pencahayaan", "home accessories Indonesia"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body className={`${montserrat.variable} min-h-screen flex flex-col bg-warm-ivory text-charcoal font-sans antialiased selection:bg-deep-olive selection:text-white`}>
        {children}
      </body>
    </html>
  );
}



