import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200 no-underline"
          >
            <span className="inline-block">YK</span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link 
              href="/projects" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 no-underline"
            >
              Projects
            </Link>
            <Link 
              href="/music" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 no-underline"
            >
              Music
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 no-underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}