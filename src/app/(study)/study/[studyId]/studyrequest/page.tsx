'use client';
import { useEffect, useState } from 'react';
import StatusDisplay from '@/components/study/StatusDisplay';
import StudyRequestItem from '@/components/study/StudyRequestItem';

// 시간별 데이터를 그룹핑
const groupByDate = (data: any[]) => {
  return data.reduce(
    (acc, item) => {
      if (item.status === 'wating') {
        const date = new Date(item.created_at).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = [];
        }

        acc[date].push(item);
      }
      return acc;
    },
    {} as Record<string, any[]>,
  );
};

export default function Page({ params }: { params: { studyId: string } }) {
  const [data, setData] = useState<any[]>([]);
  const [groupedData, setGroupedData] = useState<Record<string, any[]>>({});
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        new URL(`/api/studyrequest/${params.studyId}`, baseUrl).toString(),
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error occurred while fetching data');
      }

      setData(result);
      setGroupedData(groupByDate(result)); // 데이터를 시간별로 그룹핑
    };

    fetchData();
  }, [params.studyId, baseUrl]);

  return (
    <>
      <div className="flex flex-col px-2">
        {Object.keys(groupedData).length > 0 ? (
          <>
            {Object.entries(groupedData).map(([date, items]) => (
              <div key={date}>
                <div className="font mb-4 text-sm font-medium text-dark-gray">
                  {date}
                </div>
                <ul className="mb-4 flex flex-col gap-4">
                  {items.map((item: any) => (
                    <StudyRequestItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}
