'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
// import { getHandIn } from "./api";

const page = () => {
  const [notes, setNotes] = useState<any[]>([])
  const fetchData = async () => {
    const {data} = await supabase.from('handin').select(`
      id,
      text,
      images,
      user ( name )`);
    console.log(data);
    setNotes(data || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {notes.map((data) => (
        <div key={data.id}>
          <p>{data.user.name}</p>
          <p>{data.text}</p>
        </div>
      ))}
    </div>
  )
};

export default page;
