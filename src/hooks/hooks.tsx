import { useState, Dispatch } from 'react'
import Button from '@/components/common/Button';
import SelectModal from '@/components/studyRoom/SelectModal';
import SimpleModal from '@/components/common/SimpleModal';

type TModal = {
    type: string;
    data?: [];
    title: string;
    subtitle: string;
    onConfirm: Dispatch<void>;
    onCancel: Dispatch<void>;
};

export const useModal = ({type='none', data, title, subtitle, onConfirm, onCancel}: TModal) => {
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const getModal = () => {
        switch(type) {
            case 'data': return <SelectModal data={data} onConfirm={onConfirm} onCancel={onCancel}/>
            default: return <SimpleModal />
        }
    }

    const Modal = () => {
        return (
            <>
            <div id='popupModal' className={`${open ? '' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-dark-gray bg-opacity-50`}>
                <div className='relative m-auto p-4 w-full top-[50%]'>
                        {
                            getModal()
                        }
                </div>
            </div>
                {/* <div id="popupModal" className={`${open ? '' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-dark-gray bg-opacity-50`}>
                    <div className="relative m-auto p-4 w-full max-w-md top-[50%]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 text-center">
                                <h1>{title}</h1>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{subtitle}</h3>
                                <div className='flex gap-4'>
                                    <Button label='확인' type='primary' size='small' onClick={onConfirm}/>
                                    <Button label='취소' size='small' onClick={onCancel}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </>

        );
    }

    return {
        Modal,
        openModal,
        closeModal,
    }
};
