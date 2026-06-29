import GlowBackground from '@/components/welcome/GlowBackground'
import HeroSection from '@/components/welcome/HeroSection'
import AnimatedTitle from '@/components/welcome/AnimatedTitle'
import IntroSection from '@/components/welcome/IntroSection'
import TypewriterText from '@/components/welcome/TypewriterText'
import PlatformSection from '@/components/welcome/PlatformSection'
import ScrollToTop from '@/components/welcome/ScrollToTop'
import Footer from '@/components/welcome/Footer'

export default function HomePage() {
  return (
    <>
      <GlowBackground />

      <main>
        {/* Hero — 首屏 */}
        <HeroSection scrollToId="intro">
          <AnimatedTitle />
        </HeroSection>

        {/* 自我介绍 — 打字机 */}
        <IntroSection id="intro" scrollToId="platforms">
          <TypewriterText />
        </IntroSection>

        {/* 多平台引流 */}
        <PlatformSection id="platforms" />
      </main>

      <Footer />

      {/* 回到顶部 */}
      <ScrollToTop />
    </>
  )
}
