import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Bento from "@/components/Bento";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <div className="min-h-screen bg-transparent text-neutral-50 selection:bg-blue-500 selection:text-white font-sans">
      <Navbar />
      <main className="max-w-[85rem] mx-auto px-6 sm:px-8 md:px-12 pb-24 flex flex-col gap-24 md:gap-32 overflow-hidden">
        <Hero />
        <Experience />
        <Services />
        <Projects projects={projects} />
        <Bento />
      </main>
      <Footer />
    </div>
  );
}
