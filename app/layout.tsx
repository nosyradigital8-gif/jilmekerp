import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jilmeker ERP | Roofing Operations Control Room',
  description: 'Phase 1 working demo for Jilmek Construction roofing surveys, projects, inventory and financial operations.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
