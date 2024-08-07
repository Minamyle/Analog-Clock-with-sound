const hoursHand = document.getElementById('hours-hand');
const minutesHand = document.getElementById('minutes-hand');
const secondsHand = document.getElementById('seconds-hand');

function updateTime() {
    const currentTime = new Date();

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();
    // console.log({currentMinutes,currentSeconds})

    const hoursDegree = convertHoursToDegree(currentHours, currentMinutes);
    const minutesDegree = convert60sToDegree(currentMinutes);
    const secondsDegree = convert60sToDegree(currentSeconds);

    hoursHand.style.setProperty('transform', `rotate(${hoursDegree}deg)`);
    minutesHand.style.setProperty('transform', `rotate(${minutesDegree}deg)`);
    secondsHand.style.setProperty('transform', `rotate(${secondsDegree}deg)`);

    // Check if the current time is at the top of the hour
    if (currentMinutes === 0 && currentSeconds === 0) {
        alert(`The time is ${currentHours} on the dot!`);
        // Uncomment the following line if you want a beep sound instead of an alert
        beep();
    }
}

function convertHoursToDegree(hours, minutes) {
    const totalHours = hours + minutes / 60;
    const degree = (360 / 12) * totalHours;
    return degree;
}

function convert60sToDegree(value) {
    const degree = (360 / 60) * value;
    return degree;
}

function beep() {
    // Simple beep sound using the Web Audio API
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, context.currentTime); // Frequency in Hz
    oscillator.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5); // Beep duration in seconds
}

updateTime();
setInterval(updateTime, 1000);
