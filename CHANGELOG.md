# CHANGELOG

자동 실행이 매회 기록한다. 형식: `날짜 · 작업ID · 요약 · 변경 파일`

- 2026-09-02 · A4 · 빈 상태 시스템. `renderEmptyState()` 공통 함수를 추가하고 topics/articles/videos/team-roles/roadmap/home-buttons 렌더 함수 전부가 0개일 때 이걸 쓰도록 통일. `styles.css`에 `.empty-state` 스타일 추가(grid 안에서는 전체 폭 차지). 콘텐츠 0개인 topics/articles/videos 페이지가 깨진 화면이 아니라 안내 문구가 있는 완성된 화면으로 보이는 것을 시뮬레이션으로 확인 · script.js, styles.css
- 2026-09-02 · A3 · 상태 파이프라인. `getBadgeClass()`가 `config.statusStages`에 없는 상태를 받으면 `badge default`로 떨어지도록 수정(기존엔 배경색 없는 배지가 나오는 버그였음). `styles.css`에 5단계(planned/researching/drafting/review/published) 배지 색을 전부 정의하고, 더 이상 쓰이지 않는 `script-writing` 배지 제거 · script.js, styles.css
- 2026-09-02 · A2 · 빈 계층 스키마 + 설정 분리. `data.js`를 `config`(사이트명·표시 명칭·상태 단계 목록·과목 분류·발행 주기)와 `collections`(묶음→항목 2계층, 빈 배열)로 재구성. 기존 Antibiotic Resistance/Vaccines/CRISPR 3건과 `featuredVideo`의 하드코딩된 콘텐츠 제거. `topics`/`articles`/`videos`는 `collections`에서 map/filter로 파생시켜 `script.js` 무수정으로 7개 페이지 정상 동작 확인(0개·N개 양쪽 케이스 검증) · data.js
- 2026-09-02 · A1 · 저장소 구조 정리 + 배포 확인. `.nojekyll` 추가로 Pages가 파일을 그대로 서빙하도록 지정, README에 폴더 구조와 편집 안내 작성. Pages API로 7개 페이지 전부 200 응답 확인, 상대경로 링크(styles.css/data.js/script.js) 정상. X1(저장소+토큰)이 이미 풀려 있음을 확인해 BLOCKERS.md 해결됨으로 이동 · README.md, .nojekyll, BLOCKERS.md
- 2026-09-01 · v3 · **콘텐츠를 코드에서 분리.** 문서의 5시즌 21편·팀 명단·월 1회 발행 규칙·AP 자격 규정이 전부 오래된 것으로 확인됨 → 시딩을 제거하고 빈 스키마 + 설정값 구조로 전환. 관리 콘솔을 2단계로 앞당겨 이후 콘텐츠 변경이 저장소를 건드리지 않게 함. 21편은 `IDEAS.md`에 후보로 보관. 4단계 49개 작업 · PLAN.md, BACKLOG.md, BLOCKERS.md, IDEAS.md, EPISODES.md(폐기)
- 2026-09-01 · v2 · 목표를 base website에서 full website 1년 완성으로 변경. 보류했던 계정·코스·AI 튜터·스태프 콘솔·수익화를 범위로 복원, 트랙 + 게이트 모델 도입 · PLAN.md, BACKLOG.md, BLOCKERS.md
- 2026-09-01 · v1 · 최초 계획 수립 · PLAN.md, BACKLOG.md, EPISODES.md
