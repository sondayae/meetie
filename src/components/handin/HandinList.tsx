// 'use client';
// import Handin from '@/components/handin/Handin';
// import Button from '@/components/common/Button';
// import { useModal } from '@/hooks/hooks';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';


// const HandinList = ({ data }: any) => {
//     const [selectedHandin, setSelectedHandin]=useState<any|null>();
//     const [type, setType]=useState<'edit'|'delete'|undefined>();

//     const router = useRouter();
//     const addHandin = () => {
//         router.push(`./handin/add`);
//     };
//     const editHandin = () => {
//         if (selectedHandin) {
//             router.push(`./handin/edit?id=${selectedHandin.id}`);
//         }
//     };
//     const deleteHandin = async () => {
//       if (selectedHandin) {
//         const response = await fetch(`/api/handin?id=${selectedHandin.id}`, {
//           method: 'DELETE',
//         });
//         console.log(response);
//       }
//     };

//     const handleConfirm = () => {
//         closeModal();
//         if (type === 'edit') {
//             editHandin();
//         } else if (type === 'delete') {
//             deleteHandin();
//         }
//     };
//     const handleCancel = () => {
//       closeModal();
//       setSelectedHandin(null);
//       setType(undefined);
//     };

//     const { openModal, closeModal, Modal } = useModal({
//       title: '수정',
//       subtitle: '수정하시겠습니까?',
//       onConfirm: handleConfirm,
//       onCancel: handleCancel,
//     });

//     useEffect(()=>{
//       if (selectedHandin) {
//           openModal();
//       }
//     }, [selectedHandin, type])

//   return (
//     <div className="bg-[#FAFAFA]">
//       {data.map((data: any) => (
//         <Handin
//           key={data.id}
//           // id={data.id}
//           // handin={data.handin}
//           // user={data.handin.user}
//           // userName={data.user.name}
//           // handinImg={data.images.url}
//           // text={data.text}
//           // date={data.created_at}
//           // onEdit={() => { setSelectedHandin(data); setType('edit'); }}
//           // onDelete={() => { setSelectedHandin(data); setType('delete'); }}
//         />
//       ))}
//       <div className="text-center">
//         <Button
//           label="과제 인증하기"
//           size="large"
//           borderStyle="border-dotted"
//           onClick={addHandin}
//         />
//       </div>
//       <Modal />
//     </div>
//   );
// };

// export default HandinList;

export default function HandinList() {
  return <div>미사용</div>
}
