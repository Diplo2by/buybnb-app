import AuthProvider from "./context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "BuyBnB",
  description: "What's stopping you from buying your 12th house?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
