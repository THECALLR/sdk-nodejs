var callr = require('../lib/callr');

try {
	// initialize instance Callr
	// set your credentials or an Exception will raise
	var api = new callr.api('login', 'password');

	// Basic example
	// Example to send a SMS
	// 1. "call" method: each parameter of the method as an argument

	var options = {
		flash_message: false,
	};

	api.call('sms.send', 'SMS', '+33123456789', 'Hello, world', options).success(function(data) {
		console.log('Response:', data);
	}).error(function(error) {
		console.error("\nError:", error.message);
		console.error('Code:', error.code);
		console.error('Data:', error.data);
	});

	// 2. "send" method: parameter of the method is an array
	var my_array = ['SMS', '+33123456789', 'Hello, world', options];

	api.send('sms.send', my_array).success(function(data) {
		console.log('Response 2:', data);
	}).error(function(error) {
		console.error("\nError:", error.message);
		console.error('Code:', error.code);
		console.error('Data:', error.data);
	});
}
catch (e) {
	console.error('Fatal error');
	console.error(e);
}
