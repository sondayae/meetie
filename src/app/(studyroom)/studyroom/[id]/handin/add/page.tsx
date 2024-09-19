'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/handin/Header';
import { getHomeworks } from '@/lib/actions/homework';
import NoticeBox from '@/components/common/NoticeBox';
import Mark from '@/components/common/Mark';
import SelectBox from '@/components/studyRoom/SelectBox';
import ImageFrame from '@/components/handin/ImageFrame';
import ImageInput from '@/components/handin/ImageInput';
import Button from '@/components/common/Button';
import SelectModal from '@/components/handin/SelectModal';
import { createHandin } from '@/actions/studyroom/handinActions';

const MAX_LENGTH = 500;

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [homeworkList, setHomeworkList] = useState<any>();
  const [text, setText] = useState<string>('');
  const [previews, setPreviews] = useState<string>();
  const [selected, setSelected] = useState<any>();
  const studyRoomId = params.id;
  const formRef: any = useRef();
  const fileInputRef: any = useRef();
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const { data }: { success: boolean; data?: any[]; error?: undefined } =
      await getHomeworks(studyRoomId);
    setHomeworkList(data);
    if (data) {
      setSelected(data[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setShowModal(false);
  }, [selected]);

  const formAction = async (formData: FormData) => {
    const { success } = await createHandin(formData);
    if (success) {
      router.push('./complete');
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
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
      // setPreviews(prev => [...prev!, result]); // TODO type
      setPreviews(result);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newText = e.target.value;
    if (newText.length > MAX_LENGTH) {
      newText = e.target.value.slice(0, MAX_LENGTH);
    }
    setText(newText);
  };

  return (
    <>
      {showModal && (
        <SelectModal selectList={homeworkList} setSelected={setSelected} />
      )}
      <Header label="과제 인증" rightIcon={<div></div>} />
      {/* <HandinForm homeworkList={homeworkList}/> */}
      <div className="p-[16px]">
        <NoticeBox />
        <div className="flex items-center gap-[12px] pb-[16px] pt-[34px]">
          <span className="items-center justify-center gap-[12px] text-lg font-medium">
            14일차 과제
          </span>
          <Mark label={'진행중'} />
        </div>
        <div className="pb-[24px]">
        </div>
        <div onClick={handleFileClick} className="mb-[40px]">
          {previews ? (
            <ImageFrame src={previews} alt="preview" />
          ) : (
            <ImageInput />
          )}
        </div>
        <form action={formAction} ref={formRef}>
          <input
            type="text"
            name="studyId"
            className="hidden"
            defaultValue={studyRoomId}
          />
          <input
            type="text"
            name="homeworkId"
            className="hidden"
            defaultValue={selected?.id}
          />
          <input
            type="file"
            name="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="mb-[40px] flex flex-col gap-[12px]">
            <label htmlFor="text" className="block font-bold">
              기록
            </label>
            <input
              required
              type="text"
              name="text"
              placeholder="과제를 하며 나누고 싶은 생각을 적어보세요."
              className={`placeholder-gray-purple w-full rounded-lg border border-[#E9E9E9] bg-[#F9F9F9] p-[14px] text-sm focus:outline-none`}
              onChange={(e) => handleTextChange(e)}
              value={text}
            />
            <span className="mr-[2px] self-end text-xs text-[#9d9d9d]">
              {`${text.length}`} / 500
            </span>
          </div>
          <Button type="primary" buttonType="submit" label="인증하기"></Button>
        </form>
      </div>
    </>
  );
};
export default page;
