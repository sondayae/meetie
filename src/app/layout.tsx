import localFont from 'next/font/local';

import '@/css/globals.css';
import ReactQueryClientProvider from '@/config/ReactQueryClientProvider';
import InitUser from '@/stores/user/InitUser';
import supabaseServer from '@/utils/supabase/server';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata = {
  title: '밋티 - 만날수록 견고해지는 스터디',
  description: 'IT 를 공부하는 사람들을 위한 서비스 지식을 함께 쌓는 가치',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <head>
          <link
            rel="icon"
            href="https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/logo.png"
            sizes="any"
          />
        </head>
        <body className={`${pretendard.className}`}>
          <div
            id="wrapper"
            className="m-auto flex h-full min-h-[100dvh] max-w-[600px] flex-col"
          >
            {children}
            <InitUser user={data.user} />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
