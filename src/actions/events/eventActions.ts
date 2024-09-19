'use server';

// import activityEventEmitter from '@/lib/EventEmitter';
// import supabaseServer from '@/utils/supabase/server';

// activityEventEmitter.on('comment', async (user) => {
//   console.log('comment on');
//   console.log(user.id);
  
  
//   const supabase = await supabaseServer();
//   const { data, error } = await supabase.rpc('upsert_user_activity', { _type: 'comment', _user_id: user.id });
//   if (error) {
//     console.log(error.message);
    
//     return null;
//   }
//   console.log(data);
// });

// export async function emitEvent({type, user}: {type: string, user: {id: string}}) {
//   console.log('emit event');

//   switch(type) {
//     case 'comment': activityEventEmitter.emit('comment', user); break;
//   }
  
//   return activityEventEmitter.emit('comment', user);
// }