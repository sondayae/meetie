import { useRef, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import ImageFrame from './ImageFrame';

export default function ImageInput({
  src,
  size = 'big',
}: {
  src?: string;
  size?: string;
}) {
  const [preview, setPreview] = useState(src);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    const files = fileInputRef.current?.files;

    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  const readAndPreview = (file: any) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = (await reader.result) as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="cursor-pointer">
      {size === 'big' ? (
        <div onClick={() => fileInputRef.current?.click()}>
          {preview ? (
            <ImageFrame src={preview} alt="이미지" />
          ) : (
            <div className="flex aspect-video justify-center rounded-lg border border-[#E9E9E9] bg-[#f9f9f9] drop-shadow-sm">
              <div className="flex flex-col items-center justify-center gap-[8px]">
                <div className="rounded-full bg-[#eaeaea] p-[8px]">
                  <span>
                    <PlusIcon className="stroke-[#A9A9A9]" />
                  </span>
                </div>
                <span className="text-sm text-[#a9a9a9]">인증 구역</span>
              </div>
            </div>
          )}
          <input
            type="file"
            name="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="aspect-square w-[82px] rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9]">
          <div className="flex h-full flex-grow flex-col items-center justify-center gap-[8px]">
            <div className="rounded-full bg-[#eaeaea] p-[8px]">
              <span>
                <PlusIcon />
              </span>
            </div>
            <span className="text-xs text-muted-foreground">0 / 4</span>
          </div>
        </div>
      )}
    </div>
  );
}
