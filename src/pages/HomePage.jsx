import React from 'react'
import AnnouncementBar from '../components/AnnouncementBar.jsx'
import SiteNavbar      from '../components/SiteNavbar.jsx'
import HeroSection     from '../components/HeroSection.jsx'
import BestSeller      from '../components/BestSeller.jsx'
import InstagramFeed   from '../components/InstagramFeed.jsx'
import FeaturesBar     from '../components/FeaturesBar.jsx'
import SiteFooter      from '../components/SiteFooter.jsx'

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteNavbar />
      <main>
        <HeroSection />
        <BestSeller />
        <InstagramFeed />
        <FeaturesBar />
      </main>
      <SiteFooter />
    </>
  )
}
