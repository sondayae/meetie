'use client';
import { Button } from '@/stories/Button';
import { Input } from '@/stories/Input';
import { Study } from '@/types/study';
import supabase from '@/utils/supabase/client';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function StudyWrite() {
  const router = useRouter();

  // 스터디 만들기
  const addStudy = async () => {
    const { data, error } = await supabase()
      .from('study')
      .insert(study)
      .select('*');

    if (error) console.log(error);

    if (data) {
      const { id } = data[0];
      console.log(data);
      alert('스터디 등록이 완료되었습니다!');
      // 스터디 상세페이지로 이동
      router.push(`/study/${id}`);
    }
  };

  const [study, setStudy] = useState<Study>({
    // 모집 직군
    role: '',
    // 스킬
    // skill: '',
    // 스터디 제목
    title: '',
    // 스터디 목적,, purpose
    purpose: '',
    // 스터디 목표 goal
    goal: '',
    // 스터디 주제
    topic: '',
    // 스터디 소개, 진행방식과 커리큘럼
    info: '',
    // 시작일
    startDate: new Date(),
    // 종료일
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    // 모집 인원
    recruitNum: 0,
    // 관련 태그들
    tags: [],
  });

  // 캘린더

  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ]);
  const [startDate, endDate] = dateRange;

  const {
    role,
    title,
    purpose,
    goal,
    topic,
    info,
    // startDate,
    // endDate,
    // recruitNum,
    tags: [],
  } = study;

  const handleDateChange = (dates: [Date, Date]) => {
    console.log('dates', dates);
    const [newStartDate, newEndDate] = dates;

    setDateRange([newStartDate, newEndDate]);

    setStudy((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  };

  const [recruitNum, setRecruitNum] = useState(1);

  // input, textarea, select 상태 값
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;
    const target = e.target;
    if (name === 'recruitNum') {
      setRecruitNum(Number(value));
    }

    // 한글 초과 입력 글자 수 제한
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      const maxLength = target.maxLength;
      if (maxLength > 0 && target.value.length == maxLength) {
        console.log('slice', target.value.slice(0, maxLength));
        target.value = target.value.slice(0, maxLength);
      }
    }

    setStudy((prev) => ({
      ...prev,
      [name]:
        name === 'recruitNum' ? recruitNum : name === 'tags' ? tags : value,
    }));
  };

  const [tagsInput, setTagsInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  //
  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  // 태그들 등록
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (tagsInput.trim()) {
        setTags([...tags, tagsInput.trim()]);
        setStudy((prevStudy) => ({
          ...prevStudy,
          tags: tags,
        }));
      }
      setTagsInput('');
    }
  };

  return (
    <>
      <form action="" className="mx-4 flex flex-col">
        <label className="font-bold" htmlFor="role">
          모집 직군
        </label>
        <select
          name="role"
          id="role"
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px] outline-sub-purple"
          onChange={handleInputChange}
        >
          <option value="">모집 직군을 선택해주세요</option>
          <option value="productManager">기획자</option>
          <option value="designer">디자이너</option>
          <option value="developer">개발자</option>
        </select>

        <label className="font-bold" htmlFor="title">
          스터디 제목 &nbsp;
          <span className={'text-sm font-normal'}>{title.length}/30</span>
        </label>
        <Input
          id="title"
          name="title"
          primary={false}
          size="medium"
          placeholder="스터디의 제목을 작성해주세요."
          maxLength={30}
          onChange={handleInputChange}
          className="mb-[34px] mt-[10px]"
        />
        <label className="font-bold" htmlFor="topic">
          스터디 주제 &nbsp;
          <span className={'text-sm font-normal'}>{topic.length}/30</span>
        </label>
        <Input
          id="topic"
          name="topic"
          primary={false}
          size="medium"
          placeholder="스터디의 주제를 작성해주세요."
          maxLength={30}
          onChange={handleInputChange}
          className="mb-[34px] mt-[10px]"
        />
        <label className="font-bold" htmlFor="purpose">
          스터디 목적 &nbsp;
        </label>
        <select
          name="purpose"
          id="purpose"
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px] outline-sub-purple"
          onChange={handleInputChange}
        >
          <option value="">스터디의 목적을 선택해주세요</option>
          <option value="selfImprovement">자기 개발</option>
          <option value="skillImprovement">툴 능력 향상</option>
          <option value="devNetworking">해당 분야의 네트워킹 확장</option>
          <option value="hobby">취미</option>
        </select>
        <label className="font-bold" htmlFor="goal">
          스터디 목표 &nbsp;
          <span className={'text-sm font-normal'}>{goal.length}/100</span>
        </label>
        <Input
          id="goal"
          name="goal"
          primary={false}
          size="medium"
          placeholder="스터디의 목표를 간단히 작성해주세요."
          maxLength={100}
          onChange={handleInputChange}
          className="mb-[34px] mt-[10px]"
        />
        <label className="font-bold" htmlFor="info">
          스터디 소개 &nbsp;
          <span className={'text-sm font-normal'}>{info.length}/1000</span>
        </label>
        <textarea
          id="info"
          name="info"
          rows={4}
          cols={50}
          placeholder="스터디를 설명해보세요"
          className="mb-[34px] mt-[10px] resize-none rounded-lg border border-[#c4c4c4] px-[18px] py-5 outline-sub-purple"
          maxLength={1000}
          onChange={handleInputChange}
        ></textarea>

        <div className="flex flex-col">
          <div className="w-full">
            <label className="font-bold" htmlFor="endDate">
              시작일 / 종료일
            </label>
            <DatePicker
              locale={ko}
              dateFormat={'YYYY.MM.dd(eee)'}
              selectsRange
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              closeOnScroll={true}
              onChange={(dates) => {
                if (dates) {
                  handleDateChange(dates as [Date, Date]);
                }
              }}
              withPortal
              placeholderText="종료일을 선택하세요"
              className="mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
            />
            <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
              스터디 시작일이 모집 마감일로 설정돼요
            </p>
          </div>
        </div>
        <label className="font-bold" htmlFor="recruitNum">
          스터디 모집 인원
        </label>
        {/* 넘버 인풋 */}
        <div className="mt-[10px] flex min-h-[50px] w-full gap-2 rounded-lg border border-[#c4c4c4]">
          <button
            type="button"
            id="decrement"
            className="h-12 w-12"
            onClick={() =>
              setRecruitNum((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            -
          </button>
          <Input
            id="recruitNum"
            name="recruitNum"
            type="number"
            // min={0}
            // max={100}
            value={recruitNum}
            onChange={handleInputChange}
            className="flex-grow text-center outline-sub-purple [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            id="increment"
            className="h-12 w-12"
            onClick={() =>
              setRecruitNum((prev) => (prev <= 19 ? prev + 1 : prev))
            }
          >
            +
          </button>
        </div>
        <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
          4~8명이 적당한 스터디 인원이에요
        </p>

        <label className="font-bold" htmlFor="tags">
          관련 태그
        </label>
        <label className="mt-[10px] flex h-auto w-full flex-col gap-2 px-[18px]"></label>
        <Input
          id="tags"
          name="tags"
          onChange={handleTagsInputChange}
          onKeyDown={handleKeyDown}
          value={tagsInput}
          placeholder="관련된 태그를 작성해주세요 (최대 10개)"
          className="mb-[10px]"
        />

        <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
          관련 태그는 최대 10개까지 가능해요
        </p>
        <ul className="mb-[34px] flex flex-grow-0 flex-wrap gap-2">
          {tags.map((tag, index) => (
            <li
              className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-1 py-[5px] text-sm text-dark-gray"
              key={index}
            >
              {tag}
            </li>
          ))}
        </ul>
        <p>00님 이런 태그는 어떠세요?</p>
        <ul className="mt-[10px] flex gap-2">
          <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-1 py-[5px] text-sm text-dark-gray">
            자바스크립트
          </li>
          <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-1 py-[5px] text-sm text-dark-gray">
            리액트
          </li>
          <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-1 py-[5px] text-sm text-dark-gray">
            Nextjs
          </li>
          <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-1 py-[5px] text-sm text-dark-gray">
            모각코
          </li>
        </ul>
        <div className="mb-10 flex gap-3">
          {/* <Button primary={false} backgroundColor="" label="이전" /> */}
          <Button
            primary={true}
            label="스터디 등록하기"
            onClick={() => addStudy()}
          />
        </div>
      </form>
    </>
  );
}
