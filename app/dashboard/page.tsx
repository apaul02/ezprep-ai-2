export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#8b5e34]">Welcome to EzPrep.ai</h1>
      <p className="text-[#6d4a29]">Access all your learning tools from the dashboard.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-[#8b5e34] mb-2">Flashcards</h2>
          <p className="text-gray-600">Review and create flashcards for effective learning</p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-[#8b5e34] mb-2">Podcasts</h2>
          <p className="text-gray-600">Listen to educational content on the go</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-[#8b5e34] mb-2">Video Learning</h2>
          <p className="text-gray-600">Watch educational videos and tutorials</p>
        </div>
      </div>
    </div>
  );
}