// components/UserSkeleton.tsx
export default function UserSkeleton() {
  const skeletonCount = 10; // 표시할 스켈레톤의 개수

  return (
    <div className="grid grid-cols-2 gap-x-[14px] gap-y-[10px]">
      {[...Array(skeletonCount)].map((_, index) => (
        <div
          key={index}
          className="h-44 animate-pulse cursor-pointer rounded-lg border border-muted bg-[#f1f1f1] px-4 py-5 shadow-[0_4px_4px_rgb(0,0,0,0.03)]"
        />
      ))}
    </div>
  );
}
