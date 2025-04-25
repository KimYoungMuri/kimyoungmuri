import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            YK
          </Link>
          <div className="flex gap-8">
            <Link 
              href="/projects" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="/music" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Music
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}