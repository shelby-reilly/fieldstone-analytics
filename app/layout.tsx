import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fieldstone Analytics | Predictive Intelligence for Physical Systems',
  description:
    'Fieldstone Analytics builds data-efficient digital twin platforms that model, simulate, and optimize orthopedic and robotic systems.',
  keywords:
    'digital twins, predictive modeling, orthopedic simulation, robotics, data-efficient machine learning',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
