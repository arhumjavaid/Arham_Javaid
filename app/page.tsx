import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { AskAI } from "@/components/AskAI";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";
import { BootSequence } from "@/components/BootSequence";
import { CRT } from "@/components/CRT";

export default function Home() {
  return (
    <>
      <BootSequence />
      <CRT />
      <Background />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AskAI />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
