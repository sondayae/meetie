'use client';
import { Button } from '@/stories/Button';
import { Input } from '@/stories/Input';
import { createClient } from '@/utils/supabase/client';

export default function StudyWrite() {
  const supabase = createClient();
  const addStudy = async () => {
    const { data, error } = await supabase.from('study').insert({
      // name: "random name",
      role: '모집직군',
      topic: '제목?주제',
      goal: '목표',
      info: '소개',
      curriculum: '진행방식과 커리큘럼',
      // startDate: new Date(),
      endDate: new Date(),
      // 정기 일정?
      tags: '관련 태그',
      recruitNum: '4',
    });

    if (data) console.log(data);
    if (error) console.log(error);
    alert('addStudy');
  };
  return (
    <>
      <form action="" className="mx-4 flex flex-col">
        <label className="font-bold" htmlFor="role">
          모집 직군
        </label>
        <select
          name="roles"
          id="roles"
          className="mb-[34px] mt-[10px] h-[50px] w-full rounded-lg border border-[#c4c4c4] px-[18px] py-[14px]"
        >
          <option value="">모집 직군을 선택해주세요</option>
          <option value="productManager">기획자</option>
          <option value="designer">디자이너</option>
          <option value="programmer">개발자</option>
        </select>

        <label className="font-bold" htmlFor="topic">
          주제
        </label>
        <Input
          id="topic"
          name="topic"
          primary={false}
          size="small"
          placeholder="스터디의 주제를 작성해주세요."
        />
        <label className="font-bold" htmlFor="goal">
          목표
        </label>
        <Input
          id="goal"
          name="goal"
          primary={false}
          size="small"
          placeholder="스터디의 목표를 간단히 작성해주세요."
        />
        <label className="font-bold" htmlFor="info">
          소개
        </label>
        <textarea
          id="info"
          name="info"
          rows={4}
          cols={50}
          placeholder="스터디를 설명해보세요"
          className="mb-[34px] mt-[10px] resize-none rounded-lg border border-[#c4c4c4] px-[18px] py-5 text-sm"
        ></textarea>
        <label className="font-bold" htmlFor="curriculum">
          진행방식과 커리큘럼
        </label>
        <textarea
          id="curriculum"
          name="curriculum"
          rows={4}
          cols={50}
          placeholder="진행방식과 커리큘럼을 설명해보세요"
          className="mb-[34px] mt-[10px] resize-none rounded-lg border border-[#c4c4c4] px-[18px] py-5 text-sm"
        ></textarea>
        <label className="font-bold" htmlFor="recruitNum">
          스터디 모집 인원
        </label>
        <Input id="recruitNum" name="recruitNum" type={'number'} />
        <label className="font-bold" htmlFor="tags">
          관련 태그
        </label>
        <Input id="tags" name="tags" />
        <div className="flex gap-3">
          {/* <Button primary={false} backgroundcolor="" label="이전" /> */}
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
