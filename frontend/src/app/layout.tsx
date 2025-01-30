"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";
import { Container } from "react-bootstrap";
import { StoreProvider } from "./StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <Header />
          <main className='py-5'>
            <Container>{children}</Container>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
