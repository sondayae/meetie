'use client';
import { Study } from '@/types/study';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// import Input from '@/components/form/Input';
import {
  addStudy,
  editStudy,
  getStudy,
} from '@/app/(study)/study/[studyId]/studyAction';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';
import Select from '../form/Select';
import Textarea from '../form/Textarea';
import Calendar from './Calendar';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import { useStudyStore } from '@/app/stores/studyStore';
import StudyButton from '../common/StudyButton';
import StudyInput from './StudyInput';
import { Progress } from '@nextui-org/progress';
import { Input, Spacer } from '@nextui-org/react';

type studyFormProps = {
  isEditMode: boolean;
};

export default function StudyForm({ isEditMode }: studyFormProps) {
  const router = useRouter();
  const { study, setStudy } = useStudyStore();
  const params = useParams();
  const { studyId } = params;

  //  useForm
  const {
    // 입력 값 등록, 유효성 검사 규칙 적용
    register,
    // 유효성 검사 통과 시, form 데이터 처리
    handleSubmit,
    // 전체 form 상태 정보
    formState: { errors, isDirty, isValid },
    // 특정 필드 값 업데이트
    setValue,
    // 전체 폼 값
    getValues,
    // 리셋
    reset,
    watch,
  } = useForm<Study>({
    defaultValues: study,
    mode: 'onChange',
  });

  useEffect(() => {
    async function fetchStudyData() {
      // 스터디 수정하기인 경우
      if (isEditMode && studyId) {
        try {
          const studyData = await getStudy(studyId);
          await setStudy(studyData);
          // 리셋 스터디 데이터
          await reset(studyData);
          console.log('해당하는 스터디 값들', getValues());
        } catch (error) {
          console.error('스터디 수정 중 오류가 발생했습니다.', error);
          alert('스터디 수정 중 오류가 발생했습니다.');
        }
      }
    }
    fetchStudyData();
  }, [isEditMode, studyId]);

  // 태그 []
  const [tagsInput, setTagsInput] = useState('');

  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  // Enter키 다운 후 태그 저장
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const newTags = [...study.tags, tagsInput.trim()];

      console.log('newtags', newTags);

      setStudy({ tags: newTags });

      setValue('tags', newTags, { shouldValidate: true });

      console.log('newtags 등록 후 getValue', getValues());
      // if (e.nativeEvent.isComposing) {
      // }
      setTagsInput('');
    }
  };

  // 모집 인원 숫자 -, +
  const handleDecrement = () =>
    setValue(
      'recruitNum',
      getValues('recruitNum') > 1
        ? getValues('recruitNum') - 1
        : getValues('recruitNum'),
    );

  const handleIncrement = () =>
    setValue(
      'recruitNum',
      getValues('recruitNum') < 20
        ? getValues('recruitNum') + 1
        : getValues('recruitNum'),
    );

  // 스터디 만들기일 때, submit
  const handleFormSubmit = async () => {
    try {
      const study = getValues();
      const newStudy = await addStudy(study);
      if (newStudy) {
        // 생성된 스터디 상세페이지로 이동
        router.push(`/study/${newStudy.id}`);
      }
    } catch (error) {
      console.error('스터디 생성 중 에러가 발생했습니다:', error);
    }
  };

  const [
    role,
    title,
    topic,
    info,
    goal,
    purpose,
    //  recruitNum,
    tags,
  ] = watch([
    'role',
    'title',
    'topic',
    'info',
    'goal',
    'purpose',
    // 'recruitNum',
    'tags',
  ]);

  // 스터디 수정하기일 때, submit
  const handleEditFormSubmit = async () => {
    console.log('study?', getValues());
    try {
      // await editStudy(studyId, study);
      console.log('getValues()', getValues());
      await editStudy(studyId, getValues());
      alert('스터디 수정이 완료되었습니다.');
      // router.push(`/study/${studyId}`);
    } catch (e) {
      console.error(e);
      alert('스터디 수정 중 오류가 발생했습니다.');
    }
  };
  // useEffect(() => {
  //   console.log('study?', getValues());
  // }, [study]);

  // 스터디 만들기 단계 체크
  const [studyStep, setStudyStep] = useState(1);

  // 진행 단계 progress bar
  const [progressValue, setProgressValue] = useState(1);

  useEffect(() => {
    studyStep === 1 ? setProgressValue(30) : setProgressValue(75);
  }, [studyStep]);

  return (
    <>
      <Progress
        aria-label="Loading..."
        size="sm"
        value={progressValue}
        color="success"
        className="mb-8 max-w-full [&>*>*]:!rounded-none [&>*>*]:bg-main-purple [&>*]:!rounded-none"
      />
      <form
        action=""
        className="flex flex-col"
        onSubmit={handleSubmit(
          isEditMode ? handleEditFormSubmit : handleFormSubmit,
        )}
      >
        {/* 스터디 만들기 단계 1 */}
        {studyStep === 1 && (
          <>
            {/* 모집 직군 */}
            <div className="mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="role"
              >
                모집 직군
              </label>
              <Select
                name="role"
                id="role"
                errors={errors}
                register={register}
                rules={{
                  required: '모집 직군을 선택해주세요.',
                }}
              >
                <option value="">모집 직군을 선택해주세요</option>
                <option value="productManager">기획자</option>
                <option value="designer">디자이너</option>
                <option value="developer">개발자</option>
              </Select>

              {errors.role && (
                <ErrorMessage>{errors.role?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 제목 */}
            <div className="relative mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="title"
              >
                스터디 제목 &nbsp;
              </label>
              <div className={'relative'}>
                <StudyInput
                  id="title"
                  name="title"
                  type="text"
                  placeholder="스터디의 제목을 작성해주세요."
                  errors={errors}
                  register={register}
                  rules={{
                    required: '스터디의 제목을 작성해주세요.',
                    maxLength: {
                      value: 30,
                      message: '최대 30자 이내 입력해주세요.',
                    },
                  }}
                  maxLength={30}
                  //   onChange={(e) => {
                  //     console.log('e.target', e.target);
                  //     if (e.target.value.length > e.target.maxLength)
                  //       e.target.value = e.target.value.slice(0, e.target.maxLength);
                  //   }}
                  //   maxLength={30}
                  //   onChange={handleInputChange}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-gray-purple'
                  }
                >
                  {study.title.length}/30
                </span>
              </div>
              {errors.title && (
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 주제 */}
            <div className="mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="topic"
              >
                스터디 주제 &nbsp;
              </label>
              <div className={'relative'}>
                <StudyInput
                  id="topic"
                  name="topic"
                  type="text"
                  placeholder="스터디의 주제를 작성해주세요."
                  errors={errors}
                  register={register}
                  rules={{
                    required: '스터디의 주제를 작성해주세요.',
                    maxLength: {
                      value: 30,
                      message: '최대 30자 이내 입력해주세요.',
                    },
                  }}
                  maxLength={30}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-gray-purple'
                  }
                >
                  {study.topic.length}/30
                </span>
              </div>
              {errors.topic && (
                <ErrorMessage>{errors.topic?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 목적 */}
            <div className="mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="purpose"
              >
                스터디 목적 &nbsp;
              </label>
              <Select
                name="purpose"
                id="purpose"
                errors={errors}
                register={register}
                rules={{
                  required: '스터디의 목적을 선택해주세요.',
                }}
              >
                <option value="">스터디의 목적을 선택해주세요</option>
                <option value="selfImprovement">자기 개발</option>
                <option value="skillImprovement">툴 능력 향상</option>
                <option value="devNetworking">해당 분야의 네트워킹 확장</option>
                <option value="hobby">취미</option>
              </Select>

              {errors.purpose && (
                <ErrorMessage>{errors.purpose?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 목표 */}
            <div className="mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="goal"
              >
                스터디 목표 &nbsp;
              </label>
              <div className={'relative'}>
                <StudyInput
                  id="goal"
                  name="goal"
                  type="text"
                  placeholder="스터디의 목표를 작성해주세요."
                  errors={errors}
                  register={register}
                  rules={{
                    required: '스터디의 목표를 작성해주세요.',
                    maxLength: {
                      value: 100,
                      message: '최대 100자 이내 입력해주세요.',
                    },
                  }}
                  maxLength={100}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-gray-purple'
                  }
                >
                  {study.goal.length}/100
                </span>
              </div>
              {errors.goal && (
                <ErrorMessage>{errors.goal?.message}</ErrorMessage>
              )}
            </div>
          </>
        )}
        {/* 스터디 만들기 단계 2 */}
        {studyStep === 2 && (
          <>
            {/* 스터디 소개 */}
            <div className="mb-[34px] mt-[10px]">
              <label
                className="mb-[10px] inline-block font-semibold"
                htmlFor="info"
              >
                스터디 소개 &nbsp;
              </label>
              <div className="relative">
                <Textarea
                  id="info"
                  name="info"
                  rows={4}
                  cols={50}
                  placeholder="스터디를 설명해보세요"
                  className="mb-[34px] mt-[10px] w-full resize-none rounded-lg border border-[#c4c4c4] px-[18px] py-5 outline-sub-purple"
                  errors={errors}
                  register={register}
                  rules={{
                    required: '스터디의 목표를 작성해주세요.',
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자 이내 입력해주세요.',
                    },
                  }}
                  maxLength={1000}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-gray-purple'
                  }
                >
                  {study.info.length}/1000
                </span>
              </div>
              {errors.info && (
                <ErrorMessage>{errors.info?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 시작일, 종료일 */}
            <Calendar />
            {/* 스터디 모집 인원 */}
            <label className="font-bold" htmlFor="recruitNum">
              스터디 모집 인원
            </label>
            {/* 넘버 인풋 */}
            <div>
              <div className="mt-[10px] grid min-h-[50px] w-full grid-cols-[1fr_8fr_1fr] rounded-lg border border-[#c4c4c4]">
                <StudyButton
                  id="decrement"
                  onClick={handleDecrement}
                  borderStyle="border-none"
                  buttonStyle="w-[50px] h-full flex items-center justify-center"
                >
                  <MinusIcon />
                </StudyButton>
                <StudyInput
                  id="recruitNum"
                  name="recruitNum"
                  type="number"
                  errors={errors}
                  register={register}
                  rules={{
                    max: {
                      value: 20,
                      message: '최대 20명 이내로 입력해주세요.',
                    },
                  }}
                  maxLength={20}
                  inputStyle="border-none [&>*]:border-none [&>*]:text-center [&>*]:outline-none"
                  readOnly
                />
                <StudyButton
                  id="increment"
                  onClick={handleIncrement}
                  borderStyle="border-none"
                  buttonStyle="w-[50px] h-full flex items-center justify-center"
                >
                  <PlusIcon className="w-8 fill-gray-purple" />
                </StudyButton>
              </div>
              {errors.recruitNum && (
                <ErrorMessage>{errors.recruitNum?.message}</ErrorMessage>
              )}
            </div>
            <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
              4~8명이 적당한 스터디 인원이에요
            </p>
            {/* 관련 태그 */}
            <label className="font-bold" htmlFor="tags">
              관련 태그
            </label>
            <StudyInput
              id="tags"
              name="tags"
              type="text"
              onChange={handleTagsInputChange}
              onKeyDown={handleKeyDown}
              value={tagsInput}
              placeholder="관련된 태그를 작성해주세요 (최대 10개)"
              errors={errors}
              register={register}
            />

            <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
              관련 태그는 최대 10개까지 가능해요
            </p>
            {/* 작성한 태그 리스트 */}
            <ul className="mb-[34px] flex flex-grow-0 flex-wrap gap-2">
              {Array.isArray(study.tags) &&
                study.tags.length > 0 &&
                study.tags.map((tag, index) => (
                  <li
                    className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray"
                    key={index}
                  >
                    {tag}
                  </li>
                ))}
            </ul>
            {/* 추천 태그 */}
            <p>00님 이런 태그는 어떠세요?</p>
            <ul className="mt-[10px] flex gap-2">
              <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray">
                자바스크립트
              </li>
              <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray">
                리액트
              </li>
              <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray">
                Nextjs
              </li>
              <li className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray">
                모각코
              </li>
            </ul>
          </>
        )}

        {/* 버튼 영역 */}
        <div className="align-center fixed bottom-0 left-0 flex w-full justify-center gap-3 bg-white px-4 py-6">
          {studyStep === 1 ? (
            <StudyButton
              label="다음"
              disabled={!isEditMode && (!isDirty || !isValid)}
              style={
                (!isEditMode && !isDirty) || !isValid ? 'disabled' : 'primary'
              }
              size="large"
              onClick={() => setStudyStep(2)}
            />
          ) : (
            <div className="flex w-full max-w-[600px] gap-2 px-4">
              <StudyButton
                label="이전"
                onClick={() => setStudyStep(1)}
                size="small"
              />
              <StudyButton
                type="submit"
                label="스터디 등록하기"
                size="medium"
                disabled={!isEditMode && (!isDirty || !isValid)}
                style={
                  (!isEditMode && !isDirty) || !isValid ? 'disabled' : 'primary'
                }
                onClick={async () => await setProgressValue(100)}
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
