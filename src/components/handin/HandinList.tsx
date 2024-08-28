'use client';
import Handin from '@/components/handin/Handin';
import Button from '@/components/common/Button';
import { useModal } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';


const HandinList = ({ data }: any) => {

    const router = useRouter();
    const addHandin = () => {
        console.log(addHandin);
    };

    const handleConfirm = () => {
      console.log('handleConfirm');
      router.push(`./handin/edit?id=2`);
    };
    const handleCancel = () => {
      console.log('handleCancel');
      
    };

    const { openModal, closeModal, Modal } = useModal({
      title: '수정',
      subtitle: '수정하시겠습니까?',
      onConfirm: handleConfirm,
      onCancel: handleCancel,
    });

  return (
    <div className="bg-[#FAFAFA]">
      {data.map((data: any) => (
        <Handin
          key={data.id}
          id={data.id}
          userName={data.user.name}
          handinImg={data.images.url}
          text={data.text}
          date={data.created_at}
          openModal={openModal}
          closeModal={closeModal}
        />
      ))}
      <div className="text-center">
        <Button
          label="과제 인증하기"
          size="large"
          borderStyle="border-dotted"
          onClick={addHandin}
        />
      </div>
      <Modal />
    </div>
  );
};

export default HandinList;
