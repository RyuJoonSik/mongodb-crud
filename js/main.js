import Dashboard from './canvas/dashboard.js';

const CANVAS_TEMP = 'dashboard-temp';
const CANVAS_HUM = 'dashboard-hum';
const DASHBOARD_TEMP = new Dashboard(CANVAS_TEMP, '온도');
const DASHBOARD_HUM = new Dashboard(CANVAS_HUM, '습도');
const TEMP_VAL = document.getElementById('tempVal');
const HUM_VAL = document.getElementById('humVal');
const CUR_TIME = document.getElementsByClassName('footer_time')[0];

DASHBOARD_TEMP.init();
DASHBOARD_HUM.init();
DASHBOARD_TEMP.setValue(30);
DASHBOARD_HUM.setValue(50);
DASHBOARD_TEMP.drawMeter();
DASHBOARD_HUM.drawMeter();

setInterval(() => {
  fetch('/getSensorData')
    .then((res) => res.json())
    .then((data) => {
      const { temperature: TEMP, humidity: HUM, createdAt: TIME } = data;

      DASHBOARD_TEMP.setValue(Number(TEMP));
      DASHBOARD_HUM.setValue(Number(HUM));
      DASHBOARD_TEMP.drawMeter();
      DASHBOARD_HUM.drawMeter();

      TEMP_VAL.textContent = TEMP + '℃';
      HUM_VAL.textContent = HUM + '%';

      const [YEAR, MONTH, DAY, DOW] = TIME.split(' ')[0].split('-');
      const [HOUR, MINUTE, SECOND] = TIME.split(' ')[1].split(':');

      let dayOfWeek = '';

      switch (DOW * 1) {
        case 0:
          dayOfWeek = '일';
          break;
        case 1:
          dayOfWeek = '월';
          break;
        case 2:
          dayOfWeek = '화';
          break;
        case 3:
          dayOfWeek = '수';
          break;
        case 4:
          dayOfWeek = '목';
          break;
        case 5:
          dayOfWeek = '금';
          break;
        case 6:
          dayOfWeek = '토';
          break;
      }

      CUR_TIME.textContent = `${YEAR}년 ${MONTH}월 ${DAY}일 ${dayOfWeek}요일 ${HOUR}시 ${MINUTE}분 ${SECOND}초`;
    })
    .catch((e) => console.log(e));
}, 1000);

window.addEventListener('resize', () => {
  DASHBOARD_TEMP.init();
  DASHBOARD_HUM.init();
  DASHBOARD_TEMP.drawMeter();
  DASHBOARD_HUM.drawMeter();
});

const BTN_DELETE = document.getElementById('btnDelete');

BTN_DELETE.addEventListener('click', () => {
  fetch('/deleteUser', { method: 'DELETE' })
    .then((res) => res.text())
    .then((res) => {
      alert(res);
      location.reload();
    })
    .catch((e) => console.log(e));
});
