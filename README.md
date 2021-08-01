# 🌡️ 현재 내방 온·습도
<img src="https://user-images.githubusercontent.com/71337000/127744592-22aa57c9-acb7-4bb5-ae05-33268957e88e.gif">

> 요즘 날씨가 너무 더워 방의 온도가 30도 이상이면 에어컨을 틀기로 하였습니다. **[데모 사이트 열기](https://ryujoonsik.github.io/Portfolio02/ "깃허브 페이지로 이동합니다.")**

## :speech_balloon: 소개
백엔드 관련 지식이 부족해 DB와 연동하여 CRUD를 다루어보기로 하였습니다. 구상한 기능들은 **사용자 로그인, 로그아웃, 비밀번호 변경, 회원탈퇴, 온·습도 갱신** 입니다. 

# :star: 목표
### :one: MongoDB 사용하기  
### :two: 아두이노 우노 + DHT11 센서 사용하기  
### :three: Flex 속성 사용하기  

## :books: MongoDB
DB는 MySQL만 사용해 보아서 JS 문법을 사용한다는 MongoDB가 궁금해졌습니다. 직접 사용해 보며 알게된 MySQL과의 차이점은 다음과 같습니다.  

### :open_mouth: MySQL과 차이점
+ MySQL은 스키마를 가지지만 MongoDB는 그렇지 않다.
+ MySQL의 Table, Row, Column는 MongoDB의 Collection, Document, Field로 불린다.
+ MySQL는 기본키, MongoDB는 ObjectID라는 고유한 값의 키를 가진다.
+ MongoDB는 findOne, findOneAndDelete, findOneAndUpdate와 같이 세부적인 메서드로 CRUD를 다룰 수 있다.

### :mouse: Mongoose
MongoDB와 node.js를 연동하기 위해 Mongoose 모듈을 사용했습니다. 사실, Mongoose의 스키마를 가질 수 있다는 특징보다도 mongoDB 모듈이 있는지 모르고 시작했습니다. 다음 프로젝트 때는 mongoDB 모듈을 사용해 보며 차이점을 알아볼 것입니다.

## :computer: 아두이노
날씨가 더워 아두이노 우노와 DHT11를 이용 해 현재 방의 온·습도를 측정 해 보기로 했습니다. SMD 호환보드를 구매해 드라이버를 설치하여 진행했고 데이터는 1초 간격으로 측정되도록 설정하였습니다.

## :triangular_ruler: Flexbox
IE11 지원 종료 소식을 듣고 평소 호환성 때문에 사용 못 했던 Flexbox을 사용해 보았습니다. 우선 중앙 정렬이 편했습니다. 텍스트 컨텐츠의 경우 line-height로 값을 대입 할 필요가 없고 position으로 여러 속성들을 줄 필요도 없었습니다. 아직은 서투르지만 flex 속성을 통해 

# :sparkles: 기능

## 🔑 로그인
🙋‍♂️client-side : input 태그에 입력된 아이디, 패스워드를 form 태그의 submit 이벤트로 GET 메서드 요청을 보내 주었습니다.  
🙆‍♀️server-side : 쿼리 스트링을 분석해 전달받은 아이디, 패스워드를 가지는 다큐먼트가 있는지 findOne 메서드로 조회했습니다. 없을 경우 

