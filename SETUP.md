# SETUP — 한 번만 하는 설정

이걸 마치면 주 2회 자동 실행이 스스로 돌기 시작한다. 이후 URAD가 쓰는 시간은 `BLOCKERS.md`를 푸는 것과 콘솔에 내용을 채우는 것뿐이다.

소요: GitHub 30분 + Supabase 15분.

---

## 1단계 · GitHub 저장소

### 1-1. 저장소 만들기
github.com → 우측 상단 **+** → **New repository**

- **Repository name**: `acm-website` (정식 명칭 미정이므로 중립적으로. 나중에 변경 가능)
- **Public** 선택 — Pages 무료 호스팅이 바로 붙는다
- "Add a README file" **체크 해제** — 업로드할 파일과 충돌한다
- **Create repository**

### 1-2. 파일 올리기
새 저장소 화면의 **uploading an existing file** 링크 클릭.

탐색기에서 `Base Website` 폴더를 **열고**, 그 안의 파일 **18개를 전부 선택**해서 드래그.

> ⚠️ **폴더째로 끌면 안 된다.** 폴더를 끌면 저장소에 `Base Website/index.html` 로 들어가서 Pages가 루트에서 사이트를 못 찾는다. 폴더를 열고 파일들을 선택해서 끈다.

올라가야 할 것: `index.html` `topics.html` `articles.html` `videos.html` `future.html` `about.html` `contact.html` `article-template.html` `data.js` `script.js` `styles.css` `PLAN.md` `BACKLOG.md` `BLOCKERS.md` `IDEAS.md` `CHANGELOG.md` `EPISODES.md` `implementation_plan.md`

(`implementation_plan.md`는 6월 초안이라 지금은 무효다. 그냥 같이 올리면 A1이 정리한다.)

**Commit changes** 클릭.

### 1-3. Pages 켜기
저장소 **Settings** → 좌측 **Pages** → Build and deployment에서 **Deploy from a branch** → 브랜치 `main`, 폴더 `/ (root)` → **Save**

1~2분 뒤 `https://<계정명>.github.io/acm-website` 에서 사이트가 열린다.

### 1-4. 토큰 발급
프로필 사진 → **Settings** → 좌측 맨 아래 **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**

| 항목 | 설정값 |
|---|---|
| Token name | `acm-website-weekly` |
| Expiration | 90 days |
| Repository access | **Only select repositories** → `acm-website` 하나만 |
| Repository permissions → **Contents** | **Read and write** |
| 그 외 권한 | 전부 건드리지 않음 |

Metadata가 Read-only로 자동 체크되는 건 정상(필수 항목). **Generate token** 을 누르면 `github_pat_...` 가 **한 번만** 보인다.

---

## 2단계 · Supabase 프로젝트

관리 콘솔(2단계 B1~B6)의 시작점. 이게 있어야 "코드 안 건드리고 콘텐츠 바꾸기"가 실현된다.

1. supabase.com → 가입 → **New project**
2. 이름 `acm-website`, 리전은 **Northeast Asia (Seoul)**, 무료 플랜
3. 데이터베이스 비밀번호는 생성해서 **본인만 따로 보관** (전달할 필요 없음)
4. 프로젝트가 준비되면 **Settings → API Keys** 에서 두 가지를 복사
   - **Project URL** (`https://xxxxx.supabase.co`)
   - **publishable key** (`sb_publishable_...`)

> `publishable key`는 클라이언트에 노출되는 게 정상이다. 방어는 RLS(Row Level Security)가 하며 작업 B1이 모든 테이블에 걸어 둔다.
> **secret key는 절대 전달하지 않는다.** 이 사이트는 secret key를 쓰지 않는다.
> (예전 이름 `anon key`는 단계적 폐지 중이므로 새 키를 쓴다.)

---

## 3단계 · 전달할 것

```
저장소: https://github.com/<계정명>/acm-website
브랜치: main
토큰: github_pat_...

Supabase URL: https://xxxxx.supabase.co
Supabase publishable key: sb_publishable_...
```

Supabase는 나중에 줘도 된다. GitHub만 있으면 1단계(A1~A10)는 바로 시작된다.

---

## 4단계 · 자동화가 켜진 뒤

**주 2회, 1회 실행이 하는 일**
1. 저장소를 clone
2. `BACKLOG.md`와 `BLOCKERS.md`를 읽는다
3. 선행 조건이 풀린 첫 작업을 구현한다
4. 7개 페이지를 열어 콘솔 에러 0을 확인 → 커밋·푸시
5. **막히면 멈추지 않는다.** `BLOCKERS.md`에 "무엇이 필요한지"를 적고 다음 가능한 작업으로 넘어간다
6. 가능한 작업이 없어질 때까지 반복 → `CHANGELOG.md`에 기록

**확인하는 법**
- 무엇이 바뀌었나 → 저장소의 `CHANGELOG.md`, 또는 커밋 목록
- 지금 뭐가 막혀 있나 → `BLOCKERS.md`
- 사이트가 어떻게 보이나 → Pages 주소

---

## 주의: 로컬 폴더는 사본이 된다

설정이 끝나면 **GitHub 저장소가 원본**이고 데스크톱의 `Base Website` 폴더는 옛날 사본이다.
로컬에서 직접 고치면 자동 실행 결과와 어긋난다. 고칠 일이 있으면 GitHub에서 직접 하거나, 나에게 말하면 저장소에 반영한다.

## 90일 뒤

토큰이 만료되면 자동 실행이 실패한다. 같은 방법으로 재발급해서 알려주면 된다.
급하지 않으면 그동안 실행이 멈춰 있어도 손해는 없다 — 백로그가 그대로 남아 있어서 이어서 진행된다.

---

## 피드백을 반영하는 법

동아리에서 피드백이 오면 나에게 말하면 된다. 반영 경로는 셋이다.

| 종류 | 어디를 고치나 | 언제 반영되나 |
|---|---|---|
| "이 기능도 필요하다" | `BACKLOG.md`에 작업 추가 | 다음 실행부터 |
| "이건 순서를 앞당기자" | `BACKLOG.md`의 순서·선행 조건 변경 | 다음 실행부터 |
| "방향이 틀렸다" | `PLAN.md`의 결정·frozen 규칙 수정 | 다음 실행부터 |
| 이미 만들어진 화면이 별로다 | 해당 작업을 `[ ]`로 되돌리고 조건 수정 | 다음 실행에서 다시 만듦 |

**`BACKLOG.md`가 자동화를 조종하는 유일한 레버다.** 여기에 없는 일은 자동으로 벌어지지 않고, 여기에 적히면 순서대로 진행된다. 커밋 단위로 되돌릴 수 있으니 잘못 만들어진 것도 손해가 크지 않다.
