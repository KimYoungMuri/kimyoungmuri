import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/mypic.jpg" // Add your photo to the public directory
            alt="Young Kim"
            width={240}
            height={240}
            className="rounded-full"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold mb-4">Young Kim</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hello! I&apos;m Young Kim, a sophomore at Columbia University studying Computer Science and Operations Research. I&apos;m passionate about [your interests/specialties]. Through my work, I aim to [your goals/mission]. Thanks for stopping by!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
