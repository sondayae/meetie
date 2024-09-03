import PostItem from '@/components/mypage/postItem';

export default function page() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </>
  );
}
