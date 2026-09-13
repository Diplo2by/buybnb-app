import { Figtree } from 'next/font/google';
import AuthProvider from "./context/AuthContext";
import "./globals.css";

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-figtree',
});

export const metadata = {
  title: "BuyBnB",
  description: "What's stopping you from buying your 12th house?",
  icons: {
    icon: '/icon.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={figtree.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
