// 청첩장 데이터 타입 정의

export interface WeddingData {
  bride: Person;
  groom: Person;
  wedding: WeddingInfo;
  location: LocationInfo;
  gallery: GalleryImage[];
  accounts: AccountInfo[];
}

export interface Person {
  name: string;
  father?: string;
  mother?: string;
  order?: string; // "장남", "차남", "장녀" 등
  phone?: string;
}

export interface WeddingInfo {
  date: string; // ISO 8601 format
  time: string;
  venue: string;
  floor?: string;
  hall?: string;
}

export interface LocationInfo {
  name: string;
  address: string;
  addressDetail?: string;
  latitude: number;
  longitude: number;
  subway?: TransportInfo[];
  bus?: TransportInfo[];
  parking?: ParkingInfo;
  info?: { description: string }[];
}

export interface TransportInfo {
  line?: string; // 지하철 노선
  station?: string; // 역명
  numbers?: string[]; // 버스 번호
  description?: string;
}

export interface ParkingInfo {
  available: boolean;
  description: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface AccountInfo {
  type:
    | "groom"
    | "bride"
    | "groom-father"
    | "groom-mother"
    | "bride-father"
    | "bride-mother";
  name: string;
  bank: string;
  accountNumber: string;
  kakaoPayUrl?: string;
}

export interface Section {
  id: string;
  component: React.ComponentType;
  backgroundColor?: string;
}
