var battery = navigator.battery;
console.log('Battery charging: ', battery.charging); // true
console.log('Battery level: ', battery.level); // 0.58
console.log('Battery discharging time: ', battery.dischargingTime);

// Listen to change events
battery.addEventListener('chargingchange', function(e) {
  console.warn('Battery charge change: ', battery.charging);
}, false);