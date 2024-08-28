export const uploadImage = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  const uploadResponse = await fetch('/api/profile/storage', {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    alert('파일 업로드 실패');
    return null;
  }

  const uploadData = await uploadResponse.json();
  return uploadData.url;
};

export const saveImageUrl = async (imageUrl: string) => {
  const response = await fetch('/api/profile/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: imageUrl }),
  });

  if (!response.ok) {
    alert('이미지 URL 저장 실패');
    return null;
  }

  return response.json();
};

export const addProfile = async (profileData: any) => {
  try {
    const response = await fetch('/api/profile/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '프로필 업데이트 중 오류 발생');
    }

    return response.json();
  } catch (error) {
    console.error('프로필 추가 또는 업데이트 오류:', error);
    throw error;
  }
};
