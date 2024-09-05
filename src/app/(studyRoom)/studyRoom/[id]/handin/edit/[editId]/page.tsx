'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import Header from '@/components/handin/Header';
import SelectModal from '@/components/handin/SelectModal';
import NoticeBox from '@/components/common/NoticeBox';
import Mark from '@/components/common/Mark';
import SelectBox from '@/components/studyRoom/SelectBox';
import ImageFrame from '@/components/handin/ImageFrame';
import ImageInput from '@/components/handin/ImageInput';
import Button from '@/components/common/Button';
import { getHandin, updateHandin } from '@/lib/actions/handin';
import { getHomeworks } from '@/lib/actions/homework';
import { getImgUrl } from '@/utils/supabase/storage';

const MAX_LENGTH = 500;

const page = ({ params }: { params: { id: string, editId: string } }) => {
  const router = useRouter();
  const [homeworkList, setHomeworkList] = useState<[]>();
  const [text, setText] = useState<string>('');
  const [previews, setPreviews] = useState<string>();
  const [selected, setSelected] = useState();
  const studyRoomId = params.id;
  const handinId = params.editId;
  const formRef = useRef();
  const fileInputRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const { data: homeworks } = await getHomeworks(studyRoomId);
    const { data: handin } = await getHandin(handinId);
    
    setHomeworkList(homeworks);

    const selectedHomework = homeworks?.filter((homework) => {
      if (homework.id === handin[0].homework_id) {
        return homework;
      }});
    
    setSelected(selectedHomework[0]);
    setPreviews(getImgUrl(handin[0].images[0].url));
    setText(handin[0].text);
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

  const handleTextChange = (e) => {
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
      <Header label="과제 인증" />
      <div className="p-[16px]">
        <NoticeBox />
        <div className="flex items-center gap-[12px] pb-[16px] pt-[34px]">
          <span className="items-center justify-center gap-[12px] text-lg font-medium">
            14일차 과제
          </span>
          <Mark label={'진행중'} />
        </div>
        <div className="pb-[24px]">
          <SelectBox selected={selected} setShowModal={setShowModal} />
        </div>
        <div onClick={handleFileClick} className="mb-[40px]">
          {previews ? (
            <ImageFrame src={previews} alt="preview" />
          ) : (
            <ImageInput />
          )}
        </div>
        <form action={formAction} ref={formRef}>
          <input type="text" name="id" className="hidden" defaultValue={handinId}/>
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
              className={`w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] px-[14px] py-[11.5px] text-sm placeholder-gray-purple focus:outline-none`}
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