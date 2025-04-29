export default function WhatWhyAndHow() {
  return (
    <main className="min-h-screen bg-white py-12 px-4 md:px-8">
      <article className="max-w-3xl mx-auto prose lg:prose-lg">
        <h1 className="text-4xl font-bold mb-4">What, Why, and How</h1>
        <div className="text-gray-500 mb-8">April 28, 2024</div>
        
        {/* Replace YOUR_IMAGE_URL with the actual URL from Supabase storage */}
        <div className="my-8">
          <img 
            src="https://ypottlfvonabokhszolz.supabase.co/storage/v1/object/public/blog//intro_pic.jpg"
            alt="Blog post featured image"
            className="w-full rounded-lg shadow-lg"
          />
          {/* Note: Consider converting HEIC to JPG/WebP for better browser compatibility */}
        </div>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What</h2>
          <p>
            [Your content about what goes here]
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Why</h2>
          <p>
            [Your content about why goes here]
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How</h2>
          <p>
            [Your content about how goes here]
          </p>
        </section>
      </article>
    </main>
  );
} 