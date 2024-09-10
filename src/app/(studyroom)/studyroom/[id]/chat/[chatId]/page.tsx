import ChatScreen from '@/components/chat/ChatScreen';
import Header from '@/components/handin/Header';
import BackArrowIcon from '@/components/icons/BackArrowIcon';

export default function page() {
  return (
    <>
    {/* 헤더 영역 */}
    <Header leftIcon={<BackArrowIcon />} />
    {/* 콘텐츠 영역 */}
    <ChatScreen />
    </>
  )
}