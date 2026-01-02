# 모바일 청첩장 프로젝트 구조

## 📁 폴더 구조

```
src/
├── components/
│   ├── common/              # 공통 컴포넌트
│   │   ├── Section.tsx      # 섹션 래퍼 컴포넌트
│   │   ├── Section.scss
│   │   ├── Button.tsx       # 버튼 컴포넌트
│   │   ├── Button.scss
│   │   └── index.ts
│   │
│   └── sections/            # 섹션별 컴포넌트
│       ├── Hero.tsx         # 히어로 섹션 (배경 + Parallax)
│       ├── Hero.scss
│       ├── Intro.tsx        # 소개 섹션 (신랑신부 소개)
│       ├── Intro.scss
│       ├── Gallery.tsx      # 갤러리 섹션
│       ├── Gallery.scss
│       ├── Location.tsx     # 오시는 길
│       ├── Location.scss
│       ├── Account.tsx      # 마음 전하실 곳 (계좌번호)
│       ├── Account.scss
│       ├── Share.tsx        # 공유하기
│       ├── Share.scss
│       └── index.ts
│
├── types/
│   └── index.ts             # TypeScript 타입 정의
│
├── constants/
│   └── weddingData.ts       # 청첩장 데이터
│
├── styles/
│   └── global.scss          # 전역 스타일
│
├── App.tsx                  # 메인 애플리케이션
└── main.tsx                 # 엔트리 포인트
```

## 🎨 기술 스택

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **SCSS** - 스타일링
- **Framer Motion** - 애니메이션 (Parallax 포함)
- **Lucide React** - 아이콘
- **Vite** - 빌드 도구

## 📦 주요 컴포넌트

### 공통 컴포넌트

#### Section
- 모든 섹션의 래퍼 컴포넌트
- 반응형 레이아웃 제공
- 배경색 커스터마이징 가능

#### Button
- 3가지 variant: primary, secondary, outline
- 3가지 size: small, medium, large
- fullWidth 옵션 지원

### 섹션 컴포넌트

#### Hero
- Save the Date 타이틀
- 신랑신부 이름
- 날짜, 시간, 장소 정보
- **Parallax 배경 효과** 적용
- Framer Motion 애니메이션

#### Intro
- 신랑신부 상세 정보
- 부모님 성함
- 인사말

#### Gallery
- 이미지 그리드 레이아웃
- 이미지 클릭 시 모달
- Lazy loading 지원

#### Location
- 오시는 길 정보
- 지하철/버스 안내
- 주차 정보
- 카카오맵/네이버지도/구글지도 연동

#### Account
- 계좌번호 정보
- 신랑측/신부측 구분
- 계좌번호 복사 기능
- 카카오페이 연동 준비

#### Share
- 카카오톡 공유
- 링크 복사
- 네이티브 공유 (모바일)

## 📝 데이터 구조

모든 청첩장 데이터는 `src/constants/weddingData.ts`에 정의되어 있습니다.

```typescript
interface WeddingData {
  bride: Person;
  groom: Person;
  wedding: WeddingInfo;
  location: LocationInfo;
  gallery: GalleryImage[];
  accounts: AccountInfo[];
}
```

## 🎯 다음 단계

1. **SCSS 설치**
   ```bash
   npm install -D sass
   # 또는
   pnpm add -D sass
   ```

2. **이미지 교체**
   - Hero 배경 이미지: `src/components/sections/Hero.scss` 12번째 줄
   - 갤러리 이미지: `src/constants/weddingData.ts`의 `gallery` 배열

3. **데이터 수정**
   - `src/constants/weddingData.ts` 파일을 수정하여 실제 정보 입력

4. **카카오톡 공유 설정**
   - Kakao Developers에서 앱 등록
   - `index.html`에 Kakao SDK 추가
   - `Share.tsx`에서 카카오 공유 설정

5. **추가 기능 구현**
   - D-Day 카운터
   - 캘린더 추가 버튼
   - 방명록 (선택사항)

## 🚀 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프리뷰
npm run preview
```

## 📱 반응형 지원

모든 컴포넌트는 모바일 우선으로 설계되었으며, 768px 브레이크포인트를 기준으로 반응형을 지원합니다.
