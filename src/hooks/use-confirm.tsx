'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';

export default function useConfirm({ title, message }: {title: string, message: string}) {
  const [promise, setPromise] = useState(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve });
  });
  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmModal = () => (
    promise ? (
      <div className='fixed z-10 inset-0'>
        <div className='flex items-center justify-center min-h-screen bg-gray-400 bg-opacity-75 transition-all'>
          <div className='bg-white rounded-lg p-3'>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold'>{title}</h1>
              <p className='text-sm'>{message}</p>
              <div className='flex gap-5'>
                <Button label='확인' onClick={handleConfirm} type='primary'/>
                <Button label='취소' onClick={handleCancel}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null
  );

  return { ConfirmModal, confirm };
}

