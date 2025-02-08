'use client'

export default function WaveLoading() {
  return (
    <div className="flex items-center justify-center space-x-2 h-24">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-4 h-4 bg-[#292828] rounded-full animate-wave"
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
