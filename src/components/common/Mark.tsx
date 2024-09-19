export default function Mark({ label }: {label: string}) {
  return (
    <div className="flex h-[20px] items-center rounded-2xl border border-primary flex-shrink-0">
      <span className="px-[6px] py-[3px] text-xs font-semibold text-primary">
        {label}
      </span>
    </div>
  );
};