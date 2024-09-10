'use client';

import { PlusCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddFeedbackBtn() {
  const router = useRouter();
  return (
    <div className="bg-white p-8">
    <button
      className="flex w-full justify-center gap-2 rounded-lg border-2 border-dotted border-border px-4 py-3.5 text-muted-foreground"
      onClick={() => router.push('./handin/add')}
    >
      <PlusCircleIcon />
      과제 인증하기
    </button>
  </div>
  )
}