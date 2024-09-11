import RightArrowIcon from '@/components/icons/RightArrowIcon';

export default function StudyItem({
  icon,
  label,
  num,
}: {
  icon: React.ReactNode;
  label: string;
  num: number;
}) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span>{label}</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-light-purple text-center text-[16px] font-semibold text-sub-purple">
          {num}
        </span>
      </div>
      <div>
        <RightArrowIcon className="m-auto h-4 w-4" />
      </div>
    </li>
  );
}
