'use server';

import userEventEmitter from '@/lib/EventEmitter';
import { revalidatePath } from 'next/cache';

export async function test(formData: FormData) {
  console.log('test server actions');
  return '1111';
}