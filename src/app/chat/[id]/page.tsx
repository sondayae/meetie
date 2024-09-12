import ChatScreen from '@/components/chat/ChatScreen';
import Header from '@/components/handin/Header';

export default function page() {
  return (
    <>
    {/* 헤더 영역 */}
    <Header/>
    {/* 콘텐츠 영역 */}
    <ChatScreen />
    </>
  )
}