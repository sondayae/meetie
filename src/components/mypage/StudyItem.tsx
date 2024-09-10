import RightArrowIcon from '@/components/icons/RightArrowIcon';

export default function StudyItem({
  icon,
  text,
  num,
}: {
  icon: JSX.Element;
  text: string;
  num: number;
}) {
  return (
    <>
      <li className="flex items-center justify-between">
        <p className="flex items-center justify-center gap-2">
          <span>{icon}</span>
          <span>{text}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-light-purple text-center text-[16px] font-semibold text-sub-purple">
            {num}
          </span>
        </p>
        <p>
          <RightArrowIcon className="m-auto h-4 w-4" />
        </p>
      </li>
    </>
  );
}
