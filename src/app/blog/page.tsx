export default function Blog() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <div className="grid gap-6">
          {/* Add your blog posts here */}
          <article className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Blog Post Title</h2>
            <div className="text-sm text-gray-500 mb-3">Posted on [date]</div>
            <p className="text-gray-600">Blog post preview content goes here.</p>
          </article>
        </div>
      </div>
    </main>
  );
}
  