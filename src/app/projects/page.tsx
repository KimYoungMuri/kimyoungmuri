export default function Projects() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Projects</h1>
        <div className="grid gap-6">
          {/* Add your project cards/items here */}
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Project Name</h2>
            <p className="text-gray-600">Project description goes here.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
  