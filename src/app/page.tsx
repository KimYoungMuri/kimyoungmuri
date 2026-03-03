'use client'

import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <main>
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20">
            <div className="flex flex-col items-center text-center">
              <div className="w-72 h-72 relative rounded-full overflow-hidden mb-12 ring-4 ring-[#75B2DD] ring-offset-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL || ''}/storage/v1/object/public/uploads/snu_headshot.jpg`}
                  alt="Young Kim"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                  priority
                  unoptimized
                />
              </div>
              <div className="max-w-4xl">
                <h1 className="text-[3.5rem] leading-tight font-extrabold tracking-tight text-gray-900 mb-6">
                  Hey, I&apos;m <span className="text-[#75B2DD]">Young.</span> Make yourself at home. CS and OR <span className="text-[#75B2DD]">@Columbia.</span>  
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
