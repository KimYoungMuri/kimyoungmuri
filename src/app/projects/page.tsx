'use client'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold mb-12">Projects</h1>
        <div className="grid gap-6">
          {/* Add your project cards/items here */}
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Project Name</h2>
            <p className="text-gray-600">Project description goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
  