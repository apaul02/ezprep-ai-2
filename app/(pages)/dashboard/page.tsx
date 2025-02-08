import Streak from '@/components/Streak';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#8b5e34]">Welcome to EzPrep.ai</h1>
      <p className="text-[#6d4a29]">Access all your learning tools from the dashboard.</p>
      

        <Streak />
    </div>
  );
}