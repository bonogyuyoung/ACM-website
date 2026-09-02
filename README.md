# ACM Website

정적 사이트. 빌드 도구 없음 — HTML/CSS/JS 파일을 그대로 GitHub Pages가 서빙한다.

배포 주소: https://bonogyuyoung.github.io/ACM-website/

## 폴더 구조

```
.
├── index.html              홈
├── topics.html             연구 주제 목록
├── articles.html           아티클 목록
├── videos.html             영상 목록
├── future.html             로드맵 / 미래 플랫폼
├── about.html               팀 소개
├── contact.html             문의 / 참여
├── article-template.html   아티클 상세 템플릿
├── data.js                 사이트 설정 + 콘텐츠 데이터 (전역 변수)
├── script.js                data.js 를 읽어 각 페이지에 렌더링하는 공통 로직
├── styles.css                전체 스타일 (색상·폰트는 :root 변수로 관리)
├── .nojekyll                 GitHub Pages가 Jekyll 처리 없이 파일을 그대로 서빙하도록 지정
├── PLAN.md                   설계 배경, frozen 규칙
├── BACKLOG.md                자동 실행 작업 큐
├── BLOCKERS.md                사람이 풀어야 열리는 항목
├── IDEAS.md                   주제 후보 창고 (기준 데이터 아님)
└── CHANGELOG.md               자동 실행 기록
```

7개 HTML 파일명은 고정이다 (`PLAN.md` §6). 새 페이지가 필요하면 새 파일을 추가하되 기존 7개의 이름은 바꾸지 않는다.

## 편집 방법

1. 이 저장소를 clone 하거나 GitHub 웹 편집기로 직접 파일을 연다.
2. HTML 구조를 바꾸거나, `data.js`의 설정/데이터를 바꾸거나, `script.js`의 렌더 함수를 바꾼다.
3. `main` 브랜치에 push 하면 GitHub Pages가 자동으로 다시 배포한다. 별도 빌드 단계 없음.

## 콘텐츠에 관한 규칙

콘텐츠(시즌·에피소드·팀원 이름·과목명 등)는 코드에 직접 쓰지 않는다. 지금은 `data.js`의 빈 스키마와 설정값만 존재하며, 이후 관리 콘솔(Supabase)에서 채워진다. 자세한 배경은 `PLAN.md`, 진행 상황은 `BACKLOG.md`를 참고.

## 공통 UI 규약

헤더/푸터 같은 공통 UI는 페이지마다 복붙하지 않는다. 각 HTML 파일은 `<div id="header-container">`와 `<div id="footer-container">`만 두고, `script.js`의 `renderHeader()` / `renderFooter()`가 내용을 채운다. 새로운 공통 UI가 필요하면 같은 방식(빈 컨테이너 + 렌더 함수)을 따른다.
