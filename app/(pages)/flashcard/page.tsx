import React from 'react';

const Flashcards = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-[#8b5e34]">Flashcards</h1>
      
      {/* Search and Generate Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <input
          type="text"
          placeholder="Enter a topic to generate flashcards..."
          className="w-full max-w-xl p-4 text-lg border rounded-lg shadow-sm focus:ring-2 focus:ring-[#e6c199] focus:border-[#e6c199]"
        />
        <button className="mt-4 px-8 py-3 bg-[#e6c199] text-[#8b5e34] rounded-lg hover:bg-[#d4b089] transition-colors">
          Generate Flashcards
        </button>
      </div>

      {/* Existing Flashcard Decks */}
      <div className="bg-white/50 backdrop-blur-sm rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-[#8b5e34] mb-4">Your Decks</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {['Mathematics', 'Science', 'History', 'Languages', 'Computer Science', 'Literature'].map((deck) => (
            <div 
              key={deck} 
              className="bg-white/80 p-4 rounded-lg border border-[#e6c199] hover:border-[#d4b089] transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-[#8b5e34]">{deck}</h3>
              <p className="text-sm text-[#8b5e34]/70 mt-2">20 cards</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;