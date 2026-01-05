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
        description: "이매촌(한신아파트 앞) 정류장 하차",
      },
      {
        description: "AK플라자(분당우체국 앞) 정류장 하차",
      },
      {
        description: "서현역 앞 정류장 하차",
      },
    ],
    parking: {
      available: true,
      description: ["판교 톨게이트 2.5km 직진 5분소요", "무료 주차 2시간 30분"],
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
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 1",
      order: 1,
    },
    {
      id: "2",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 2",
      order: 2,
    },
    {
      id: "3",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 3",
      order: 3,
    },
    {
      id: "4",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 4",
      order: 4,
    },
    {
      id: "5",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 5",
      order: 5,
    },
    {
      id: "6",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 6",
      order: 6,
    },
    {
      id: "7",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 7",
      order: 7,
    },
    {
      id: "8",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 8",
      order: 8,
    },
    {
      id: "9",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 9",
      order: 9,
    },
    {
      id: "10",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 10",
      order: 10,
    },
    {
      id: "11",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 11",
      order: 11,
    },
    {
      id: "12",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 12",
      order: 12,
    },
    {
      id: "13",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 13",
      order: 13,
    },
    {
      id: "14",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 14",
      order: 14,
    },
    {
      id: "15",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 15",
      order: 15,
    },
    {
      id: "16",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 16",
      order: 16,
    },
    {
      id: "17",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 17",
      order: 17,
    },
    {
      id: "18",
      url: "https://placehold.co/900x1600",
      alt: "갤러리 이미지 18",
      order: 18,
    },
  ],
  accounts: [
    {
      type: "groom",
      name: "신동욱",
      bank: "국민은행",
      accountNumber: "123-456-7890",
      kakaoPayUrl: "",
    },
    {
      type: "groom-father",
      name: "신완수",
      bank: "신한은행",
      accountNumber: "110-222-333444",
    },
    {
      type: "bride",
      name: "김은재",
      bank: "케이뱅크",
      accountNumber: "100-190-350049",
      kakaoPayUrl: "",
    },
    {
      type: "bride-father",
      name: "김선용",
      bank: "농협은행",
      accountNumber: "356-0123-4567-89",
    },
    {
      type: "bride-mother",
      name: "신형숙",
      bank: "하나은행",
      accountNumber: "123-456789-01234",
    },
  ],
};
