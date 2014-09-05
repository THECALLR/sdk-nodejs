sdk-nodejs
==========

SDK in NodeJS for THECALLR API

## Quick start
Install via NPM

    npm install thecallr

Or get sources from Github

## Initialize your code

```javascript
var thecallr = require('thecallr');
```

## Basic Example (Send SMS)
See full example in [samples/quickstart.js](samples/quickstart.js)

```javascript
// Set your credentials
var tc = new thecallr.api("login", "password");

// 1. "call" method: each parameter of the method as an argument
tc.call("sms.send", "THECALLR", "+33123456789", "Hello, world", {
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
