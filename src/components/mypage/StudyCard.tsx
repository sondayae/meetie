export default function StudyCard({
  icon,
  text,
  num,
}: {
  icon: React.ReactNode;
  text: string;
  num: number;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-start gap-4">
        {/* icon */}
        <div className="h-10 w-10">
          <div className="left-0 top-0 h-10 w-10 rounded-full border border-[#dfd8ff] bg-[#f5f1ff]">
            <div className="flex h-10 w-10 items-center justify-center">
              {icon}
            </div>
          </div>
        </div>
        {/* text */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-4 text-center font-normal text-muted-foreground">
              {text}
            </div>
          </div>
        </div>
        {/* num */}
        <div className="text-center text-lg font-bold text-black">{num}</div>
      </div>
    </>
  );
}
