import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "School ERP - Modern School Management System",
  description: "A world-class school management system for managing students, teachers, attendance, exams, fees, and more.",
  keywords: "school, erp, management, students, teachers, attendance, fees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
