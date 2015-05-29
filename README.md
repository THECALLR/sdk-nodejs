sdk-nodejs
==========

SDK in NodeJS for THECALLR API

## Quick start
Install via NPM

    npm install thecallr

Or get sources from Github

## Init

```javascript
var thecallr = require('thecallr');

var api = new thecallr.api("login", "password");
```

## Usage

**Send an SMS**

* Without options

```javascript
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!');
```

* Personalized sender

Your sender must have been authorized and respect the [sms_sender](http://thecallr.com/docs/formats/#sms_sender) format
```javascript
api.call('sms.send', 'Your Company', '+33123456789', 'Hello world!');
```

* Automatic shortcode

Your sender must have been authorized and respect the [sms_sender](http://thecallr.com/docs/formats/#sms_sender) format
```javascript
api.call('sms.send', '', '+33123456789', 'Hello world!');
```

* Force GSM encoding

```javascript
var optionSMS = {
	force_encoding: 'GSM'
};
api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```

* Long SMS (160+ characters)

```javascript

```

* Specify your SMS type

```javascript
var optionSMS = {
	nature: 'ALERTING'
};
api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```

* Custon data

```javascript
var optionSMS = {
	user_data: '42'
};
api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```

* Delivery Notification

```javascript
var optionSMS = {
	push_dlr_enabled: true,
	push_dlr_url: 'http://yourdomain.com/your_path/',
	// push_dlr_url_auth: 'login:password' // needed if you use Basic HTTP Authentication
};
api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```



See full example in [samples/quickstart.js](samples/quickstart.js)

```javascript
// Set your credentials
var tc = new thecallr.api("login", "password");

// 1. "call" method: each parameter of the method as an argument
tc.call("sms.send", "CALLR", "+33123456789", "Hello, world", {
	flash_message: false
})
	.success(function(data) {
		console.log("Response:", data);
	})
	.error(function(error) {
		console.error("\nError:", error.message);
		console.error("Code:", error.code);
		console.error("Data:", error.data);
	});

// 2. "send" method: parameter of the method is an array
var my_array = ["THECALLR", "+33123456789", "Hello, world", {
	"flash_message": false
}];
tc.send("sms.send", my_array)
	.success(function(data) {
		console.log("Success 2", data);
	})
	.error(function(error) {
		console.error("\nError:", error.message);
		console.error("Code:", error.code);
		console.error("Data:", error.data);
	});
```

## Catch fatal error

```javascript
try {
	var tc = new thecallr.api(42, 42);
}
// Exceptions handler
catch (e) {
	console.error("Fatal error");
	console.error(e);
}
```
