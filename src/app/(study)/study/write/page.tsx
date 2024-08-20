'use client';
import { Button } from '@/stories/Button';
import { Input } from '@/stories/Input';
import { Study } from '@/types/study';
import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    // curriculum: '',
    // 시작일
    startDate: new Date(),
    // 종료일
    endDate: new Date(),
    // 모집 인원
    recruitNum: 0,
    // 관련 태그들
    tags: [],
  });

  const {
    role,
    title,
    purpose,
    goal,
    topic,
    info,
    startDate,
    endDate,
    recruitNum,
    tags: [],
  } = study;

  // input, textarea, select 상태 값
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;

    setStudy((prev) => ({
      ...prev,
      [name]:
        name === 'recruitNum' ? Number(value) : name === 'tags' ? tags : value,
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
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
          onChange={handleInputChange}
        >
          <option value="">모집 직군을 선택해주세요</option>
          <option value="productManager">기획자</option>
          <option value="designer">디자이너</option>
          <option value="developer">개발자</option>
        </select>
        {/* <label className="font-bold" htmlFor="role">
          스터디 스킬
        </label>
        <select
          name="role"
          id="role"
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
        >
          <option value="">스킬을 선택해주세요</option>
          <option value="productManager">자바스크립트</option>
          <option value="designer">타입스크립트</option>
          <option value="programmer">리액트</option>
        </select> */}
        <label className="font-bold" htmlFor="title">
          스터디 제목 &nbsp;
          {/* <span className={'text-sm font-normal'}>{topic.length}/30</span> */}
        </label>
        <Input
          id="title"
          name="title"
          primary={false}
          size="small"
          placeholder="스터디의 제목을 작성해주세요."
          maxLength={30}
          onChange={handleInputChange}
        />
        <label className="font-bold" htmlFor="topic">
          스터디 주제 &nbsp;
          <span className={'text-sm font-normal'}>{topic.length}/30</span>
        </label>
        <Input
          id="topic"
          name="topic"
          primary={false}
          size="small"
          placeholder="스터디의 주제를 작성해주세요."
          maxLength={30}
          onChange={handleInputChange}
        />
        <label className="font-bold" htmlFor="purpose">
          스터디 목적 &nbsp;
        </label>
        <select
          name="purpose"
          id="purpose"
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
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
          size="small"
          placeholder="스터디의 목표를 간단히 작성해주세요."
          maxLength={100}
          onChange={handleInputChange}
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
          className="mb-[34px] mt-[10px] resize-none rounded-lg border border-[#c4c4c4] px-[18px] py-5 text-sm"
          maxLength={1000}
          onChange={handleInputChange}
        ></textarea>

        <div className="flex gap-3">
          <div>
            <label className="font-bold" htmlFor="startDate">
              시작일
            </label>
            <Input id="startDate" name="startDate" placeholder="날짜 선택" />
          </div>
          <div>
            <label className="font-bold" htmlFor="endDate">
              종료일
            </label>
            <Input id="endDate" name="endDate" placeholder="날짜 선택" />
          </div>
        </div>
        <label className="font-bold" htmlFor="recruitNum">
          스터디 모집 인원
        </label>
        <Input
          id="recruitNum"
          name="recruitNum"
          type={'number'}
          defaultValue={0}
          onChange={handleInputChange}
        />

        <label className="font-bold" htmlFor="tags">
          관련 태그
        </label>
        <label className="mb-[34px] mt-[10px] flex h-auto min-h-[50px] w-full flex-col gap-2 rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]">
          <ul className="flex flex-grow-0 flex-wrap gap-2">
            {tags.map((tag, index) => (
              <li
                className="inline-flex w-auto rounded-sm border px-2 py-1"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <Input
            id="tags"
            name="tags"
            onChange={handleTagsInputChange}
            onKeyDown={handleKeyDown}
            value={tagsInput}
            placeholder="관련된 태그를 작성해주세요 (최대 10개)"
          />
        </label>
        <p>00님 이런 태그는 어떠세요?</p>
        <ul className="mt-[10px] flex gap-2">
          <li className="inline-flex w-auto rounded-sm border px-2 py-1">
            자바스크립트
          </li>
          <li className="inline-flex w-auto rounded-sm border px-2 py-1">
            리액트
          </li>
          <li className="inline-flex w-auto rounded-sm border px-2 py-1">
            Nextjs
          </li>
          <li className="inline-flex w-auto rounded-sm border px-2 py-1">
            모각코
          </li>
        </ul>
        <div className="flex gap-3">
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
