# Next.js + MongoDB + Tailwind CSS 게시판

Next.js와 MongoDB를 기반으로 한 반응형 게시판 프로젝트입니다. Tailwind CSS로 스타일링되었으며, 사용자 인증과 댓글 기능을 포함합니다.

## ✅ 주요 기능
- 게시글, 댓글 CRUD
- 게시글 좋아요
- NextAuth.js를 이용한 사용자 인증
- MongoDB를 통한 데이터 영속성

## 📁 프로젝트 구조
```bash
📦BOARD/
 ┣ 📂app/              # App Router 기반의 페이지 라우팅
 ┣ 📂components/       # UI 컴포넌트들
 ┣ 📂lib/              # 유틸성 코드 (MongoDB 연결 등)
 ┣ 📂types/            # TypeScript 타입 정의 또는 스키마 정의
 ┗ 📂styles/           # 글로벌 스타일 (Tailwind 포함)
 ```
