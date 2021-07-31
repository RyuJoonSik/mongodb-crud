/* MongoDB 와 node.js 의 연결을 담당합니다. */
const MONGOOSE = require('mongoose');

function connect() {
  /* 개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인 */
  // if (process.env.NODE_ENV !== 'production') {
  //   MONGOOSE.set('debug', true);
  // }

  MONGOOSE.connect(
    'mongodb://admin:1234@localhost:27017/admin',
    {
      dbName: 'dashBoard',
      /* 두 프로퍼티를 입력하지 않으면 Warning 이 뜬다. */
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (e) => {
      if (e) {
        console.log('MongoDB Connection Fail !', e);
      } else {
        console.log('MongoDB Connection Success !');
      }
    }
  );
}

/* 연결 에러 */
MONGOOSE.connection.on('error', (e) => {
  console.error('MongoDB Connection Error !', e);
});

/* 연결 끊김 */
MONGOOSE.connection.on('disconnected', () => {
  console.error('MongoDB Disconnection Error ! Try connection...');
  connect();
});

module.exports = connect;
