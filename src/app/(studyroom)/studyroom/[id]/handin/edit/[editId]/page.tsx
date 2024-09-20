'use server';
import Button from '@/components/common/Button';
import Mark from '@/components/common/Mark';
import NoticeBox from '@/components/common/NoticeBox';
import Header from '@/components/handin/Header';
import ImageFrame from '@/components/handin/ImageFrame';
import ImageInput from '@/components/handin/ImageInput';
import SelectModal from '@/components/handin/SelectModal';
import SelectBox from '@/components/studyRoom/SelectBox';
import { getHomeworks } from '@/lib/actions/homework';
import { getImgUrl } from '@/utils/supabase/storage';
import { getFeedback, updateHandin } from '@/actions/studyroom/handinActions';
import HandinForm from '@/components/handin/HandinForm';

export default async function FeedbackEditPage({
  params,
}: {
  params: { id: string; editId: string };
}) {
  const data = await getFeedback(params.editId);
  console.log(data);

  // const router = useRouter();
  // const [homeworkList, setHomeworkList] = useState<[]>();
  // const [text, setText] = useState<string>('');
  // const [selected, setSelected] = useState<any>();
  // const studyRoomId = params.id;
  // const handinId = params.editId;
  // const formRef: any = useRef();
  // const fileInputRef: any = useRef();
  // const [showModal, setShowModal] = useState(false);

  // const fetchData = async () => {
  //   const { data: homeworks }: any = await getHomeworks(studyRoomId);
  //   console.log(homeworks);

  //   const { data: handin }: any = await getFeedback(handinId);
  //   console.log(handin);

  //   setHomeworkList(homeworks);
  //   setSelected(handin.homework);
  //   setPreviews(getImgUrl(handin.images[0].url));
  //   setText(handin.text);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setShowModal(false);
  // }, [selected]);

  return (
    <>
      {/* 헤더 영역 */}
      <Header label="과제 인증 수정" rightIcon={<div></div>} />
      {/* 콘텐츠 영역 */}
      <div className="flex flex-col gap-10 p-4">
        <NoticeBox />
        {data && <HandinForm data={data} />}
      </div>
    </>
  );
}
