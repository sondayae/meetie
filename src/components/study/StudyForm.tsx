'use client';
import { Study } from '@/types/study';
import { useEffect, useRef, useState } from 'react';
import { redirect, useParams, useRouter } from 'next/navigation';
import {
  addStudy,
  editStudy,
  getStudy,
} from '@/app/(study)/study/[studyId]/studyAction';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../form/ErrorMessage';
import Textarea from '../form/Textarea';
import Calendar from './Calendar';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import StudyButton from '../common/StudyButton';
import StudyInput from './StudyInput';
import BottomSheet from './BottomSheet';
import DeleteIcon from '../icons/DeleteIcon';

type studyFormProps = {
  isEditMode: boolean;
  userId?: string;
};

export default function StudyForm({ isEditMode, userId }: studyFormProps) {
  const router = useRouter();
  const params = useParams();
  const { studyId } = params;

  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState(''); // 태그 인풋 상태
  const [studyStep, setStudyStep] = useState(1); // 스터디 만들기 단계 체크
  const [progressValue, setProgressValue] = useState(1); // 진행 단계 progress bar

  const [bottomSheet, setBottomSheet] = useState(false); // 바텀 시트 열기/닫기
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 선택한 아이템
  const [selectType, setSelectType] = useState<string>('roles'); // 선택한 아이템 타입
  const [dataTitle, setDataTitle] = useState<string>(''); // 바텀 시트 타이틀
  const [data, setData] = useState<string[]>([]); // 바텀 시트 데이터

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<Study>({
    // study 초기값
    defaultValues: {
      // 모집 직군
      roles: [],
      // 스킬
      // skill: '',
      // 스터디 제목
      title: '',
      // 스터디 목적,, purposes
      purposes: [],
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
      recruitNum: 1,
      // 관련 태그들
      tags: [],
    },
    mode: 'onChange',
  });

  // 폼 데이터 변경 감지
  const [roles, purposes, title, topic, info, goal, startDate, endDate] = watch(
    [
      'roles',
      'purposes',
      'title',
      'topic',
      'info',
      'goal',
      'startDate',
      'endDate',
    ],
  );

  // 로그인 체크
  if (!userId) {
    redirect('/login');
    return null;
  }

  // 스터디 데이터 가져오기 (수정 모드일 경우)
  useEffect(() => {
    async function fetchStudyData() {
      if (isEditMode && studyId) {
        try {
          const studyData = await getStudy(studyId);
          reset(studyData);
          console.log('studyData', studyData);
        } catch (error) {
          console.error('스터디 수정 중 오류가 발생했습니다.', error);
          alert('스터디 수정 중 오류가 발생했습니다.');
        }
      }
    }
    fetchStudyData();
  }, [isEditMode, studyId]);

  // Progress bar 업데이트
  useEffect(() => {
    setProgressValue(studyStep === 1 ? 30 : 75);
  }, [studyStep]);

  // 선택한 아이템 업데이트
  useEffect(() => {
    if (selectType === 'roles') {
      setValue('roles', selectedItems);
    }
    if (selectType === 'purposes') {
      setValue('purposes', selectedItems);
    }
  }, [selectedItems, selectType]);

  // 태그 입력
  const handleTagsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  //  태그 추가
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터키 입력 시
    if (e.key === 'Enter') {
      e.preventDefault();

      // 태그 입력 값이 없을 경우
      const trimmedTag = tagsInput.trim();
      if (!trimmedTag) return;

      // 한글 입력 시
      if (e.nativeEvent.isComposing) return;

      // 중복 입력 방지
      if (tags.includes(trimmedTag)) return;

      // 최대 10개까지만 입력 가능
      if (tags.length >= 10) {
        alert('태그는 최대 10개까지 입력 가능합니다.');
        return;
      }

      setTags([...tags, trimmedTag]);

      setTagsInput('');
    }
  };
  // 태그 삭제
  const handleDeleteTag = (deleteTag: string) => {
    const updatedTags = tags.filter((tag) => tag !== deleteTag);
    setTags(updatedTags);
  };

  // 모집 인원 증감
  const handleDecrement = () =>
    setValue(
      'recruitNum',
      Number(getValues('recruitNum')) > 1
        ? Number(getValues('recruitNum')) - 1
        : Number(getValues('recruitNum')),
    );

  // 모집 인원 증감
  const handleIncrement = () =>
    setValue(
      'recruitNum',
      Number(getValues('recruitNum')) < 20
        ? Number(getValues('recruitNum')) + 1
        : Number(getValues('recruitNum')),
    );

  // 스터디 생성
  const handleFormSubmit = async () => {
    try {
      // 태그 추가
      setValue('tags', tags, { shouldValidate: true, shouldDirty: true });

      // 스터디 데이터
      const study = getValues();
      console.log('study', study);

      if (userId) {
        study.author = userId;
      }
      // 스터디 생성
      const newStudy = await addStudy(study);

      // 스터디 상세 페이지로 이동
      if (newStudy) router.push(`/study/${newStudy.id}`);
    } catch (error) {
      console.error('스터디 생성 중 에러가 발생했습니다:', error);
    }
  };

  // 스터디 수정
  const handleEditFormSubmit = async () => {
    try {
      const study = getValues();

      await editStudy(studyId, getValues());

      alert('스터디 수정이 완료되었습니다.');
      router.push(`/study/${studyId}`);
    } catch (e) {
      console.error(e);
      alert('스터디 수정 중 오류가 발생했습니다.');
    }
  };

  // 인풋 값 변경
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    setValue(e.target.name as keyof Study, e.target.value, {
      shouldDirty: true,
    });
  };

  // 바텀 시트 열기
  const openBottomSheet = (type: 'roles' | 'purposes') => {
    setSelectType(type);
    setSelectedItems(type === 'roles' ? roles : purposes);
    setDataTitle(type === 'roles' ? '모집 직군' : '스터디 목적');
    setData(
      type === 'roles'
        ? ['개발자', '디자이너', '기획자']
        : ['자기 개발', '툴 능력 향상', '해당 분야의 네트워킹 확장', '취미'],
    );
    setBottomSheet(true);
  };

  // 바텀 시트 닫기
  const closeBottomSheet = () => setBottomSheet(false);

  // 바텀 시트에서 아이템 선택
  const handleSelect = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <>
      {/* Progress bar */}
      {/* <Progress
        aria-label="Loading..."
        size="sm"
        value={progressValue}
        color="success"
        className="mb-8 max-w-full [&>*>*]:!rounded-none [&>*>*]:bg-primary [&>*]:!rounded-none"
      /> */}
      {/* Form */}
      <form
        action=""
        className="flex flex-col px-4 pb-20"
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
                // htmlFor="roles"
              >
                모집 직군
              </label>
              <div
                className="active: h-[50px] w-full cursor-pointer truncate rounded-lg border border-[#c4c4c4] px-[18px] py-[14px] focus:border-sub-purple"
                // onClick={openBottomSheet}
                onClick={() => openBottomSheet('roles')}
                {...register('roles', {
                  required: '모집 직군을 선택해주세요.',
                })}
              >
                {!isEditMode &&
                  (roles.length > 0
                    ? roles.join(', ')
                    : '모집 직군을 선택해주세요')}
                {isEditMode &&
                  Array.isArray(roles) &&
                  roles.length > 0 &&
                  roles.join(', ')}
              </div>
              {errors.roles && (
                <ErrorMessage>
                  {errors.roles?.message || 'purposes 오류'}
                </ErrorMessage>
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
                  onChange={handleInputChange}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-muted-foreground'
                  }
                >
                  {title.length}/30
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
                  onChange={handleInputChange}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-muted-foreground'
                  }
                >
                  {topic.length}/30
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
                htmlFor="purposes"
              >
                스터디 목적 &nbsp;
              </label>
              <div
                className="h-[50px] w-full cursor-pointer truncate rounded-lg border border-[#c4c4c4] px-[18px] py-[14px] outline-sub-purple"
                onClick={() => openBottomSheet('purposes')}
                {...register('purposes', {
                  required: '스터디 목적을 선택해주세요.',
                })}
              >
                {!isEditMode &&
                  (purposes.length > 0
                    ? purposes.join(', ')
                    : '스터디의 목적을 선택해주세요')}
                {isEditMode &&
                  Array.isArray(purposes) &&
                  purposes.length > 0 &&
                  purposes.join(', ')}
              </div>
              <BottomSheet
                title={dataTitle}
                data={data}
                bottomSheet={bottomSheet}
                onClick={closeBottomSheet}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                onSelect={handleSelect}
              />

              {errors.purposes && (
                <ErrorMessage>{errors.purposes?.message}</ErrorMessage>
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
                  onChange={handleInputChange}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-muted-foreground'
                  }
                >
                  {goal.length}/100
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
                    required: '스터디의 소개를 작성해주세요.',
                    maxLength: {
                      value: 1000,
                      message: '최대 1000자 이내 입력해주세요.',
                    },
                  }}
                  maxLength={1000}
                />
                <span
                  className={
                    'absolute bottom-5 right-5 text-xs font-normal text-muted-foreground'
                  }
                >
                  {info.length}/1000
                </span>
              </div>
              {errors.info && (
                <ErrorMessage>{errors.info?.message}</ErrorMessage>
              )}
            </div>
            {/* 스터디 시작일, 종료일 */}
            <Calendar
              isEditMode={isEditMode}
              prevStartDate={getValues('startDate')}
              prevEndDate={getValues('endDate')}
              setValue={setValue}
              getValues={getValues}
            />
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
                  inputStyle="border-none [&>*]:border-none [&>*]:text-center [&>*]:outline-none [&>input]:pr-4"
                  readOnly
                />
                <StudyButton
                  id="increment"
                  onClick={handleIncrement}
                  borderStyle="border-none"
                  buttonStyle="w-[50px] h-full flex items-center justify-center ml-auto"
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
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="inline-flex w-auto rounded-lg bg-light-purple px-2 py-[5px] text-sm text-dark-gray"
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteTag(tag)}
                    className="mr-1"
                  >
                    <DeleteIcon />
                  </button>
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
                label={isEditMode ? '스터디 수정하기' : '스터디 등록하기'}
                size="medium"
                disabled={!isEditMode && (!isDirty || !isValid)}
                style={
                  (!isEditMode && !isDirty) || !isValid ? 'disabled' : 'primary'
                }
                onClick={async () => setProgressValue(100)}
              />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
