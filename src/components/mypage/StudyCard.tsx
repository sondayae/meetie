export default function StudyCard({
  icon,
  label,
  num,
}: {
  icon: React.ReactNode;
  label: string;
  num: number;
}) {
  return (
    <div className='flex flex-col gap-3 items-center'>
        {/* icon */}
        <div className="flex items-center h-10 w-10 rounded-full border border-[#dfd8ff] bg-[#f5f1ff]">
          <span className='mx-auto'>
            {icon}
          </span>
        </div>
        {/* text */}
        <div className='flex flex-col gap-2'>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-4 text-center font-normal text-muted-foreground">
              {label}
            </div>
          </div>
        </div>
        {/* num */}
        <div className="text-center text-lg font-bold text-black">{num}</div>
        </div>
    </div>
  );
}
