'use server';

import supabase from '@/utils/supabase/client';
import { getBadgeImgUrl } from '@/utils/supabase/storage';

export async function getBadges() {
  const { data: commentBadges, error: commentError } = await supabase.storage
    .from('admin')
    .list('badge/comment', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    const commentList = getListWithSrc(commentBadges, 'comment');

  const { data: feedBadges, error: feedError } = await supabase.storage
    .from('admin')
    .list('badge/feedback', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });
  
    const feedbackList = getListWithSrc(feedBadges, 'feedback');

  const { data: studyBadges, error: studyError } = await supabase.storage
    .from('admin')
    .list('badge/study', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });
  
    const studyList = getListWithSrc(studyBadges, 'study');
  
  const { data: meettBadges, error: meettError } = await supabase.storage
    .from('admin')
    .list('badge/meett', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    const meettList = getListWithSrc(meettBadges, 'meett');

  const badgeList = { comment: commentList, feedback: feedbackList, study: studyList, meett: meettList };

  return { success: true, data: badgeList };
}

function getListWithSrc(list, path) {

  const newList = list?.map((item) => {
    const newItem = {...item, src: getBadgeImgUrl(`${path}/${item.name}`)};
    return newItem;
  });

  return newList;
}
