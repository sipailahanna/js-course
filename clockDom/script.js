const fontSizeAdjustment = 20;
const initialClockDiameter = 500;
const input = document.getElementById('radius-input');
const button = document.getElementById('generate-clock');
const clockContainer = document.getElementById('clock-container');
const formContainer = document.getElementById('form-container');

button.addEventListener('click', () => {
  const diameter = parseInt(input.value, 10);
  if (isNaN(diameter) || diameter < 200 || diameter > 800) {
    alert('Diameter must be between 200 and 800 pixels.');
    return;
  }

  clockContainer.innerHTML = '';
  formContainer.style.display = 'none';

  const coeff = parseInt(diameter)/initialClockDiameter;
  generateClock(coeff);
});

function generateClock(coeff) {
  const clockDiameter = initialClockDiameter * coeff;
  const fontSize = `${25 * coeff}px`;
  const clock = document.createElement('div');
  clock.className = 'clock';
  clock.style.width = `${clockDiameter}px`;
  clock.style.height = `${clockDiameter}px`;

  const clockRadius = clockDiameter / 2;
  const numberRadius = clockRadius * 0.8;
  const hours = 12;

  const angleStep = (2 * Math.PI) / hours;
  for (let i = 1; i <= hours; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = clockRadius + numberRadius * Math.cos(angle);
    const y = clockRadius + numberRadius * Math.sin(angle);

    const hour = document.createElement('div');
    hour.className = 'hour';
    hour.textContent = i;
    hour.style.width = `${40 * coeff}px`;
    hour.style.height = `${40 * coeff}px`;
    hour.style.left = `${x}px`;
    hour.style.top = `${y}px`;
    hour.style.fontSize = fontSize;

    clock.appendChild(hour);
  }

  const hourHandWidth = '6px';
  const minuteHandWidth = '4px';
  const secondHandWidth = '2px';
  const hourHandHightCoefficient = 0.5;
  const minuteHandHightCoefficient = 0.7;
  const secondHandHightCoefficient = 0.9;

  const hourHand = createArrow('hour-arrow', clockRadius * hourHandHightCoefficient, hourHandWidth);
  const minuteHand = createArrow('minute-arrow', clockRadius * minuteHandHightCoefficient, minuteHandWidth);
  const secondHand = createArrow('second-arrow', clockRadius * secondHandHightCoefficient, secondHandWidth);

  clock.appendChild(hourHand);
  clock.appendChild(minuteHand);
  clock.appendChild(secondHand);

  const horizontalTimer = createHorizontalTimer(clockRadius / 2, fontSize);
  clock.append(horizontalTimer);

  clockContainer.appendChild(clock);


  updateTime();
}

function createHorizontalTimer(timerHight, fontSize) {
  const timerContainer = document.createElement('div');
  timerContainer.id = 'horizontalTimerContainer';
  timerContainer.style.height = `${timerHight}px`;

  const horizHour = document.createElement('div');
  horizHour.id = 'hour';
  horizHour.style.fontSize = fontSize;
  horizHour.textContent = '00';
  const colon1 = document.createElement('span');
  colon1.textContent = ':';
  colon1.style.fontSize = fontSize;

  const horizMinute = document.createElement('div');
  horizMinute.id = 'minute';
  horizMinute.style.fontSize = fontSize;
  horizMinute.textContent = '00';

  const colon2 = document.createElement('span');
  colon2.textContent = ':';
  colon2.style.fontSize = fontSize;

  const horizSecond = document.createElement('div');
  horizSecond.id = 'second';
  horizSecond.style.fontSize = fontSize;
  horizSecond.textContent = '00';

  // Append elements to the container
  timerContainer.appendChild(horizHour);
  timerContainer.appendChild(colon1);
  timerContainer.appendChild(horizMinute);
  timerContainer.appendChild(colon2);
  timerContainer.appendChild(horizSecond);

  return timerContainer;
}

function createArrow(className, length, width) {
  const arrow = document.createElement('div');
  arrow.className = className;
  arrow.id = className;
  arrow.style.width = width;
  arrow.style.height = `${length}px`;
  return arrow;
}

function updateTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ms = time.getMilliseconds();

    const initialPositionDeg = 180;
    const hourAngle = 360/12 * hours + (hours + minutes/60) + initialPositionDeg; 
    const minutesAngle = 360/60 * minutes + initialPositionDeg;
    const secondsAngle = 360/60 * seconds + initialPositionDeg;
    document.getElementById('hour-arrow').style.transform=`rotate(${hourAngle}deg)`;
    document.getElementById('minute-arrow').style.transform=`rotate(${minutesAngle}deg)`;
    document.getElementById('second-arrow').style.transform=`rotate(${secondsAngle}deg)`;

    document.getElementById('hour').innerText=hours;
    document.getElementById('minute').innerText=minutes;
    document.getElementById('second').innerText=seconds;

    setTimeout(updateTime, 1000 - ms);
}
