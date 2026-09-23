import React from 'react'

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Welcome to our platform
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Build Something
            <span className="text-blue-600"> Amazing</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A simple and modern platform designed to help you create,
            manage, and grow your ideas faster and easier.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
              Get Started
            </button>

            <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need
            </h2>

            <p className="text-gray-600 mt-4">
              Simple tools to help you get started and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xl">
                ⚡
              </div>

              <h3 className="text-xl font-semibold mt-5 text-gray-900">
                Fast
              </h3>

              <p className="text-gray-600 mt-2">
                Experience fast and efficient solutions designed for
                modern users.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg text-xl">
                🎯
              </div>

              <h3 className="text-xl font-semibold mt-5 text-gray-900">
                Simple
              </h3>

              <p className="text-gray-600 mt-2">
                Easy-to-use features with a clean and simple user
                experience.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-lg text-xl">
                🚀
              </div>

              <h3 className="text-xl font-semibold mt-5 text-gray-900">
                Powerful
              </h3>

              <p className="text-gray-600 mt-2">
                Powerful tools and features to help you achieve more.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-2xl px-6 py-12 md:p-16 text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>

          <p className="text-blue-100 mt-4 text-lg">
            Join us today and start building something amazing.
          </p>

          <button className="mt-8 bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-semibold transition">
            Start Now
          </button>

        </div>
      </section>

    </main>
  )
}

export default Home