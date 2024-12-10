import { Josefin_Sans } from "next/font/google";

import "./globals.css";
import Header from "./_components/Header";
import { SearchProvider } from "./contexts/SearchContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Nextflix",
  description: "Find your favorite movies and shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} min-h-screen overflow-auto bg-background-darkest p-7 text-text-light antialiased`}
      >
        <SearchProvider>
          <Header />
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}
