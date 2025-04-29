import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import ModelViewer dynamically to avoid SSR issues
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          <div className="flex flex-col md:flex-row items-center gap-16 mb-12">
            <div className="w-64 h-64 relative rounded-full overflow-hidden shadow-lg">
              <Image
                src="/mypic.JPG"
                alt="Young Kim"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Young Kim
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                I&apos;m Young, a sophomore at Columbia University studying Computer Science and Operations Research. I hope to dedicate this space to share my learnings, thoughts, and memories to look back later on. Thanks for stopping by!
              </p>
            </div>
          </div>

          {/* 3D Model Section */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl bg-white">
            <ModelViewer 
              modelUrl="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/public/model//severance_sketchfab6b.glb"
              className="h-[600px] w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
