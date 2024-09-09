'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Mark from '@/components/common/Mark';
import NoticeBox from '@/components/common/NoticeBox';
import Header from '@/components/handin/Header';
import ImageFrame from '@/components/handin/ImageFrame';
import ImageInput from '@/components/handin/ImageInput';
import SelectModal from '@/components/handin/SelectModal';
import SelectBox from '@/components/studyRoom/SelectBox';
import { getHomeworks } from '@/lib/actions/homework';
import { getImgUrl } from '@/utils/supabase/storage';
import { getFeedback, updateHandin } from '@/actions/studyroom/handinActions';

const MAX_LENGTH = 500;

const page = ({ params }: { params: { id: string; editId: string } }) => {
  const router = useRouter();
  const [homeworkList, setHomeworkList] = useState<[]>();
  const [text, setText] = useState<string>('');
  const [previews, setPreviews] = useState<string>();
  const [selected, setSelected] = useState<any>();
  const studyRoomId = params.id;
  const handinId = params.editId;
  const formRef: any = useRef();
  const fileInputRef: any = useRef();
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const { data: homeworks }: any = await getHomeworks(studyRoomId);
    console.log(homeworks);

    const { data: handin }: any = await getFeedback(handinId);
    console.log(handin);

    setHomeworkList(homeworks);
    setSelected(handin.homework);
    setPreviews(getImgUrl(handin.images[0].url));
    setText(handin.text);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setShowModal(false);
  }, [selected]);

  const formAction = async (formData: FormData) => {
    const { success } = await updateHandin(formData);
    if (success) {
      router.push('../');
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
      {/* 헤더 영역 */}
      {showModal && (
        <SelectModal selectList={homeworkList} setSelected={setSelected} />
      )}
      <Header label="과제 인증" />
      <div className="p-[16px]">
        <NoticeBox />
        <div className="flex items-center gap-[12px] pb-[16px] pt-[34px]">
          <span className="items-center justify-center gap-[12px] text-lg font-medium">
            14일차 과제
          </span>
          <Mark label="진행중" />
        </div>
        <div className="pb-[24px]">
          <SelectBox selected={selected} handleClick={setShowModal} />
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
            name="id"
            className="hidden"
            defaultValue={handinId}
          />
          <input
            type="text"
            name="homeworkId"
            className="hidden"
            value={selected?.id}
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
              className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] px-[14px] py-[11.5px] text-sm placeholder-gray-purple focus:outline-none"
              onChange={(e) => handleTextChange(e)}
              value={text}
            />
            <span className="mr-[2px] self-end text-xs text-[#9d9d9d]">
              {`${text.length}`} / 500
            </span>
          </div>
          <Button type="primary" buttonType="submit" label="인증하기" />
        </form>
      </div>
    </>
  );
};
export default page;
