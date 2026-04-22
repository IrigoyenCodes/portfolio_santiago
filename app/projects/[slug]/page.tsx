import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, Check, Database, TrendingUp, Monitor } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Santiago Irigoyen`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Santiago Irigoyen`,
      description: project.subtitle,
      images: [{ url: project.image }],
    },
  };
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const getTechIcon = (index: number) => {
    return index % 2 === 0
      ? <Monitor className="w-6 h-6 text-neutral-400" />
      : <Database className="w-6 h-6 text-neutral-400" />;
  };

  return (
    <div className="min-h-screen bg-transparent text-neutral-50 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-[90rem] mx-auto w-full px-6 sm:px-8 md:px-12 pt-32 pb-24">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Sticky Sidebar Navigation */}
          <aside className="w-full lg:w-[260px] shrink-0">
            <div className="sticky top-32 flex flex-col gap-10">

              <div className="flex flex-col gap-6">
                <Link href="/#projects" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-sm font-medium hover:bg-neutral-800 hover:text-white transition-colors w-fit">
                  <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Link>

                <div className="flex flex-col gap-1 mt-6">
                  <h3 className="text-white font-medium text-lg mb-4 px-3">Overview</h3>
                  <a href="#challenge" className="px-3 py-2 text-neutral-300 hover:text-white transition-colors text-sm">Challenge</a>
                  <a href="#solution" className="px-3 py-2 text-neutral-300 hover:text-white transition-colors text-sm">Solution</a>
                  <a href="#tech-stack" className="px-3 py-2 text-neutral-300 hover:text-white transition-colors text-sm">Tech Stack</a>
                  <a href="#results" className="px-3 py-2 text-neutral-300 hover:text-white transition-colors text-sm">Results</a>
                </div>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors shadow-md"
                  >
                    View Live Demo
                  </a>
                )}
              </div>

            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col gap-24 lg:border-l lg:border-neutral-800 lg:pl-16 xl:pl-24">

            {/* Header Section */}
            <section className="flex flex-col gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white mb-2">{project.title}</h1>
              <p className="text-xl sm:text-3xl text-neutral-200 leading-snug font-display font-medium max-w-3xl">
                {project.subtitle}
              </p>

              <section id="overview" className="scroll-mt-32">
                <h2 className="text-2xl font-display font-medium text-white mb-6 flex items-center gap-2">Overview</h2>
                <div className="flex flex-col gap-4 text-neutral-200 leading-relaxed text-lg mb-12">
                  {project.about.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="w-full max-w-3xl bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={900}
                    className="object-contain w-full h-auto"
                    referrerPolicy="no-referrer"
                    unoptimized
                  />
                </div>
              </section>
            </section>

            <hr className="border-neutral-800" />

            {/* Challenge Section */}
            <section id="challenge" className="flex flex-col gap-12 scroll-mt-32">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                  {project.challenge.title}
                </h2>
                <p className="text-neutral-200 leading-relaxed text-lg">
                  {project.challenge.description}
                </p>
              </div>

              {project.challenge.image && (
                <div className="w-full aspect-video sm:aspect-[21/9] bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden relative shadow-lg">
                  <Image src={project.challenge.image} alt="Challenge context" fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
                </div>
              )}

              <div className={`grid grid-cols-1 md:grid-cols-2 ${project.challenge.cards.length >= 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
                {project.challenge.cards.map((card, idx) => (
                  <div key={idx} className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 flex flex-col gap-4">
                    <AlertCircle className="w-5 h-5 text-neutral-400 mb-2" />
                    <h3 className="text-white font-medium text-lg">{card.title}</h3>
                    <p className="text-neutral-300 text-sm leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-neutral-800" />

            {/* Solution Section */}
            <section id="solution" className="flex flex-col gap-12 scroll-mt-32">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                  {project.solution.title}
                </h2>
                <p className="text-neutral-200 leading-relaxed text-lg">
                  {project.solution.description}
                </p>
              </div>

              {project.solution.image && (
                <div className="w-full aspect-video sm:aspect-[21/9] bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden relative shadow-lg">
                  <Image src={project.solution.image} alt="Solution context" fill className="object-cover object-top" unoptimized referrerPolicy="no-referrer" />
                </div>
              )}

              <div className="flex flex-col gap-6 w-full lg:max-w-4xl">
                {project.solution.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-6 items-start group">
                    <div className="mt-1">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white font-medium text-lg">{feature.title}</h3>
                      <p className="text-neutral-300 leading-relaxed text-[15px]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>


            {/* Tech Stack Section */}
            <section id="tech-stack" className="flex flex-col gap-12 scroll-mt-32">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                  {project.techStack.title}
                </h2>
                <p className="text-neutral-200 leading-relaxed text-[15px]">
                  {project.techStack.description}
                </p>
              </div>

              {project.techStack.image && (
                <div className="w-full aspect-video sm:aspect-[21/9] bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden relative shadow-lg">
                  <Image src={project.techStack.image} alt="Tech Stack diagram" fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.techStack.categories.map((category, idx) => (
                  <div key={idx} className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 lg:p-10 flex flex-col gap-6">
                    {getTechIcon(idx)}
                    <h3 className="text-white font-medium text-xl">{category.name}</h3>
                    <p className="text-neutral-300 text-[15px] leading-relaxed">{category.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-neutral-800" />

            {/* Results Section */}
            <section id="results" className="flex flex-col gap-12 scroll-mt-32 pb-12">
              <div className="flex flex-col gap-4 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                  The Result: Scaling intelligently
                </h2>
                <p className="text-neutral-200 leading-relaxed text-[15px]">
                  The platform transformed an operational bottleneck into a highly profitable digital product framework.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {project.results.map((result, idx) => (
                  <div key={idx} className="bg-[#111111]/80 backdrop-blur-md border border-neutral-800/60 rounded-2xl p-6 lg:p-8 flex items-center gap-6 group hover:border-neutral-700 transition-colors">
                    <TrendingUp className="w-5 h-5 text-neutral-400 shrink-0" />
                    <p className="text-neutral-200 text-[15px] leading-relaxed">
                      <strong className="text-white font-medium text-base mr-2">{result.title}</strong>
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>

              {project.gallery.length > 0 && (
                <div className="flex flex-col gap-8 mt-8">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="w-full max-w-3xl bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden shadow-xl">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        width={1200}
                        height={900}
                        className="object-contain w-full h-auto"
                        referrerPolicy="no-referrer"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
