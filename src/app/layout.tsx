import "./globals.css";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Framer Site Converter - Export Framer Websites to HTML",
  description:
    "Convert Framer websites and prototypes into clean, production-ready HTML code. Remove watermarks and export your Framer sites for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="6ec7571b-f02e-4be7-a14a-94bf657ef62c"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>
          {children}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  function removeFramerElements(){
                    try {
                      var selectors = [
                        'a.__framer-badge',
                        '.__framer-badge',
                        '#__framer-badge-container',
                        'div#__framer-badge-container',
                        '[data-framer-name="Badge"]',
                        '[data-framer-appear-id][class*="__framer-badge"]',
                        '[class*="__framer-badge"]',
                        'div[id^="__framer-badge"]',
                        'div[class^="framer-"][class*="__framer-badge"]',
                        '#__framer-editorbar-container',
                        '#__framer-editorbar-button',
                        '#__framer-editorbar-label',
                        '[id^="__framer-editorbar"]'
                      ];
                      var nodes = document.querySelectorAll(selectors.join(','));
                      nodes.forEach(function(node){
                        try { node.remove(); } catch(_) {}
                      });
                    } catch (e) {}
                  }
                  removeFramerElements();
                  var obs = new MutationObserver(function(mutations){ removeFramerElements(); });
                  obs.observe(document.documentElement || document.body, { childList: true, subtree: true });
                  window.addEventListener('load', removeFramerElements);
                })();
              `,
            }}
          />
        </MantineProvider>
      </body>
    </html>
  );
}
