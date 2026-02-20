import type { WeddingData } from "../types";

export const weddingData: WeddingData = {
  groom: {
    name: "신동욱",
    father: "신완수",
    order: "아들",
  },
  bride: {
    name: "김은재",
    father: "김선용",
    mother: "신형숙",
    order: "딸",
  },
  wedding: {
    date: "2026-05-30T14:00:00",
    time: "오후 2시",
    venue: "더메리든",
    floor: "8층",
    hall: "단독홀",
  },
  location: {
    name: "더메리든",
    address: "경기도 성남시 분당구 서현로 180번길 19 비전월드",
    addressDetail: "8층 단독홀",
    latitude: 37.3873176,
    longitude: 127.1224365,
    subway: [
      {
        line: "수인분당선",
        station: "서현역",
        description: "5번 출구 도보 3분",
      },
    ],
    bus: [
      {
        description:
          "이매촌(한신아파트 앞) 정류장 하차: 2, 33, 55-1, 116, 222, 303, 380, 720-2, 102, 1001, 1005-1, 1151, 1500, 1500-2, 3330, 3500, 5500-1, 7007-1, 7200, 8130, 8131, 8133, 8151, 9000, 9001, 9005, 9401, 9403, 9407, 4102, 4000, 8106, 8109",
      },
      {
        description: "AK플라자(분당우체국 앞) 정류장 하차: 116, 222, 310, 3500",
      },
      {
        description:
          "서현역 앞 정류장 하차: 17, 17-1, 33, 55-1, 116-3, 220, 223, 250, 300, 500, 520, 520-1, 720-1, 720-2, 102, 5500-1, 7007-1, 9414, 4102",
      },
    ],
    parking: {
      available: true,
      description: [
        "판교 톨게이트 2.5km 직진 5분소요",
        "웨딩홀 건물 4~7F, 9F 주차장 이용",
        "무료 주차 2시간 30분",
      ],
    },
    info: [
      {
        description: `CGV 내부 엘리베이터 혼잡 시, "가까운상생약국" 방향 엘리베이터 이용 바랍니다.`,
      },
      {
        description:
          "식사는 정갈한 한상차림으로 준비되어 있으며, 오후 1시 30분부터 이용 가능합니다.",
      },
    ],
  },
  gallery: [
    {
      id: "1",
      url: "src/assets/image7.webp",
      alt: "",
      order: 1,
    },
    {
      id: "2",
      url: "src/assets/image5.webp",
      alt: "",
      order: 2,
    },
    {
      id: "3",
      url: "src/assets/image6.webp",
      alt: "",
      order: 3,
    },
    {
      id: "4",
      url: "src/assets/image4.webp",
      alt: "",
      order: 4,
    },
    {
      id: "5",
      url: "src/assets/image8.webp",
      alt: "",
      order: 5,
    },
    {
      id: "6",
      url: "src/assets/image9.webp",
      alt: "",
      order: 6,
    },
    {
      id: "7",
      url: "src/assets/image10.webp",
      alt: "",
      order: 7,
    },
    {
      id: "8",
      url: "src/assets/image11.webp",
      alt: "",
      order: 8,
    },
    {
      id: "9",
      url: "src/assets/image12.webp",
      alt: "",
      order: 9,
    },
    {
      id: "10",
      url: "src/assets/image13.webp",
      alt: "",
      order: 10,
    },
    {
      id: "11",
      url: "src/assets/image14.webp",
      alt: "",
      order: 11,
    },
    {
      id: "12",
      url: "src/assets/image15.webp",
      alt: "",
      order: 12,
    },
  ],
  accounts: [
    {
      type: "groom",
      name: "신동욱",
      bank: "신한은행",
      accountNumber: "110-323-654808",
    },
    {
      type: "groom-father",
      name: "신완수",
      bank: "하나은행",
      accountNumber: "705-910526-49207",
    },
    {
      type: "bride",
      name: "김은재",
      bank: "케이뱅크",
      accountNumber: "100-190-350049",
    },
    {
      type: "bride-father",
      name: "김선용",
      bank: "국민은행",
      accountNumber: "018-21-0864-820",
    },
    {
      type: "bride-mother",
      name: "신형숙",
      bank: "국민은행",
      accountNumber: "810-24-0340-294",
    },
  ],
};
