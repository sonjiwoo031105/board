# Next.js + MongoDB + Tailwind CSS 게시판

Next.js와 MongoDB를 기반으로 제작한 게시판 프로젝트입니다. 사용자들이 자유롭게 글을 작성하고 공유할 수 있는 공간을 제공합니다.

## ✅ 주요 기능
- 게시글  CRUD (작성, 조회, 수정, 삭제)
- 게시글 좋아요
- 댓글 작성 및 관리
- 반응형 디자인 구현
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
