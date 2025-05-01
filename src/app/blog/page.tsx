'use client'

import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
    return (
    <div className="min-h-[150vh] relative">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/public/blog//w_dad.jpg"
          alt="Blog Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="relative pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <h1 className="text-5xl font-extrabold mb-24 text-white">Blog</h1>
          <div className="grid gap-12">
            <article className="p-6 rounded-lg transition-all duration-200 bg-transparent text-white hover:bg-white/10">
              <Link href="/blog/what-why-and-how" className="no-underline block">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/public/blog//intro_pic.jpg"
                      alt="What, Why, and How blog post"
                      fill
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold mb-3 text-white">What, Why, and How</h2>
                    <div className="text-sm text-white/70 mb-4">April 28, 2024</div>
                    <p className="text-white/90 text-lg leading-relaxed">An exploration of the fundamental questions that drive understanding and progress.</p>
                  </div>
                </div>
              </Link>
            </article>

            {/* Placeholder articles to demonstrate scrolling */}
            <article className="p-6 rounded-lg transition-all duration-200 bg-transparent text-white hover:bg-white/10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-white/10" />
                <div className="flex-grow">
                  <div className="h-8 w-48 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-24 bg-white/10 rounded mb-4" />
                  <div className="h-20 bg-white/10 rounded" />
                </div>
              </div>
            </article>

            <article className="p-6 rounded-lg transition-all duration-200 bg-transparent text-white hover:bg-white/10">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-white/10" />
                <div className="flex-grow">
                  <div className="h-8 w-64 bg-white/10 rounded mb-3" />
                  <div className="h-4 w-24 bg-white/10 rounded mb-4" />
                  <div className="h-20 bg-white/10 rounded" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    );
  }
    