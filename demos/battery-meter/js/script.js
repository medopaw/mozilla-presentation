
// Yay, no prefix!
btry = navigator.battery || null;

function secToInterval(sec) {
	if (!isFinite(sec)) {
		return '-';
	}
	var hour = String(Math.floor(sec / 3600));
	var min = String(Math.floor(sec % 3600 / 60));
	if (min.length < 2) {
		min = '0' + min;
	}
	return hour + ':' + min;
}

function showBattery() {
	var el = $('article');
	var level = Math.round(btry.level * 100); // level in percentage

	// Build update message, starting with level
	var msg = [level + '%'];
	if (btry.charging) { // Are plugged in?
		if (isFinite(btry.chargingTime)) {
			msg.push('(Charging, ' + secToInterval(btry.chargingTime) + ' until full)');
		} else { // Infinite when fully charged
			msg.push('(Charged)');
		}
	} else {
		msg.push('(On Battery, ' + secToInterval(btry.dischargingTime) + ' remaining)');
	}
	el.text(msg.join(' '));
};

// Only run when API exists
if (btry) {
	// One might be enough, but we go for all of them
	btry.addEventListener('chargingchange', showBattery, false);
	btry.addEventListener('dischargingtimechange', showBattery, false);
	btry.addEventListener('chargingtimechange', showBattery, false)
	btry.addEventListener('levelchange', showBattery, false);

	showBattery();
} else {
	$('article').text('No navigator.battery API');
}
