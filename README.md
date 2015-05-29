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

var api = new thecallr.api('login', 'password');
```

## API return value management
Set your success/error callback to get data returned by the API
```javascript
api.call('system.get_timestamp').success(function(response) {
	// success callback
}).error(function(error) {
	// error callback
});
```

## Usage
**Send an SMS**

* Without options

```javascript
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!').success(function(response) {
	// success callback
});
```

* Personalized sender

Your sender must have been authorized and respect the [sms_sender](http://thecallr.com/docs/formats/#sms_sender) format
```javascript
api.call('sms.send', 'Your Brand', '+33123456789', 'Hello world!');
```

* If you want to receive replies, do not set a sender, we will automatically use a shortcode

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

* Long SMS (availability depends on carrier)

```javascript
var text = 'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters';
api.call('sms.send', 'CALLR', '+33123456789', text);
```

* Specify your SMS type

```javascript
var optionSMS = {
	nature: 'ALERTING'
};
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', optionSMS);
```

* Custom data

```javascript
var optionSMS = {
	user_data: '42'
};
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', optionSMS);
```

* Delivery Notification

```javascript
var optionSMS = {
	push_dlr_enabled: true,
	push_dlr_url: 'http://yourdomain.com/push_delivery_path',
	// push_dlr_url_auth: 'login:password' // needed if you use Basic HTTP Authentication
};
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', optionSMS).success(function(response) {
	// success callback
});
```

**Get an SMS**
```javascript
api.call('sms.get', 'SMSHASH').success(function(response) {
	// success callback
});
```

**Get SMS global options**
```javascript
api.call('sms.get_settings').success(function(response) {
	// success callback
});
```
Return an [SMS.settings](http://thecallr.com/docs/objects/#SMS.Settings) object

**Set SMS global options**

Add options that you want to change in the object
```javascript
var options = {
	push_dlr_enabled: true,
	push_dlr_url: 'http://yourdomain.com/push_delivery_path'
};
api.call('sms.set_settings', options).success(function(response) {
	// success callback
});
```
Return the updated [SMS.settings](http://thecallr.com/docs/objects/#SMS.Settings) object

***

**Realtime**

* Create REALTIME app with callback URL

```javascript
var options = {
	url: 'http://yourdomain.com/realtime_callback_url'
};
api.call('app.create', 'REALTIME10', 'Your app name', options).success(function(app) {
	// app.hash will be used for realtime call
});
```

* Start a Real-time outbound call

```javascript
var target = {
	number: '+33132456789',
	timeout: 30
};

var callOptions = {
	cdr_field: '42',
	cli: 'BLOCKED'
}

api.call('dialr/call.realtime', 'appHash', target, callOptions).success(function(callID) {
	// success callback
}).error(function(error) {
	// error callback
});
```

***

**List available countries with DID availability**
```javascript
api.call('did/areacode.countries').success(function(result) {
	//
});
```

**Get area codes available for a specific country and DID type**

Check [did/areacode.get_list](http://thecallr.com/docs/api/services/did/areacode/#did/areacode.get_list) for DID type
```javascript
api.call('did/areacode.get_list', 'US', null).success(function(result) {
	//
});
```

**Get DID types available for a specific country**
```javascript
api.call('did/areacode.types', 'US').success(function(result) {
	//
})
```

***

**Create a conference**

Check [conference/10.create_room](http://thecallr.com/docs/api/services/conference/10/#conference/10.create_room) for details
[params](http://thecallr.com/docs/objects/#CONFERENCE10)
[access](http://thecallr.com/docs/objects/#CONFERENCE10.Room.Access)
```javascript
var params = {
	open: true
}
var access = [];

api.call('conference/10.create_room', 'room name', params, access).success(function(result) {
	//
});
```

* Assign a DID to a room

```javascript
api.call('conference/10.assign_did', 'Room ID', 'DID ID');
```

* Create a PIN protected conference

```javascript
var params = {
	open: true
}
var access = [
	{ pin: '1234', level: 'GUEST' },
	{ pin: '4321', level: 'ADMIN', phone_number: '+33123456789' }
];

api.call('conference/10.create_room', 'room name', params, access).success(function(result) {
	//
});
```

* Call a romm access

```javascript
api.call('conference/10.call_room_access', 'Room Access ID', 'BLOCKED', true).success(function(result) {
	//
});
```


## Fatal error management
```javascript
try {
	api.call('sms.get', 'unknown hash');
} catch (e) {
	console.log('Error\n', e);
}
```
