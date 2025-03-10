import type { Metadata } from "next";
import "./globals.css";
import { BuyComponent, NavBar } from "./Components";
import { MobileProvider } from "./Elements/hooks";
import React from "react";
import { headers } from "next/headers";
import { VideoStatusProvider } from "./Elements/hooks/globalHooks/VideoStatusContext ";
import { ScrollBlockProvider } from "./Elements/hooks/globalHooks/ScrollBlockContext";
import { BuyModeProvider } from "./Elements/hooks/globalHooks/BuyModeContext";
import { BrowserModeProvider } from "./Elements/hooks/globalHooks/BrowserModeContext";
import { BrowserComponent } from "./Components/browserComponent/BrowserComponent";

export const metadata: Metadata = {
  title: "Total Privacy - Protege tu privacidad en línea",
  description:
    "Total Privacy es una empresa dedicada a garantizar tu anonimato y proteger tu información personal en internet. Ofrecemos herramientas y recursos para navegar de manera segura, evitar el rastreo en línea y mantener tus datos a salvo. Descubre cómo recuperar el control sobre tu privacidad digital con Total Privacy.",
  icons: {
    icon: "/IconTotalPrivacyBigFocus.png", // Favicon estándar
    shortcut: "/IconTotalPrivacyBigFocus.png", // Atajo en algunos navegadores
    apple: "/IconTotalPrivacyBigFocus.png", // Icono para iOS
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent") || "";
  const isMobile =
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent);

  return (
    <html lang="es">
      <body className={""}>
        <BrowserModeProvider>
          <BuyModeProvider>
            <ScrollBlockProvider>
              <MobileProvider initialMobileState={isMobile}>
                <VideoStatusProvider>
                  <NavBar />
                  <BrowserComponent />
                  <BuyComponent />
                  {children}
                </VideoStatusProvider>
              </MobileProvider>
            </ScrollBlockProvider>
          </BuyModeProvider>
        </BrowserModeProvider>
      </body>
    </html>
  );
}
