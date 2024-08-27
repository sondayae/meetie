'use client';
import { useState } from 'react';
import Header from '@/components/studyRoom/Header';
import CalendarList from '@/components/studyRoom/CalendarList';
import HandinList from '@/components/handin/HandinList';
import ChatList from '@/components/studyRoom/ChatList';
import TabMenu from '@/components/studyRoom/TabMenu';

const page = () => {
    const menus = [
        {id: 'calendar', title: '캘린더'},
        {id: 'handin', title:'과제'},
        {id: 'chat', title:'채팅'}];
    const [activeMenu, setActiveMenu] = useState(menus[0].id);
    
    let content;

    switch (activeMenu) {
        case 'calendar': content = <CalendarList />; break;
        case 'handin': content = <HandinList />; break;
        case 'chat': content = <ChatList />; break;
    }

  return (
    <>
    <Header />
    <TabMenu menus={menus} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    {content}
    </>
  );
};
export default page;
