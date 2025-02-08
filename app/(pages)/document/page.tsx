import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {
  const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }
  return (
    <div>document</div>
  )
}

export default page