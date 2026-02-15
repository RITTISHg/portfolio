import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "RITTISH G — Engineer & Innovator | Embedded Systems · IoT · Aerospace",
  description:
    "Portfolio of Rittish G — EEE Engineer & Innovator specializing in Embedded Systems, IoT Solutions, Industrial Automation, and Aerospace Design.",
  keywords: [
    "Rittish G",
    "EEE Engineer",
    "Embedded Systems",
    "IoT",
    "Arduino",
    "ESP8266",
    "MATLAB",
    "Portfolio",
  ],
  authors: [{ name: "Rittish G" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
