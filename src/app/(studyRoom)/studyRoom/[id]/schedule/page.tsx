'use client';
import MainLayout from '@/components/studyRoom/MainLayout'

const page = () => {
  return (
    <div>
      <MainLayout list={[]} selectedItem={{ id: '', title: '', subtitle: '' }} setSelectedItem={() => {}}/>
    </div>
  )
}
export default page