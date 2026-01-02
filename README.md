# 기술 블로그

Hugo를 사용한 기술 블로그입니다. GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

## 📋 목차

- [시작하기](#-시작하기)
- [디렉토리 구조](#-디렉토리-구조)
- [카테고리/태그/시리즈 전략](#-카테고리태그시리즈-전략)
- [포스트 작성 가이드](#-포스트-작성-가이드)
- [포트폴리오 통합](#-포트폴리오-통합)
- [위키 스타일 자동 링크](#-위키-스타일-자동-링크)
- [CI/CD](#-cicd)

---

## 🚀 시작하기

### Hugo 설치

#### Windows (Chocolatey)
```bash
choco install hugo-extended
```

#### Windows (Scoop)
```bash
scoop install hugo-extended
```

#### macOS (Homebrew)
```bash
brew install hugo
```

#### Linux
```bash
# Snap
snap install hugo-extended

# 또는 직접 다운로드
# https://github.com/gohugoio/hugo/releases
```

### 로컬 개발 환경 설정

```bash
# 테마 추가 (처음 한 번만)
git submodule add -b main https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke

# 로컬 서버 실행 (http://localhost:1313)
hugo server -D

# 정적 파일 생성
hugo
```

---

## 📁 디렉토리 구조

### 현재 구조 (형태/목적 기반)

```
content/
├── posts/                 # 잡글/회고/공지/짧은 팁 (시간순)
│   ├── 2026/01/...
│   ├── 2025/12/...
│   └── 2024/01/
│       └── 12-hello-world.md
├── notes/                 # 지식 정리(ML/DL/Stats/CS/CV/NLP)
│   ├── _index.md
│   ├── ml/                # (선택) topic landing용 브랜치 번들
│   │   ├── _index.md
│   │   └── linear-regression.md
│   └── nlp/
│       └── _index.md
├── papers/                # 논문 리뷰
│   ├── _index.md
│   └── 2025-iccv-vgt.md
├── competitions/          # Dacon / Kaggle 로그
│   ├── _index.md
│   └── dacon-ev-price/
│       ├── _index.md
│       ├── eda.md
│       ├── baseline.md
│       └── final.md
├── projects/              # 포트폴리오(면접관용)
│   ├── _index.md
│   └── bible-rag-chatbot.md
├── experience/            # 교육 프로그램/인턴 경험(회고, 배운점)
│   ├── _index.md
│   └── est-security-intern.md
└── about/
    └── _index.md
```

**핵심 원칙:**
- **섹션**: 형태/목적 (posts, notes, papers, competitions, projects, experience)
- **태그**: 주제/기술 (machine-learning, pytorch, nlp 등)
- **시리즈**: 연재/커리큘럼 (ml-basics, stats-for-ds 등)

---

## 🏷️ 카테고리/태그/시리즈 전략

### Categories (카테고리) - 형태/목적
**원칙: 글의 형태/목적만 3~6개로 제한**

카테고리는 **형태/목적**을 나타내며, 섹션과 일치시킵니다.

**표준 카테고리:**
- `notes` - 지식 정리 (notes 섹션)
- `paper-review` - 논문 리뷰 (papers 섹션)
- `competition` - 대회 로그 (competitions 섹션)
- `project` - 프로젝트 (projects 섹션)
- `retrospective` - 회고 (experience 섹션)
- `posts` - 잡글/공지/팁 (posts 섹션)

**사용법:**
```yaml
categories: ["notes"]  # 단일 카테고리 (권장)
```

### Tags (태그) - 기술/주제
**원칙: 기술/주제로 자유롭게**

태그는 **기술 스택**이나 **주제**를 나타냅니다.

**태그 분류 예시:**
- **기술 스택**: `python`, `pytorch`, `react`, `docker`, `sql`
- **주제**: `machine-learning`, `deep-learning`, `statistics`, `nlp`, `cv`, `rag`, `yolo`

**사용법:**
```yaml
tags: ["machine-learning", "statistics", "regression"]
```

### Series (시리즈) - 연재/커리큘럼
**원칙: 연재/커리큘럼 묶기**

시리즈는 관련 포스트를 묶어서 표시합니다.

**시리즈 예시:**
- `ml-basics` - 머신러닝 기초
- `stats-for-ds` - 데이터 사이언스를 위한 통계
- `paper-reading-2025` - 2025년 논문 읽기

**사용법:**
```yaml
series: ["ml-basics"]
```

### 구분 예시

| 포스트 주제 | 섹션 | 카테고리 | 태그 | 시리즈 |
|-----------|------|---------|------|--------|
| "Bias-Variance Tradeoff" | `notes` | `notes` | `machine-learning`, `statistics` | `ml-basics` |
| "Vision Transformer 리뷰" | `papers` | `paper-review` | `deep-learning`, `cv`, `transformer` | - |
| "Dacon 전기차 가격 예측 EDA" | `competitions` | `competition` | `data-science`, `eda`, `regression` | - |
| "Bible RAG Chatbot" | `projects` | `project` | `rag`, `nlp`, `llm` | - |
| "EST Security 인턴십 회고" | `experience` | `retrospective` | `internship`, `security` | - |

---

## 📝 포스트 작성 가이드

### 새 포스트 생성

```bash
# Notes (지식 정리)
hugo new notes/ml/bias-variance.md
hugo new notes/nlp/bert-finetune.md

# Papers (논문 리뷰)
hugo new papers/2025-iccv-vgt.md

# Competitions (대회 로그)
hugo new competitions/dacon-ev-price/eda.md

# Projects (포트폴리오)
hugo new projects/bible-rag-chatbot.md

# Experience (경험 회고)
hugo new experience/est-security-intern.md

# Posts (잡글/공지)
hugo new posts/2026/01/15-my-tip.md
```

### Front Matter 템플릿

#### Notes (지식 정리)
```yaml
---
title: "Bias-Variance Tradeoff"
date: 2026-01-02T10:00:00+09:00
draft: false
categories: ["notes"]
tags: ["machine-learning", "statistics"]
series: ["ml-basics"]
description: "Bias-Variance Tradeoff 개념 설명"
show_reading_time: true
toc: false
---
```

#### Papers (논문 리뷰)
```yaml
---
title: "Vision Transformer"
date: 2026-01-02T10:00:00+09:00
draft: false
categories: ["paper-review"]
tags: ["deep-learning", "cv", "transformer"]
description: "Vision Transformer 논문 리뷰"
toc: true
---
```

#### Competitions (대회 로그)
```yaml
---
title: "EDA - 전기차 가격 예측"
date: 2026-01-02T10:00:00+09:00
draft: false
categories: ["competition"]
tags: ["data-science", "eda", "regression"]
description: "Dacon 전기차 가격 예측 대회 EDA"
---
```

#### Projects (포트폴리오)
```yaml
---
title: "Bible RAG Chatbot"
date: 2026-01-02T10:00:00+09:00
draft: false
categories: ["project"]
tags: ["rag", "nlp", "llm"]
description: "성경 RAG 챗봇 프로젝트"
featured_image: "/images/bible-rag.jpg"
github_url: "https://github.com/username/project"
demo_url: "https://demo.com"
tech_stack: ["Python", "LangChain", "OpenAI"]
---
```

#### Experience (경험 회고)
```yaml
---
title: "EST Security 인턴십"
date: 2026-01-02T10:00:00+09:00
draft: false
categories: ["retrospective"]
tags: ["internship", "security"]
description: "EST Security 인턴십 경험 회고"
---
```

### 작성 워크플로우

1. **초안 작성**
   ```yaml
   draft: true  # 초안 상태
   ```

2. **미리보기**
   ```bash
   hugo server -D  # 초안 포함 미리보기
   ```

3. **발행**
   ```yaml
   draft: false  # 발행 상태로 변경
   ```

---

## 💼 포트폴리오 통합

### 블로그 + 포트폴리오 함께 사용하기 (권장)

**대부분의 경우 함께 사용하는 것을 강력히 추천합니다!**

**이유:**
1. **SEO 효과**: 하나의 도메인에 콘텐츠 집중
2. **관리 편의성**: 하나의 사이트로 통합 관리
3. **자연스러운 연결**: 블로그 포스트가 실력 증명
4. **시간 절약**: 별도 사이트 구축 시간 없음

### 프로젝트 작성 예시

```yaml
---
title: "E-Commerce 플랫폼"
date: 2024-12-01T10:00:00+09:00
featured_image: "/images/projects/ecommerce.jpg"
github_url: "https://github.com/username/ecommerce"
demo_url: "https://ecommerce-demo.com"
tech_stack: ["React", "Node.js", "PostgreSQL", "Stripe"]
categories: ["project"]
tags: ["웹개발", "풀스택", "React", "E-Commerce"]
description: "React와 Node.js로 구축한 전자상거래 플랫폼"
weight: 1
---

## 프로젝트 개요

이 프로젝트는 React와 Node.js를 사용하여 구축한 전자상거래 플랫폼입니다.

## 주요 기능

- 사용자 인증 및 권한 관리
- 상품 검색 및 필터링
- 장바구니 및 주문 관리
- 결제 시스템 연동 (Stripe)
- 관리자 대시보드

## 기술 스택

- **Frontend**: React, Redux, Material-UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Payment**: Stripe API
- **Deployment**: AWS, Docker

## 배운 점

- 풀스택 개발 경험
- 결제 시스템 연동
- 실시간 데이터 동기화
- 성능 최적화 기법
```

---

## 🔗 위키 스타일 자동 링크

마크다운에서 개념이 등장하면 자동으로 관련 포스트로 링크가 생성됩니다.

### 사용 방법

#### 방법 1: Shortcode 사용 (권장, SEO 친화적)
```markdown
{{< wiki "선형 회귀" >}}에 대해 설명합니다.
```

#### 방법 2: 위키 문법 (자동 변환, 편리함)
```markdown
[[선형 회귀]]는 머신러닝의 기본 개념입니다.
```

### 개념 사전 관리

`data/concepts.yaml` 파일에 개념을 추가:

```yaml
concepts:
  "선형 회귀": "Linear Regression"
  "Linear Regression": "Linear Regression"
  "로지스틱 회귀": "Logistic Regression"
  "회귀": "Linear Regression"
```

### 자동 매칭 규칙

1. **정확한 제목 일치**: 포스트 제목과 정확히 일치
2. **부분 일치**: 포스트 제목에 개념이 포함됨
3. **태그 매칭**: 태그 이름과 일치
4. **개념 사전**: `data/concepts.yaml`에서 매핑

---

## 🔄 CI/CD

GitHub Actions가 자동으로:
1. `main` 브랜치에 push 시 트리거
2. Hugo 사이트 빌드
3. GitHub Pages에 자동 배포

### 수동 배포

GitHub Actions 탭에서 "Deploy Hugo site to Pages" 워크플로우를 수동으로 실행할 수 있습니다.

### GitHub Pages 설정

1. 저장소 Settings → Pages로 이동
2. Source를 "GitHub Actions"로 선택
3. 저장소 이름이 `username.github.io`인 경우 자동으로 활성화됩니다

---

## 📂 프로젝트 구조

```
.
├── archetypes/      # 포스트 템플릿
│   ├── default.md
│   ├── notes.md
│   ├── papers.md
│   ├── competitions.md
│   ├── projects.md
│   └── experience.md
├── content/         # 콘텐츠 파일
│   ├── posts/       # 잡글/회고/공지
│   ├── notes/       # 지식 정리
│   ├── papers/      # 논문 리뷰
│   ├── competitions/# 대회 로그
│   ├── projects/    # 포트폴리오
│   ├── experience/  # 경험 회고
│   └── about/       # 자기소개
├── data/            # 데이터 파일
│   └── concepts.yaml # 위키 링크 개념 사전
├── layouts/         # 레이아웃 오버라이드
├── static/          # 정적 파일
│   ├── css/         # 커스텀 CSS
│   └── js/          # 커스텀 JavaScript
├── themes/          # 테마 (서브모듈)
├── config.toml      # Hugo 설정
└── public/          # 빌드 산출물 (Git에 포함 안 됨)

.github/
└── workflows/
    └── deploy.yml   # GitHub Actions 워크플로우
```

---

## ⚙️ 설정

### 주요 설정 파일

- **블로그 설정**: `config.toml` 수정
- **테마 설정**: 테마별로 다름 (Ananke는 `config.toml`의 `[params]` 섹션)

### Permalink 설정

```toml
[permalinks]
  posts = "/:year/:month/:day/:title/"
  notes = "/notes/:title/"
  papers = "/papers/:title/"
  competitions = "/competitions/:title/"
  projects = "/projects/:title/"
  experience = "/experience/:title/"
```

---

## 💡 모범 사례 체크리스트

### 포스트 작성 전
- [ ] 카테고리는 1개로 제한 (형태/목적)
- [ ] 태그는 3-7개 정도로 구체적으로 (기술/주제)
- [ ] 제목은 검색 가능하게 작성
- [ ] description은 150자 이내로 작성 (SEO)

### 포스트 작성 중
- [ ] 마크다운 문법 올바르게 사용
- [ ] 코드 블록에 언어 지정
- [ ] 이미지는 alt 텍스트 추가
- [ ] 링크는 의미 있는 텍스트 사용
- [ ] 위키 링크 활용: `{{< wiki "개념명" >}}` 또는 `[[개념명]]`

### 포스트 발행 전
- [ ] 오타 및 문법 검사
- [ ] 링크가 모두 작동하는지 확인
- [ ] 이미지가 모두 로드되는지 확인
- [ ] draft: false로 변경
- [ ] 날짜 확인

---

## 🔍 검색 최적화 (SEO)

### Front Matter 최적화
```yaml
---
title: "구체적이고 검색 가능한 제목"
description: "포스트를 요약하는 150자 이내의 설명"
---
```

### 콘텐츠 최적화
- 제목에 주요 키워드 포함
- H2, H3 제목 구조화
- 내부 링크 활용 (위키 링크 사용)
- 관련 태그 적절히 사용

---

## 📈 카테고리/태그 관리 팁

### 1. 일관성 유지
- 비슷한 주제는 같은 카테고리/태그 사용
- 태그는 소문자 통일 권장 (예: `machine-learning`)

### 2. 정기적 정리
- 사용하지 않는 태그 제거
- 유사한 태그 통합 (예: `ML` → `machine-learning`)

---

## 🎨 테마 변경

현재 사용 중인 테마: **Ananke**

다른 테마를 사용하려면:

1. [Hugo 테마 갤러리](https://themes.gohugo.io/)에서 테마 선택
2. 테마를 서브모듈로 추가:
```bash
git submodule add <테마-저장소-URL> themes/<테마-이름>
```
3. `config.toml`에서 `theme` 설정 변경:
```toml
theme = "<테마-이름>"
```

---

## 🔗 참고 링크

- [Hugo 공식 문서](https://gohugo.io/documentation/)
- [Hugo 테마 갤러리](https://themes.gohugo.io/)
- [GitHub Pages](https://pages.github.com/)
- [Ananke 테마 문서](https://github.com/theNewDynamic/gohugo-theme-ananke)

---

## 📚 빠른 참조

### 자주 사용하는 명령어
```bash
# 로컬 서버 실행
hugo server -D

# 새 포스트 생성
hugo new notes/ml/bias-variance.md
hugo new papers/2025-iccv-vgt.md
hugo new projects/my-project.md

# 정적 파일 생성
hugo
```

### 주요 파일 위치
- 설정: `config.toml`
- 콘텐츠: `content/`
- 레이아웃: `layouts/`
- 스타일: `static/css/custom.css`
- 스크립트: `static/js/custom.js`
- 개념 사전: `data/concepts.yaml`
