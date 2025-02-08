import MCQQuiz from '@/components/checkAnswers';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Flashcards = async () => {
  const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/login");
    }
  return (
    <div>
      <MCQQuiz />
    </div>
  );
};

export default Flashcards;