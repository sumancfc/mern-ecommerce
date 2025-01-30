"use client";

import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "./StoreProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

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
          <ToastContainer />
          <main className='py-5'>
            <Container>{children}</Container>
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
