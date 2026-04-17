import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import Capabilities from '@/components/Capabilities'
import WhyItMatters from '@/components/WhyItMatters'
import Technology from '@/components/Technology'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-[#050508] min-h-screen">
      <Nav />
      <Hero />
      <WhatWeDo />
      <Capabilities />
      <WhyItMatters />
      <Technology />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
