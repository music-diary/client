## 1. 브랜치 네이밍 규칙

### 종류

- `main`: 제품 출시 브랜치
  - `hotfix`: 출시 버전에서 발생한 버그 수정 브랜치
- `develop`: 출시를 위해 개발하는 브랜치
  - `feature`: 새로운 기능을 개발하는 브랜치
  - `release`: 이번 출시 버전을 준비하는 브랜치

**_→ 상위 브랜치로부터 분기 ex)_ `hotfix`_는_ `main`으로부터 분기\***

### 예시

- `feature/login`
- `feature/home-bottom-tab`
- `feature/#14-login-update` ← 이슈 기능 추가할 때 방법
- `release-1.1` ← 현재 버전 + 0.1 추가
- `hotfix-1.2.1` ← 현재 버전 + 0.0.1 추가
  - [**버전 참고**](https://devdesigner.tistory.com/21)
  - **띄어쓰기시 케밥케이스 _ex)_** `feature/loginApi` **_(X)_** `feature/login-api` **_(O)_**

<br>

## 2. 커밋 컨벤션

✨ :sparkles: → 새기능

💄 :lipstick: → UI스타일 수정

♻️ :recycle: → 코드 리팩토링

🐛 :bug: → 버그

📝 :memo: → 문서 관련 (리드미, 깃이그노어)

➕ :heavy_plus_sign: → 의존성 추가

➖ :heavy_minus_sign: → 의존성 제거

🎨 :art: → 폴더 구조 변경( 파일 이름 변경, 리소스 변경 등)

🔀 :twisted_rightwards_arrows: → 머지

⏪ :rewind: → 리버트

### 예시

- `🎨 Design architecture`
- `✨ Create login form`

<br>
  
## 3. PR시 주의사항

`feature` → `develop`으로 머지 / `main`에 머지 안 하도록 유의

### Merge 전략

`feature` → `develop` 머지시 `Squash and Merge`

`develop` → `main` 머지 `Rebase and Merge`

<br>

## 4. 파일명 컨벤션

[[팁] 카멜 케이스 / 케밥 케이스 / 파스칼 케이스 / 스네이크 케이스 란?](https://togll.tistory.com/53)

component - 파스칼 케이스 `DeleteButton.tsx`

개발시 되도록 줄임말 사용x → btn(x) button(o)
