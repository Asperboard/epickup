import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 bg-blue-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-blue-800">A B</span>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-blue-800">AsperBoard</span>
              <span className="text-sm italic text-blue-600">Navigating in a neuro-typical maze</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-blue-700 hover:text-blue-900">home</a>
            <a href="#" className="text-blue-700 hover:text-blue-900">adolescents</a>
            <a href="#" className="text-blue-700 hover:text-blue-900">parents</a>
            <a href="#" className="text-blue-700 hover:text-blue-900">about</a>
            <a href="#" className="text-blue-700 hover:text-blue-900">pricing</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Guide du parcours du patient et parents</h2>
                <p className="text-gray-700">
                  Pour les personnes se questionnant sur un éventuel diagnostic, cela pourrait être précieux de savoir quelles démarches effectuer en premier lieu. Le site, en proposant un &quot;guide du parcours du patient&quot;, pourrait être en cela un premier interlocuteur clé.
                </p>
                <p className="text-right italic mt-4">- Aurélie De Saint Thibault, psychologue</p>
              </div>

              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">The offering</h2>
                <p className="text-gray-700">
                  The unwritten rulebook
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                Social ability. Often misunderstood and difficulty integrating... General text explaining about the website and contents. General text explaining about the website and contents. General text explaining about the website and contents.
              </p>
              <p className="text-gray-700 mt-4">
                General text explaining about the website and contents. General text explaining about the website and contents. General text explaining about the website and contents.
              </p>
              <p className="text-gray-700 mt-4">
                General text section about aspies and the rules not knowing them and how it causes problems for them, you have the diagnosis where do you go from here...
              </p>
              <div className="mt-6 p-4 bg-blue-200 rounded-md">
                <p className="text-blue-800">
                  explains what the website is and that you can try it for free for 14 days, no credit card details required and then subscription based which can be stopped at any time
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">© 2025 AsperBoard. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200">Terms</a>
              <a href="#" className="text-white hover:text-blue-200">Privacy</a>
              <a href="#" className="text-white hover:text-blue-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
