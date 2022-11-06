# simple_board
## 프로젝트 개요

**Simple Board Rest API 입니다.**

> 게시글 작성, 수정, 삭제, 목록 가져오기 기능을 구현하였습니다. <br>
> 기업에서 제공받은 요구사항을 기반으로 구현하였습니다.
>
## 기술 스택
- Framework: express
- ORM : sequelize
- DB : mysql

## 요구사항 분석
#### 게시글 
- 제목은 최대 20자까지 가능<br>
- 본문은 최대 200자까지 가능
- 비밀번호
  - 최소 6자 이상 입력
  - 숫자 1개 이상 반드시 포함
  - 데이터베이스에 암호화 하여 저장
- salt (암호화를 위한 salt 값 저장) -> 각 게시글 마다 랜덤 생성
#### API
- Create 
    - 비밀번호 설정
    - 이모지 포함 가능
    - 작성 날짜 저장
- Read List
  - 최신 글 순서대로 확인
  - 게시글 중복 불허
  - 20개씩 response
- Update, Delete
  - 비밀번호 입력해야 수정,삭제 가능

## DB Modeling
![image](https://user-images.githubusercontent.com/55984573/200038377-8954f249-a9ed-4948-aae9-655ab06d2161.png)

>-  보통 게시판의 경우 user가 탈퇴하더라도 글은 남아있는 것으로 알고 있어 user_id 값을 null 허용으로 지정하였습니다.
>-  외래키 설정은 SET NULL로 되어있습니다.

## API 문서
자세한 내용은 아래 링크 참조<br>
[POSTMAN DOCS](https://documenter.getpostman.com/view/11539438/2s8YYCuRLP).
|기능구분| 기능  | Method | URL |  auth |
|-------------| ------------- | ------------- |:-------------|:---:| 
| Post | 작성 | POST | /posts  |    |   
|  | 목록 | GET | /posts  | |
|  | 업데이트 | PUT  |/posts/:id|ㅇ|
|  |  삭제  | DELETE |/posts/:id |ㅇ|

 > 

## 구현 과정 
### 프로젝트 초기 세팅 순서
1. npm init
2. express 설치
3. 프로젝트에 필요한 기본적인 모듈 추가
4. env 파일 생성 및 .gitignore 생성
5. eslint, prettierrc 설정
6. app.js 작성
7. 데이터베이스 세팅 

### 데이터베이스 모델 작성
> orm은 typeorm과 sequelize 중 고민하다 javascript 사용 시 sequelize가 typeorm에 비해 정보가 더 많고 model 정의가 더 편리하여 선택하게 되었습니다.
> model 작성 시 sequelize-cli를 사용하여 생성하게 되면 module 방식이 아닌 commonjs 방식으로 생성되어 직접 작성하였고,
> 가독성을 위해 sequelize.define을 사용하는 대신 class 방식으로 작성하였습니다.
> sequelize-cli는 migration 할 때 사용하였습니다.

### 기능 구현
- 예외 처리 시 exception class를 생성하여 error를 던져 exception handler에서 한번에 처리하도록 구현하였습니다.
- database.js 파일에서 모델 초기화 및 associate 설정을 하여 db 변수를 export 하였습니다.
- 비밀번호 암호화는 간단하게 구현하기 위해 node에 내장되어 있는 crypto 모듈을 사용하였고, 더 나은 보안을 위해 salt 값을 사용하였습니다.
- 글 수정, 삭제에 필요한 비밀번호 확인 로직은 authentication 미들웨어를 생성하여 라우터에 연결해주었습니다.
- pagination 기능은 글 중복 방지를 위해 cursor 방식을 사용하였고 최신글 부터 정렬해야하기 때문에 createdAt, id를 cursor로 설정하였습니다.

### 테스트 코드
- unit test를 구현하였고 분기가 있는 로직 위주로 작성하였습니다.

![image](https://user-images.githubusercontent.com/55984573/200032707-246f7095-4991-469f-8bed-faf06e232935.png)

![image](https://user-images.githubusercontent.com/55984573/200032939-887f4759-8360-4a95-8848-acfb423a781d.png)

![image](https://user-images.githubusercontent.com/55984573/200033191-ec9a912f-f53e-445a-b428-bb45e77dc397.png)

## 프로젝트 구조
> - 📂 __test__<br>
> - 📁 route<br>
> - 📁 controller<br>
> - 📁 service<br>
> - 📁 model<br>
> - 📁 db<br>
> - 📁 middleware<br>
> - 📁 util<br>
>   - 📁 exception



## 설치 및 실행 방법
nodejs와 npm이 install 되어있지 않다면 먼저 install 과정 진행
<details>
    <summary> 프로젝트 설치 밀 실행 과정</summary>

<b>1. 프로젝트 clone 및 디렉토리 이동</b>
```bash
git clone https://github.com/PreOnboarding-Team-F/community_service.git
cd community_service
```
<b>2. .env 파일 생성</b>
```bash
PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB=
ALGORITHM=sha512
KEY_STRETCHING=10000
```
<b>3. node package 설치</b>
```javascript
npm install
```
<b>4. 서버 실행</b>
```javascript
npm start
```
</details>

<details>
    <summary>Test 실행 방법</summary>
    
<b>unit test 실행</b>
```javascript
npm run test
```
</details>



