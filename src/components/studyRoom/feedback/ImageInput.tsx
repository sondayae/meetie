import PlusIcon from '@/components/icons/PlusIcon';
import { useRef, useState } from 'react';

export default function ImageInput({src, setSelected}: {src: string, setSelected: (args: any) => void}) {
  const [preview, setPreview] = useState(src ? src : null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    
    if (files) {
      setSelected(files[0]);
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
    <>
    <div className="flex aspect-video rounded-lg bg-[#f9f9f9] justify-center drop-shadow-sm border border-[#E9E9E9]">
      <div className='flex flex-col gap-[8px] justify-center items-center'>
        <div className='rounded-full bg-[#eaeaea] p-[8px]'>
          <span>
            <PlusIcon className='stroke-[#A9A9A9]'/>
          </span>
        </div>
        <span className="text-[#a9a9a9] text-sm">인증 구역</span>
      </div>
    </div>
    <input
      type="file"
      name="file"
      className="hidden"
      accept="image/*"
      ref={fileInputRef}
      onChange={handleFileChange}
    />
    </>
  )
}