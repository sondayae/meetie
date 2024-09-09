export default function SearchSkeleton() {
  const SearchLength = 10;
  return (
    <>
      {[...Array(SearchLength)].map((_, index) => (
        <div
          key={index}
          className={
            'h-44 animate-pulse cursor-pointer rounded-lg border border-muted bg-[#f1f1f1] px-4 py-5 shadow-[0_4px_4px_rgb(0,0,0,0.03)]'
          }
        ></div>
      ))}
    </>
  );
}
