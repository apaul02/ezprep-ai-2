import React from 'react';
import { Play } from 'lucide-react';

const Podcast = () => {
  const podcasts = [
    {
      title: "Learning Techniques Explained",
      duration: "45 min",
      author: "Dr. Sarah Johnson",
      description: "Effective study methods and memory techniques"
    },
    {
      title: "Science Behind Memory",
      duration: "32 min",
      author: "Prof. Michael Chen",
      description: "Understanding how our brain processes information"
    },
    {
      title: "Study Habits of Top Students",
      duration: "28 min",
      author: "Emma Williams",
      description: "Insights into successful student routines"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Podcast Library</h1>
      <div className="space-y-4">
        {podcasts.map((podcast, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors">
              <Play size={20} />
            </button>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{podcast.title}</h3>
              <p className="text-sm text-gray-600">{podcast.author}</p>
              <p className="text-sm text-gray-500 mt-1">{podcast.description}</p>
            </div>
            <span className="text-sm text-gray-500">{podcast.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;