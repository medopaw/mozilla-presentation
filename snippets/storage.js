sessionStorage.setItem('username', 'digitarald');
if (sessionStorage.getItem('username')) {
  alert('Welcome ' + sessionStorage.setItem('username'));
}

// More data
localStorage.setItem('profile', JSON.stringify(profile));
// Reading JSON
var profile = JSON.parse(localStorage.getItem('profile'));

// On logout ...
localStorage.removeItem('profile');
// or
localStorage.clear();