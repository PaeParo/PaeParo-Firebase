# PaeParo-Firebase
Firebase Functions를 이용하여 PaeParo의 Back-End 작업을 관리합니다. 중요한 보안 및 처리 기능들과 추천 서비스와 같은 복잡한 기능은 Firebase Functions에서 처리한 후 Cloud Firestore 또는 사용자 Client로 결과값을 전달합니다.

<br>

# Local Firebase Functions Emulator
실제 Firebase Functions에 배포되기 전, 개인 로컬 컴퓨터에서 Firebase Functions Emulator를 이용하여 미리 테스트를 진행해 볼 수 있습니다. 다음 설정을 통해 실제 Firebase Functions에서와 동일한 기능을 사용할 수 있습니다. (단, Local에서만 동작 가능)

<br>

## 사전 설정
아래 설명되어있는 내용을 따라 사전 설정을 진행해주세요.

<br>

### 1. Node.js 설치
다음 [링크](https://nodejs.org/)를 통해 Node.js를 설치해주세요. 이미 설치되어있다면 2번을 진행해주세요.

<br>

### 2. Firebase CLI 설치
다음 명령어를 실행해주세요.
```bash
npm install -g firebase-tools
```

<br>

### 3. Firebase 프로젝트 권한이 있는 Google 계정 로그인
다음 명령어를 실행해주세요.
```bash
firebase login
```
명령어 실행 후 잠시 기다리면 Firebase에 연동할 Google 계정을 선택하는 화면이 뜹니다. 이때, 반드시 paeparo.travel@gmail.com 계정을 선택하셔야 합니다.

<br>

## 프로젝트 설정
다음 작업은 git clone 이후 해당 프로젝트 경로에서 진행하시면 됩니다.

### 1. 필요 모듈 설치
다음 명령어를 실행해주세요. 해당 명령어는 프로젝트 폴더의 functions(../PaeParo-Firebase/functions) 안에서 실행해야 합니다. 
```bash
npm install
```

<br>

#### 2. Firebase 프로젝트 연결
다음 명령어를 실행해주세요.
```bash
firebase use paeparo
```

<br>

#### 3. Firebase Functions Emulator 실행
다음 명령어를 실행해주세요.
```bash
npm run start-emulator
```

<br>

## 서비스 이용
위의 모든 과정을 마치면 각자 개인의 Local PC에서 Firebase Functions 서비스를 이용할 수 있습니다. Android Emulator에서 접속할 때는 "10.0.2.2:5001"로 접속해야합니다. Visual Studio Code, 또는 개별 Command 창에서 실행했을 때, 해당 창이 종료되지 않도록 주의해주세요. 창이 종료되면 Local Firebase Functions Emulator도 함께 종료됩니다.
