// // components/ProfileForm.tsx
// import { useState } from 'react';

// interface ProfileFormProps {
//   onNext: () => void;
// }

// export default function ProfileForm({ onNext }: ProfileFormProps) {
//   const [nickname, setNickname] = useState<string>('');
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNickname(e.target.value);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImageFile(file);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!imageFile) {
//       alert('프로필 사진을 업로드해 주세요.');
//       return;
//     }

//     // 파일 업로드
//     const formData = new FormData();
//     formData.append('file', imageFile);

//     const uploadResponse = await fetch('/api/profile/storage', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!uploadResponse.ok) {
//       alert('파일 업로드 실패');
//       return;
//     }

//     const uploadData = await uploadResponse.json();
//     const imageUrl = uploadData.url; // 서버에서 반환된 URL을 가져옵니다

//     // 이미지 URL을 데이터베이스에 저장
//     const profileResponse = await fetch('/api/profile/images', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url: imageUrl }),
//     });

//     if (!profileResponse.ok) {
//       alert('프로필 저장 실패');
//       return;
//     }

//     // 모든 작업이 완료되면 다음 단계로 이동
//     onNext();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="nickname" className="block text-lg font-semibold">
//           닉네임
//         </label>
//         <input
//           id="nickname"
//           type="text"
//           value={nickname}
//           onChange={handleNicknameChange}
//           className="mt-1 block w-full rounded border border-gray-300 p-2"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="image" className="block text-lg font-semibold">
//           프로필 사진
//         </label>
//         <input
//           id="image"
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-1 block w-full"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
//       >
//         저장 및 다음
//       </button>
//     </form>
//   );
// }

import { useState } from 'react';

interface ProfileFormProps {
  onFileChange: (file: File | null) => void;
  onNicknameChange: (nickname: string) => void;
  onIntroductionChange: (introduction: string) => void;
}

export default function ProfileForm({
  onFileChange,
  onNicknameChange,
  onIntroductionChange,
}: ProfileFormProps) {
  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    onNicknameChange(e.target.value);
  };

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntroduction(e.target.value);
    onIntroductionChange(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileChange(file || null);
  };

  return (
    <>
      <div className="mb-5 text-2xl font-semibold">기본 프로필 작성</div>

      <form className="space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-lg font-semibold">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
          />
        </div>
        <label htmlFor="introduction" className="">
          한줄 소개
        </label>
        <textarea
          id="introduction"
          value={introduction}
          onChange={handleIntroductionChange}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
        />

        <div>
          <label htmlFor="image" className="block text-lg font-semibold">
            프로필 사진
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
        </div>
      </form>
    </>
  );
}
