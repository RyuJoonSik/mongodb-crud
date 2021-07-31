const HTTP = require('http');
const FS = require('fs');
const QS = require('querystring');
const PATH = require('path');
const URL = require('url');
const ARDUINO = require('./arduino');
const connectDB = require('./db');
const DHT11_MODEL = require('./db/dht11');
const USER_MODEL = require('./db/USER');
const PORT = 8800;
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

function getDBDate() {
  const DATE = new Date();
  const MONTH = DATE.getMonth() + 1;
  const MY_MONTH = MONTH < 10 ? '0' + MONTH : MONTH;
  const DAY = DATE.getDate();
  const MY_DAY = DAY < 10 ? '0' + DAY : DAY;
  const HOUR = DATE.getHours();
  const MY_HOUR = HOUR < 10 ? '0' + HOUR : HOUR;
  const MINUTE = DATE.getMinutes();
  const MY_MINUTE = MINUTE < 10 ? '0' + MINUTE : MINUTE;
  const SECOND = DATE.getSeconds();
  const MY_SECOND = SECOND < 10 ? '0' + SECOND : SECOND;

  return `${DATE.getFullYear()}-${MY_MONTH}-${MY_DAY}-${DATE.getDay()} ${MY_HOUR}:${MY_MINUTE}:${MY_SECOND}`;
}

function getCookies(cookie) {
  if (!cookie) {
    return false;
  }

  const COOKIES = cookie
    .split(';')
    .map((val) => val.split('='))
    .reduce((acc, [key, val2]) => {
      acc[key.trim()] = val2;

      return acc;
    }, {});

  return COOKIES;
}

/* DB 연결 */
connectDB();

/* 아두이노 연결 */
ARDUINO.on('data', (data) => {
  // 새로운 데이터에 대한 이벤트가 발생할 때마다 호출

  const DATAS = data
    .trim()
    .split(' ')
    .map((val) => val.split(':')[1]);

  const HUMIDITY = DATAS[0];
  const TEMPERATURE = DATAS[1];
  const CUR_DATE = getDBDate();

  DHT11_MODEL.create({
    temperature: TEMPERATURE,
    humidity: HUMIDITY,
    createdAt: CUR_DATE,
  });
});

HTTP.createServer((req, res) => {
  try {
    const { url: PATH_NAME, method: METHOD } = req;
    const EXTENSION = PATH.extname(PATH_NAME);

    if (METHOD === 'GET') {
      /* ----------------------------------------------------------------- GET ----------------------------------------------------------------- */
      try {
        const COOKIES = getCookies(req.headers.cookie);
        const LOGIN_STATE = Number(COOKIES.loginState);

        if (PATH_NAME === '/') {
          if (LOGIN_STATE) {
            const DATA = FS.readFileSync('./html/main.html', 'utf-8');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

            return res.end(DATA);
          } else {
            const DATA = FS.readFileSync('./html/login-form.html', 'utf-8');

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

            return res.end(DATA);
          }
        } else if (PATH_NAME.startsWith('/login')) {
          /* ----------------------------------------------------------------- 로그인 ----------------------------------------------------------------- */
          const DATA = PATH_NAME.split('?')[1]
            .split('&')
            .map((val) => val.split('='))
            .reduce((acc, [key, val]) => {
              acc[key] = val;

              return acc;
            }, {});

          USER_MODEL.findOne({ id: DATA.userID, password: DATA.userPassword })
            .then((id) => {
              if (id === null) {
                /* 실패 */
                res.writeHead(302, {
                  Location: '/html/login-fail.html',
                });

                return res.end();
              } else {
                /* 성공 */
                const EXPIRE = new Date();
                EXPIRE.setMinutes(EXPIRE.getMinutes() + 10);

                res.writeHead(302, {
                  Location: '/',
                  'Set-Cookie': [
                    `loginState=1; Expires=${EXPIRE.toUTCString()}; HttpOnlyl Path=/`,
                    `userID=${DATA.userID}; Expires=${EXPIRE.toUTCString()}; HttpOnlyl Path=/`,
                  ],
                });

                return res.end();
              }
            })
            .catch((e) => console.log(e));
        } else if (PATH_NAME === '/logout') {
          res.writeHead(302, {
            Location: '/',
            'Set-Cookie': [`loginState=0; Max-age=0; HttpOnlyl Path=/`],
          });

          return res.end();
        } else if (PATH_NAME === '/getSensorData') {
          DHT11_MODEL.findOne({}, { _id: 0, __v: 0 })
            .sort({ createdAt: -1 })
            .then((data) => {
              const DATA = data;

              res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

              const DATA_JSON = JSON.stringify(DATA);

              return res.end(DATA_JSON);
            });
        } else if (EXTENSION) {
          if (PATH_NAME === '/html/main.html') {
            res.writeHead(302, {
              Location: '/',
            });

            return res.end();
          }

          const DATA = FS.readFileSync(`.${PATH_NAME}`, 'utf-8');

          res.writeHead(200, { 'Content-Type': MIME[EXTENSION] + '; charset=utf-8' });

          return res.end(DATA);
        } else {
          throw Error();
        }
      } catch (error) {
        console.log(error);
        res.writeHead(404);

        return res.end();
      }
    } else if (METHOD === 'POST') {
      /* ----------------------------------------------------------------- POST ----------------------------------------------------------------- */
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      if (PATH_NAME === '/register') {
        /* ----------------------------------------------------------------- 회원가입 ----------------------------------------------------------------- */
        req.on('end', () => {
          const POST = QS.parse(data);
          const { userID, userPassword } = POST;

          if (userID === '' || userPassword === '') {
            /* 실패 */
            res.writeHead(302, {
              Location: '/html/register-fail.html',
            });

            return res.end();
          } else {
            USER_MODEL.findOne({ id: userID, password: userPassword })
              .then((id) => {
                if (id === null) {
                  /* 성공 */
                  USER_MODEL.create({
                    id: userID,
                    password: userPassword,
                  });

                  res.writeHead(302, {
                    Location: '/html/register-success.html',
                  });

                  return res.end();
                } else {
                  /* 실패 */
                  res.writeHead(302, {
                    Location: '/html/register-fail.html',
                  });

                  return res.end();
                }
              })
              .catch((e) => console.log(e));
          }
        });
      }
    } else if (METHOD === 'DELETE') {
      if (PATH_NAME === '/deleteUser') {
        const COOKIES = getCookies(req.headers.cookie);
        const USER_ID = COOKIES.userID;

        USER_MODEL.deleteOne({ id: USER_ID }).then(() => {
          res.writeHead(200, {
            'Set-Cookie': [`loginState=0; Max-age=0; HttpOnlyl Path=/`, `userID=0; Max-age=0; HttpOnlyl Path=/`],
          });

          return res.end('회원 탈퇴 되었습니다.');
        });
      }
    } else if (METHOD === 'PATCH') {
      if (PATH_NAME.startsWith('/update')) {
        const COOKIES = getCookies(req.headers.cookie);
        const USER_ID = COOKIES.userID;
        const DATA = PATH_NAME.split('?')[1]
          .split('&')
          .map((val) => val.split('='))
          .reduce((acc, [key, val]) => {
            acc[key] = val;

            return acc;
          }, {});

        USER_MODEL.updateOne({ id: USER_ID }, { $set: { password: DATA.newPassword } }).then(() => {
          res.writeHead(200, {
            'Set-Cookie': [`loginState=0; Max-age=0; HttpOnlyl Path=/`, `userID=0; Max-age=0; HttpOnlyl Path=/`],
          });
          return res.end('비밀번호 변경 되었습니다.');
        });
        // req.on('end', () => {
        //   const POST = QS.parse(data);
        //   const { newPassword } = POST;
        //   console.log(newPassword);
        // });
      }
      // const COOKIES = getCookies(req.headers.cookie);
      // const USER_ID = COOKIES.userID;
    }
  } catch (error) {
    console.error(error);
  }
}).listen(PORT);
