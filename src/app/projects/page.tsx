'use client'

import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const projects = [
    {
      title: "Iterative Prisoner's Dilemma and Evolutionary Game Theory",
      description: "Research paper published in International Journal of Mathematical Models and Methods in Applied Sciences. Applied game theory to analyze optimal negotiation strategies for nuclear power plant siting in South Korea, using a tournament of 36 iterated prisoner's dilemma strategies to identify stable and high-return negotiation approaches.",
      imageUrl: "https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/sign/uploads/boxplot.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0ODMwYzBmLWJkNWYtNDhlZS04ZGUzLTNkZGU3MGU4YWVhNyJ9.eyJ1cmwiOiJ1cGxvYWRzL2JveHBsb3QuanBnIiwiaWF0IjoxNzQ2MDYwODQ2LCJleHAiOjQ4OTk2NjA4NDZ9.Dvt9KDl7-k_czK8QynuV4dO1lw3n-3GnTc2S4OewS0g",
      link: "https://npublications.com/journals/ijmmas/2022/a542001-026(2022).pdf",
      date: "October 10, 2022"
    },
    {
      title: "LSTM Reinforcement Learning in Code Debugging",
      description: "Research paper published in IJournals: International Journal of Software & Hardware Research in Engineering (IJSHRE). Created a machine learning model using LSTM neural networks to automatically repair code errors made by novice programmers, achieving 43% overall accuracy and up to 78% accuracy for specific error types.",
      imageUrl: "https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/sign/uploads/stanford_repair.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U0ODMwYzBmLWJkNWYtNDhlZS04ZGUzLTNkZGU3MGU4YWVhNyJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0YW5mb3JkX3JlcGFpci5wbmciLCJpYXQiOjE3NDYwNjAzMDksImV4cCI6NDg5OTY2MDMwOX0.8M5BWKml2ihMgz-Ps9EZMtFsKz54-9kcFlziCQBaHCY",
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
  