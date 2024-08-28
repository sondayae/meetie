import Mark from '../common/Mark';
import SelectBox from '../studyRoom/SelectBox';
import PlusIcon from '../icons/PlusIcon';
import Button from '../common/Button';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
// import { useModal } from '@/hooks/hooks';

const HandinForm = ({preloadedValues, onSubmitHandler}: any) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: preloadedValues
    });
    const [image, setImage] = useState(preloadedValues.images.url);
    const [text, setText] = useState(preloadedValues.text);
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register('images');

    
    // TODO 과제 선택 영역 모달 필요
    // const { openModal, closeModal, Modal } = useModal({
    //     title: '수정',
    //     subtitle: '수정하시겠습니까?',
    //     onConfirm: handleConfirm,
    //     onCancel: handleCancel,
    //   });

    const handleClick = () => {
        if (imgInputRef.current) {
            imgInputRef.current.onchange = (e) => {
                const newImage = URL.createObjectURL(e.target.files[0]);
                setImage(newImage);
            }
            imgInputRef.current.click();
        }
    }
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="pb-[25px]">
                <div className="flex items-center pb-[16px]">
                <span className="mr-[12px] font-medium">14일차 과제</span>
                <Mark />
                </div>
                <SelectBox />
            </div>
            <div
                className="mb-[40px] flex aspect-video justify-center overflow-hidden rounded-md border-2 border-light-gray bg-[#f9f9f9] hover:cursor-pointer"
                onClick={handleClick}
            >
                <div className={`items-center justify-center ${preloadedValues.images ? 'hidden' : 'flex flex-col'}`}>
                    <span className="mb-[8px] rounded-full bg-[#eaeaea] p-1">
                        <PlusIcon className="h-5 w-5 fill-[#a9a9a9] stroke-[#a9a9a9]" />
                    </span>
                    <span className="text-[#a9a9a9]">인증 구역</span>
                    <input
                        {...rest}
                        type="file"
                        name='images'
                        ref={e => {
                            ref(e);
                            imgInputRef.current = e;
                        }}
                        accept="image/*"
                    />
                </div>
                <div className='relative w-full overflow-hidden'>
                    <Image
                        src={image}
                        fill={true}
                        alt='image'
                        priority
                        className='object-cover'
                    />
                </div>
            </div>
            <div>
                <label htmlFor="handinText" className="font-medium">기록</label>
                <input 
                    type="text" 
                    placeholder='과제를 하며 나누고 싶은 생각을 적어보세요.' 
                    className='w-full border-2 p-4 rounded-lg border-[#e9e9e9] bg-[#f9f9f9]'
                    {...register('text')}
                    onChange={handleTextChange}
                />
                <p className="mt-1 text-end text-xs text-[#9d9d9d]">{`${text.length} / 20`}</p>
            </div>
            <div className="mt-[100px]">
                <Button
                type="primary"
                label="수정하기"
                size="large"
                onClick={() => {
                    console.log('과제 수정');
                }}
                />
            </div>
        </form>
    );
};
export default HandinForm;
