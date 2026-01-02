import {
  Hero,
  Intro,
  Calendar,
  Gallery,
  Location,
  Account,
  Share,
} from "./components/sections";
import { weddingData } from "./constants/weddingData";

function App() {
  const { groom, bride, wedding, location, gallery, accounts } = weddingData;

  // 날짜 포맷팅
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}요일`;
  };

  const introMessage = `함께하는 시간 속에서 
  서로에게 가장 소중한 친구이자 연인이 되었습니다. 
  
  이제 그 소중한 인연을 영원한 사랑으로 맹세하며
  새로운 인생의 첫 걸음을 시작하려 합니다. 
  
  귀한 걸음 하시어 저희의 아름다운 약속을 
  따뜻하게 축복해 주시면 감사하겠습니다.`;

  return (
    <div className="app">
      <Hero
        groomName={groom.name}
        brideName={bride.name}
        date={formatDate(wedding.date)}
        time={wedding.time}
        venue={wedding.venue}
        floor={wedding.floor || ""}
        hall={wedding.hall || ""}
      />
      <Intro groom={groom} bride={bride} message={introMessage} />
      <Calendar weddingData={weddingData} />
      <Gallery images={gallery} />
      <Location location={location} />
      <Account accounts={accounts} />
      <Share />
    </div>
  );
}

export default App;
