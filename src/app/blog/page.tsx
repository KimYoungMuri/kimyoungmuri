import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
    return (
      <main className="min-h-screen bg-white py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <div className="grid gap-6">
            <article className="overflow-hidden border rounded-lg hover:shadow-lg transition-all duration-200 hover:border-gray-400 group">
              <Link href="/blog/what-why-and-how" className="no-underline block">
                <div className="flex">
                  <div className="flex-grow p-6 group-hover:bg-gray-50 transition-colors duration-200">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">What, Why, and How</h2>
                    <div className="text-sm text-gray-500 mb-3">April 28, 2024</div>
                    <p className="text-gray-600">An exploration of the fundamental questions that drive understanding and progress.</p>
                  </div>
                  <div className="relative w-48 flex-shrink-0">
                    <img
                      src="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/public/blog//intro_pic.jpg"
                      alt="What, Why, and How blog post"
                      className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </main>
    );
  }
    