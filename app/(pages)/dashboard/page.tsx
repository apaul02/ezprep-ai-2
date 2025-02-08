import Streak from '@/components/Streak';
import React from 'react';
export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#8b5e34]">Welcome to EzPrep.ai</h1>
      <p className="text-[#6d4a29]">Access all your learning tools from the dashboard.</p>
      

        <Streak />
    </div>
  );
}