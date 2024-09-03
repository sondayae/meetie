import { useEffect, useState } from 'react';
import Comment from './Comment';
import { getCommentList } from '@/lib/actions/getCommentList';

type CommentList = {
    id: string;
    comment: string;
    created_at: string;
    user: {
        name: string;
        images: {
            url: string;
        }[];
    }[];
}

export default function CommentList({ targetId }: {targetId: string}) {

  const [commentList, setCommentList] = useState<any>();

  const fetchData = async () => {
    const { data } = await getCommentList(targetId);
    setCommentList(data);
    console.log(data);
    
  };

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <>
    { commentList &&
      <div className="[&>*:first-child]:border-t">
        {
          commentList.map((comment) => {
            return <Comment key={comment.id} id={comment.id} comment={comment.comment} user={comment.user} date={comment.created_at}/>
          })
        }
      </div>
    }
    </>
  );
}
