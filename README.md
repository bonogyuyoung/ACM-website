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

## 디자인 토큰

색·타이포·간격·모서리 반경·그림자는 전부 `styles.css`의 `:root`에 CSS 커스텀 프로퍼티로 정의되어 있다. 새 스타일을 추가할 때는 리터럴 값(`#3498db`, `1.5rem` 등) 대신 아래 스케일을 참조한다.

- **색:** `--primary-color` `--secondary-color` `--accent-color`(+ `--accent-hover`) `--background-color` `--card-bg` `--text-color` `--text-light` `--border-color` `--color-on-dark`(+ `--color-on-dark-muted`, 어두운 배경 위 텍스트용) — 상태 배지 색은 `--badge-*`로 별도 관리(아래 배지 참고)
- **타이포:** `--text-xs`(0.8rem) `--text-sm`(0.85rem) `--text-base`(1rem) `--text-md`(1.1rem) `--text-lg`(1.25rem) `--text-xl`(1.5rem) `--text-2xl`(2rem) `--text-3xl`(2.5rem)
- **간격:** `--space-1`(0.25rem) 부터 `--space-8`(3rem)까지 0.25rem 단위 스케일. padding/margin/gap은 이 중 하나를 쓴다.
- **모서리 반경:** `--radius-sm`(4px, 버튼·배지) `--radius-md`(8px, 카드·패널)
- **그림자:** `--shadow-sm`(헤더) `--shadow-md`(카드) `--shadow-lg`(드롭다운 패널) `--shadow-hover`(카드 호버)

## 컴포넌트 클래스 규약

새 목록형 페이지나 카드를 추가할 때는 아래 기존 클래스를 재사용한다. 새 클래스를 만들기 전에 이 표에 맞는 게 있는지 먼저 확인한다.

| 클래스 | 용도 | 렌더 위치 |
|---|---|---|
| `.grid-container` + `.card` | 카드형 목록의 그리드와 개별 카드. 자동으로 줄바꿈되는 반응형 그리드(`repeat(auto-fill, minmax(300px, 1fr))`) | `script.js`의 `renderTopics()` / `renderArticles()` / `renderVideos()` / `renderTeamRoles()` / `renderRoadmap()` |
| `.badge` + `.badge.<status>` | 상태 배지. `<status>`는 `config.statusStages`를 소문자·하이픈으로 변환한 값(`planned`/`researching`/`drafting`/`review`/`published`). 목록에 없는 상태는 자동으로 `.badge.default`로 떨어진다(배경색 없는 배지 방지) | `script.js`의 `getBadgeClass(status)` |
| `.btn.btn-active` / `.btn.btn-disabled` | 링크가 있으면 활성 버튼, `"#"`거나 없으면 "Coming Soon" 형태의 비활성 버튼 | 카드 렌더 함수 내부의 `buttonHtml` 분기 |
| `.empty-state` | 목록이 0개일 때의 안내 블록. `.grid-container` 안에서는 `grid-column: 1 / -1`로 전체 폭을 차지한다 | `script.js`의 `renderEmptyState(container, message)` — 모든 목록 렌더 함수가 0개일 때 이 함수를 호출한다 |

새 목록 렌더 함수를 추가할 때는 `renderEmptyState()`를 먼저 호출하는 0개 분기를 넣는 걸 기본으로 한다.
