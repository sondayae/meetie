'use server';

import supabase from '@/utils/supabase/client';

export async function getBadges() {
  const { data: commentBadges, error: commentError } = await supabase.storage
    .from('admin')
    .list('badge/comment', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

  const { data: feedBadges, error: feedError } = await supabase.storage
    .from('admin')
    .list('badge/feedback', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });
  const { data: studyBadges, error: studyError } = await supabase.storage
    .from('admin')
    .list('badge/study', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });
  const { data: meettBadges, error: meettError } = await supabase.storage
    .from('admin')
    .list('badge/meett', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'desc' },
    });

  const badgeList = { comment: commentBadges, feed: feedBadges, study: studyBadges, meett: meettBadges };

  return { success: true, data: badgeList };
}
