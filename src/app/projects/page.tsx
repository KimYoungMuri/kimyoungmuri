'use client'

import ProjectCard from '@/components/ProjectCard';
import { supabaseStorageUrl } from '@/lib/supabase';

export default function ProjectsPage() {
  const projects = [
    {
      title: "QuantGuide Question Bank",
      description: "Questions shouldn't be gated, let alone questions for applying to money hungry quant firms. Scraped questions from QuantGuide, on the lowkey.",
      imageUrl: "https://fhrgjouuzsjecqskxhoy.supabase.co/storage/v1/object/public/uploads/ChatGPT%20Image%20Mar%203,%202026,%2005_51_32%20PM.png",
      link: "/quantguide/",
      date: "February 2026",
      githubUrl: "https://github.com/KimYoungMuri/quant_guide_scrape"
    },
    {
      title: "Iterative Prisoner's Dilemma and Evolutionary Game Theory",
      description: "Research paper published in International Journal of Mathematical Models and Methods in Applied Sciences. Applied game theory to analyze optimal negotiation strategies for nuclear power plant siting in South Korea, using a tournament of 36 iterated prisoner's dilemma strategies to identify stable and high-return negotiation approaches.",
      imageUrl: `${supabaseStorageUrl}/storage/v1/object/public/uploads/boxplot.jpg`,
      link: "https://npublications.com/journals/ijmmas/2022/a542001-026(2022).pdf",
      date: "October 10, 2022"
    },
    {
      title: "LSTM Reinforcement Learning in Code Debugging",
      description: "Research paper published in IJournals: International Journal of Software & Hardware Research in Engineering (IJSHRE). Created a machine learning model using LSTM neural networks to automatically repair code errors made by novice programmers, achieving 43% overall accuracy and up to 78% accuracy for specific error types.",
      imageUrl: `${supabaseStorageUrl}/storage/v1/object/public/uploads/stanford_repair.png`,
      link: "https://ijournals.in/wp-content/uploads/2022/05/1.IJSHRE-100204-Young.pdf",
      date: "April 10, 2022",
      githubUrl: "https://github.com/KimYoungMuri/LSTM-code-fixer"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
              date={project.date}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
  