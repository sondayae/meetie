export default function Mark({ label }: { label: string }) {
  return (
    <div className="flex h-[20px] flex-shrink-0 items-center rounded-2xl border border-primary">
      <span className="px-[6px] py-[3px] text-xs font-semibold text-primary">
        {label}
      </span>
    </div>
  );
}
