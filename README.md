# 기술 블로그

Hugo를 사용한 기술 블로그입니다. GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

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

# 새 포스트 작성
hugo new posts/my-new-post.md

# 정적 파일 생성
hugo
```

## 📝 포스트 작성

포스트는 `content/posts/` 디렉토리에 Markdown 파일로 작성합니다.

```bash
# 새 포스트 생성
hugo new posts/my-new-post.md

# 초안(draft) 상태로 생성
hugo new posts/my-draft-post.md
```

포스트 front matter 예시:
```yaml
---
title: "포스트 제목"
date: 2024-01-12T00:00:00+09:00
draft: false
categories: ["개발"]
tags: ["Hugo", "블로그"]
---
```

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

## 📁 프로젝트 구조

```
.
├── archetypes/      # 포스트 템플릿
├── content/         # 콘텐츠 파일
│   └── posts/       # 블로그 포스트
├── themes/          # 테마 (서브모듈)
├── config.toml      # Hugo 설정
└── public/          # 빌드 산출물 (Git에 포함 안 됨)

.github/
└── workflows/
    └── deploy.yml   # GitHub Actions 워크플로우
```

## ⚙️ 설정

- 블로그 설정: `config.toml` 수정
- 테마 설정: 테마별로 다름 (Ananke는 `config.toml`의 `[params]` 섹션)

## 🔗 참고 링크

- [Hugo 공식 문서](https://gohugo.io/documentation/)
- [Hugo 테마 갤러리](https://themes.gohugo.io/)
- [GitHub Pages](https://pages.github.com/)
- [Ananke 테마 문서](https://github.com/theNewDynamic/gohugo-theme-ananke)
