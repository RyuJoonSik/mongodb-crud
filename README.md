# 🌡️ 현재 내방 온·습도
<img src="https://user-images.githubusercontent.com/71337000/127744592-22aa57c9-acb7-4bb5-ae05-33268957e88e.gif">

> 요즘 날씨가 너무 더워 방의 온도가 30도 이상이면 에어컨을 틀기로 하였습니다. **[데모 사이트 열기](https://ryujoonsik.github.io/Portfolio02/ "깃허브 페이지로 이동합니다.")**

## :speech_balloon: 소개
백엔드 관련 지식이 부족해 DB와 연동하여 CRUD를 다루어보기로 하였습니다. 구상한 기능들은 **사용자 로그인, 로그아웃, 비밀번호 변경, 회원가입, 회원탈퇴, 온·습도 갱신**입니다. 

## :star: 목표
### :one: MongoDB 사용하기  
### :two: 아두이노 우노, DHT11 센서 사용하기  
### :three: Flex 속성 사용하기  

## :books: MongoDB
DB는 MySQL만 사용해 보아서 JS 문법을 사용한다는 MongoDB가 궁금해졌습니다. 직접 사용해 보며 알게 된 MySQL과의 차이점은 다음과 같습니다.  

### :open_mouth: MySQL과 차이점
+ MySQL은 스키마를 가지지만 MongoDB는 그렇지 않다.
+ MySQL의 Table, Row, Column는 MongoDB의 Collection, Document, Field로 불린다.
+ MySQL는 기본 키, MongoDB는 ObjectID라는 고유한 값의 키를 가진다.
+ MongoDB는 findOne, findOneAndDelete, findOneAndUpdate와 같이 세부적인 메서드로 CRUD를 다룰 수 있다.

### :mouse: Mongoose
MongoDB와 node.js를 연동하기 위해 Mongoose 모듈을 사용했습니다. 사실, Mongoose의 스키마를 가질 수 있다는 특징보다도 mongoDB 모듈이 있는지 모르고 시작했습니다. 다음 프로젝트 때는 mongoDB 모듈을 사용해 보며 차이점을 알아볼 것입니다.

## :computer: 아두이노
실용적인 걸 만들어 보고 싶어 아두이노 우노와 DHT11를 이용해 현재 방의 온·습도를 측정해 보기로 했습니다. SMD 호환 보드를 구매해 드라이버를 설치하여 진행했고 데이터는 1초 간격으로 측정되도록 설정하였습니다.

## :triangular_ruler: Flexbox
IE11 지원 종료 소식을 듣고 평소 호환성 때문에 사용 못 했던 Flexbox을 사용해 보았습니다. 당장에는 텍스트 콘텐츠의 중앙 정렬이 편했다는 점 밖에 기억이 안 나지만, flex 속성을 능숙하게 다룬다면 다양한 레이아웃을 편리하게 다룰 수 있을 것 같습니다.

## :sparkles: 기능
**로그인, 로그아웃, 비밀번호 변경, 회원가입, 회원탈퇴, 온·습도 갱신** 기능들을 구현했습니다. (🙋‍♂️ : client, 🙆‍ : server)

### :lock: 로그인
🙋‍♂️ : '/' 경로로 접속 시 쿠키가 없어 login 페이지가 열립니다. input 태그에 입력된 아이디, 패스워드를 form 태그로 GET 메서드 요청을 보냅니다.  

🙆‍♀️ : 쿼리 스트링을 분석해 전달받은 아이디, 패스워드 필드 값을 가지는 다큐먼트가 있는지 findOne 메서드로 조회합니다. 없으면 login-fail 페이지로, 있으면 쿠키 설정과 함께 '/'로 redirect 시킵니다. 쿠키가 설정되었기 때문에 main 페이지로 응답됩니다.

---
### :unlock: 로그아웃 
🙋‍♂️ : '로그아웃' 버튼 클릭 시 form 태그로 GET 메서드 요청을 보냅니다.  

🙆‍♀️ : 쿠키를 삭제하고 '/'로 redirect 시킵니다. 쿠키가 없기 때문에 login 페이지가 열립니다.

---
### :closed_lock_with_key: 비밀번호 변경
🙋‍♂️ : '비밀번호 변경' 버튼 클릭 시 새 비밀번호를 fetch를 통해 PATCH 메서드 요청을 보냅니다.

🙆‍♀️ : 쿠키에 설정되어 있는 id 값을 조건으로 전달받은 새 패스워드 값을 updateOne 메서드를 통해 수정합니다. 다시 로그인할 수 있도록 쿠키는 삭제합니다.

🙋‍♂️ : 응답이 끝난 후 location.href를 통해 '/'로 요청을 보내고 쿠키가 없기 때문에 로그인 페이지가 열립니다.

---
### :family: 회원가입
🙋‍♂️ : '회원가입' 버튼 클릭 시 input 태그에 입력된 아이디, 패스워드를 form 태그로 POST 메서드 요청을 보냅니다.

🙆‍ : 파라미터의 값들 중 공백이 있거나 중복된 아이디가 있으면 register-fail 페이지로 redirect 시킵니다. 그 외에 create 메서드를 통해 새 다큐먼트를 생성시키고 register-success 페이지로 redirect 시킵니다.

---
### :runner: 회원탈퇴
🙋‍♂️ : '회원 탈퇴' 버튼 클릭 시 fetch를 통해 DELETE 메서드 요청을 보냅니다.

🙆‍♀️ : 쿠키에 설정되어 있는 id 값을 조건으로 deleteOne 메서드를 통해 다큐먼트를 삭제합니다. 로그인 페이지가 열리도록 쿠키는 삭제합니다.

🙋‍♂️ : 응답이 끝난 후 새로 고침을 통해 로그인 페이지가 열립니다.

---
### :chart_with_upwards_trend: 온·습도 갱신
🙆‍ : serialport 모듈을 통해 아두이노와 serial 통신을 합니다. 'data' 이벤트가 발생할 때마다 create 메서드를 통해 온도, 습도, 시간의 필드를 가지는 다큐먼트를 저장합니다.

🙋‍♂️ : main 페이지에 접속하면 1초 간격으로 최근에 측정된 데이터를 GET 메서드로 요청 합니다.

🙆‍ : 요청을 받을 때마다 시간 필드를 기준으로 정렬하여 최근에 생성된 데이터로 응답합니다.

🙋‍♂️ : 응답받은 데이터를 엘리먼트 노드의 텍스트 콘텐츠에 대입시키고, 온·습도 값은 대시보드를 통해서도 확인할 수 있게 합니다.

## :memo: 학습
+ form 태그는 GET, POST만 지원한다. 
+ DELETE, PUT, PATCH 메서드 요청시 AJAX를 사용한다.
+ AJAX로 요청 시 페이지가 redirect 되지않는다.
+ 위의 경우 응답이 끝난 후 브라우저의 location.href를 통해 페이지 이동이 가능하다.

## :sunglasses: 후기
+ Node.js의 기본 모듈로 서버를 구현하기에는 조건문 중첩이 심했습니다. 다음번엔 express로 구현해 볼 것입니다.
+ 보안이 허술한데 이 부분은 express의 미들웨어로 현재보다는 보완할 수 있을 것 같습니다.
+ Flexbox를 통해 하나의 박스를 중앙에 정렬시키고 왼쪽 혹은 오른쪽에 또 다른 박스를 정렬시키려면 결국 position을 썼어야 했습니다. 아직까진 서툴러 꾸준히 사용해 보며 다른 방법이 있는지 찾아보아야겠고 안되면 Grid 레이아웃을 사용해 볼 것입니다.
