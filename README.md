sdk-nodejs
==========

SDK in NodeJS for CALLR API
For more examples see the the nodejs examples (https://github.com/THECALLR/examples-nodejs) repo.

## Quick start
Install via NPM

    npm install callr

Or get sources from Github

## Authenticating for older SDK versions 1.x
* Please see the documentation [here](#authentication-for-older-versions) for how to authenticate using older `1.x` versions of the SDK.

## Different methods of authentication

When you initialise the callr api object with your chosen authentication method, you can also pass in any options like the following:
```javascript
var options = {
    ...
}
var callr = require('callr');
var api = new callr.api(<authentication method>, options);
...
```

### Init with login and password
```javascript
var callr = require('callr');
var api = new callr.api(callr.loginPasswordAuth('login', 'password'));
```

### Init with Api-Key token
* see [https://www.callr.com/docs/api/services/api-key/](https://www.callr.com/docs/api/services/api-key/)

```javascript
var callr = require('callr');
var api = new callr.api(callr.apiKeyAuth('987654321abcdef987654321abcdef987654321abcdef987654321abcdef987654321abcdef987654321abcdef987654321a'));
```

### Init with User session token
* see [https://www.callr.com/docs/api/services/session/](https://www.callr.com/docs/api/services/session/)

```javascript
var callr = require('callr');
var api = new callr.api(callr.userSessionAuth('987654321abcdef987654321abcdef987654321a'));
```

### Init with Login As

```javascript
var callr = require('callr');
var options = {
    loginas: {
        type: 'user',       // available types: user, account
        target: '<login>'   // available targets: <login> for type user,
    }                       // <hash> for type account
}

var api = new callr.api(callr.loginPasswordAuth('login', 'password'), options);
```

## Set Login As after Init

```javascript
var callr = require('callr');
var api = new callr.api('login', 'password');
...

api.setLoginAs('user', '<login>'); // available types: user, account
                                   // available targets: <login> for type user,
                                   // <hash> for type account
```

## API return value management
> Set your success/error callback to get data returned by the API

```javascript
api.call('system.get_timestamp').success(function(response) {
    // success callback
}).error(function(error) {
    // error callback
});
```

## Usage
### Sending SMS

#### Without options

```javascript
api.call('sms.send', 'SMS', '+33123456789', 'Hello world!', null).success(function(response) {
    // success callback
});
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

#### Personalized sender

> Your sender must have been authorized and respect the [sms_sender](http://www.callr.com/docs/formats/#sms_sender) format

```javascript
api.call('sms.send', 'Your Brand', '+33123456789', 'Hello world!', null);
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

#### If you want to receive replies, do not set a sender - we will automatically use a shortcode

```javascript
api.call('sms.send', '', '+33123456789', 'Hello world!', null);
```

*Method*
- [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

#### Force GSM encoding

```javascript
var optionSMS = { force_encoding: 'GSM' };

api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://www.callr.com/docs/objects/#SMS.Options)

#### Long SMS (availability depends on carrier)

```javascript
var text = 'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters';
api.call('sms.send', 'SMS', '+33123456789', text, null);
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

#### Specify your SMS nature (alerting or marketing)

```javascript
var optionSMS = { nature: 'ALERTING' };

api.call('sms.send', 'SMS', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://www.callr.com/docs/objects/#SMS.Options)

#### Custom data

```javascript
var optionSMS = { user_data: '42' };

api.call('sms.send', 'SMS', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://www.callr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://www.callr.com/docs/objects/#SMS.Options)

#### Delivery Notification - set webhook URL to receive notifications
```javascript
var optionSMS = {
    webhook: {
        endpoint: 'http://yourdomain.com/webhook_endpoint'
    }
};

api.call('sms.send', 'SMS', '+33123456789', 'Hello world!', optionSMS).success(function(response) {
    // success callback
});
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)
* [Webhook](https://www.callr.com/docs/objects/#Webhook)

### Inbound SMS - set webhook endpoint to receive inbound messages (MO) and replies

> **Do not set a sender if you want to receive replies** - we will automatically use a shortcode.

```javascript
var optionSMS = {
    webhook: {
        endpoint: 'http://yourdomain.com/webhook_endpoint'
    }
};

api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS).success(function(response) {
    // success callback
});
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)
* [Webhook](https://www.callr.com/docs/objects/#Webhook)

### Get an SMS

```javascript
api.call('sms.get', 'SMSHASH').success(function(response) {
    // success callback
});
```

*Method*
* [sms.get](http://www.callr.com/docs/api/services/sms/#sms.get)

*Objects*
* [SMS](http://www.callr.com/docs/objects/#SMS)


***

### REALTIME

#### Create a REALTIME app with a callback URL

```javascript
var options = {
    url: 'http://yourdomain.com/realtime_callback_url'
};

api.call('apps.create', 'REALTIME10', 'Your app name', options).success(function(app) {
    // app.hash will be used for realtime call
});
```

*Method*
* [apps.create](http://www.callr.com/docs/api/services/apps/#apps.create)

*Objects*
* [REALTIME10](http://www.callr.com/docs/objects/#REALTIME10)
* [App](http://www.callr.com/docs/objects/#App)

#### Start a REALTIME outbound call

```javascript
var target = {
    number: '+33132456789',
    timeout: 30
};

var callOptions = {
    cdr_field: '42',
    cli: 'BLOCKED'
};

api.call('dialr/call.realtime', 'appHash', target, callOptions).success(function(callID) {
    // success callback
}).error(function(error) {
    // error callback
});
```

*Method*
* [dialr/call.realtime](http://www.callr.com/docs/api/services/dialr/call/#dialr/call.realtime)

*Objects*
* [Target](http://www.callr.com/docs/objects/#Target)
* [REALTIME10.Call.Options](http://www.callr.com/docs/objects/#REALTIME10.Call.Options)

#### Inbound Calls - Assign a phone number to a REALTIME app

```javascript
api.call('apps.assign_did', 'appHash', 'DID ID').success(function(result) {
    //
});
```

*Method*
* [apps.assign_did](http://www.callr.com/docs/api/services/apps/#apps.assign_did)

*Objects*
* [App](http://www.callr.com/docs/objects/#App)
* [DID](http://www.callr.com/docs/objects/#DID)

***

### DIDs

#### List available countries with DID availability

```javascript
api.call('did/areacode.countries').success(function(result) {
    //
});
```

*Method*
* [did/areacode.countries](http://www.callr.com/docs/api/services/did/areacode/#did/areacode.countries)

*Objects*
* [DID.Country](http://www.callr.com/docs/objects/#DID.Country)

#### Get area codes available for a specific country and DID type

```javascript
api.call('did/areacode.get_list', 'US', null).success(function(result) {
    //
});
```

*Method*
* [did/areacode.get_list](http://www.callr.com/docs/api/services/did/areacode/#did/areacode.get_list)

*Objects*
* [DID.AreaCode](http://www.callr.com/docs/objects/#DID.AreaCode)

#### Get DID types available for a specific country

```javascript
api.call('did/areacode.types', 'US').success(function(result) {
    //
});
```

*Method*
* [did/areacode.types](http://www.callr.com/docs/api/services/did/areacode/#did/areacode.types)

*Objects*
* [DID.Type](http://www.callr.com/docs/objects/#DID.Type)

#### Buy a DID (after a reserve)

```javascript
api.call('did/store.buy_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.buy_order](http://www.callr.com/docs/api/services/did/store/#did/store.buy_order)

*Objects*
* [DID.Store.BuyStatus](http://www.callr.com/docs/objects/#DID.Store.BuyStatus)

#### Cancel your order (after a reserve)

```javascript
api.call('did/store.cancel_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.cancel_order](http://www.callr.com/docs/api/services/did/store/#did/store.cancel_order)

#### Cancel a DID subscription

```javascript
api.call('did/store.cancel_subscription', 'DID ID').success(function(result) {
    //
});
```

*Method*
* [did/store.cancel_subscription](http://www.callr.com/docs/api/services/did/store/#did/store.cancel_subscription)

#### View your store quota status

```javascript
api.call('did/store.get_quota_status').success(function(result) {
    //
});
```

*Method*
* [did/store.get_quota_status](http://www.callr.com/docs/api/services/did/store/#did/store.get_quota_status)

*Objects*
* [DID.Store.QuotaStatus](http://www.callr.com/docs/objects/#DID.Store.QuotaStatus)

#### Get a quote without reserving a DID

```javascript
api.call('did/store.get_quote', 0, 'GOLD', 1).success(function(result) {
    //
});
```

*Method*
* [did/store.get_quote](http://www.callr.com/docs/api/services/did/store/#did/store.get_quote)

*Objects/
* [DID.Store.Quote](http://www.callr.com/docs/objects/#DID.Store.Quote)

#### Reserve a DID

```javascript
api.call('did/store.reserve', 0, 'GOLD', 1, 'RANDOM').success(function(result) {
    //
});
```

*Method*
* [did/store.reserve](http://www.callr.com/docs/api/services/did/store/#did/store.reserve)

*Objects*
* [DID.Store.Reservation](http://www.callr.com/docs/objects/#DID.Store.Reservation)

#### View your order

```javascript
api.call('did/store.view_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.buy_order](http://www.callr.com/docs/api/services/did/store/#did/store.view_order)

*Objects*
* [DID.Store.Reservation](http://www.callr.com/docs/objects/#DID.Store.Reservation)

***

### Conferencing

#### Create a conference room

```javascript
var params = { open: true };
var access = [];

api.call('conference/10.create_room', 'room name', params, access).success(function(result) {
    //
});
```

*Method*
* [conference/10.create_room](http://www.callr.com/docs/api/services/conference/10/#conference/10.create_room)

*Objects*
* [CONFERENCE10](http://www.callr.com/docs/objects/#CONFERENCE10)
* [CONFERENCE10.Room.Access](http://www.callr.com/docs/objects/#CONFERENCE10.Room.Access)

#### Assign a DID to a room

```javascript
api.call('conference/10.assign_did', 'Room ID', 'DID ID');
```

*Method*
* [conference/10.assign_did](http://www.callr.com/docs/api/services/conference/10/#conference/10.assign_did)

#### Create a PIN protected conference room

```javascript
var params = { open: true };
var access = [
    { pin: '1234', level: 'GUEST' },
    { pin: '4321', level: 'ADMIN', phone_number: '+33123456789' }
];

api.call('conference/10.create_room', 'room name', params, access).success(function(result) {
    //
});
```

*Method*
* [conference/10.create_room](http://www.callr.com/docs/api/services/conference/10/#conference/10.create_room)

*Objects*
* [CONFERENCE10](http://www.callr.com/docs/objects/#CONFERENCE10)
* [CONFERENCE10.Room.Access](http://www.callr.com/docs/objects/#CONFERENCE10.Room.Access)

#### Call a room access

```javascript
api.call('conference/10.call_room_access', 'Room Access ID', 'BLOCKED', true).success(function(result) {
    //
});
```

*Method*
* [conference/10.call_room_access](http://www.callr.com/docs/api/services/conference/10/#conference/10.call_room_access)

***

### Media

#### List your medias

```javascript
api.call('media/library.get_list', null).success(function(result) {
    //
});
```

*Method*
* [media/library.get_list](http://www.callr.com/docs/api/services/media/library/#media/library.get_list)

#### Create an empty media

```javascript
api.call('media/library.create', 'name').success(function(media_id) {
    //
});
```

*Method*
* [media/library.create](http://www.callr.com/docs/api/services/media/library/#media/library.create)

#### Upload a media

```javascript
var media_id = 0;

api.call('media/library.set_content', media_id, 'text', 'base64_audio_data').success(function(result) {
    //
});
```

*Method*
* [media/library.set_content](http://www.callr.com/docs/api/services/media/library/#media/library.set_content)

#### Use Text-to-Speech

```javascript
var media_id = 0;

api.call('media/tts.set_content', media_id, 'Hello world!', 'TTS-EN-GB_SERENA', null).success(function(result) {
    //
});
```

*Method*
* [media/tts.set_content](http://www.callr.com/docs/api/services/media/tts/#media/tts.set_content)

***

### CDR

#### Get inbound or outbound CDRs

```javascript
var from = 'YYYY-MM-DD HH:MM:SS';
var to = 'YYYY-MM-DD HH:MM:SS';

api.call('cdr.get', 'OUT', from, to, null, null).success(function(result) {
    //
});
```

*Method*
* [cdr.get](http://www.callr.com/docs/api/services/cdr/#cdr.get)

*Objects*
* [CDR.In](http://www.callr.com/docs/objects/#CDR.In)
* [CDR.Out](http://www.callr.com/docs/objects/#CDR.Out)


***

### SENDR

#### Broadcast messages to a target

```javascript
var target = {
    number: '+33123456789',
    timeout: 30
};

var messages = [131, 132, 'TTS|TTS_EN-GB_SERENA|Hello world! how are you ? I hope you enjoy this call. good bye.'];

var options = {
    cdr_field: 'userData',
    cli: 'BLOCKED',
    loop: 2
};

api.call('sendr/simple.broadcast_1', target, messages, options).success(function(result) {
    //
});
```

##### Without options

```javascript
var target = {
    number: '+33123456789',
    timeout: 30
};

var messages = [131, 132, 134];

api.call('sendr/simple.broadcast_1', target, messages, null).success(function(result) {
    //
});
```

*Method*
* [sendr/simple.broadcast_1](http://www.callr.com/docs/api/services/sendr/simple/#sendr/simple.broadcast_1)

*Objects*
* [Target](http://www.callr.com/docs/objects/#Target)
* [SENDR.Simple.Broadcast1.Options](http://www.callr.com/docs/objects/#SENDR.Simple.Broadcast1.Options)

***

## Fatal error management
```javascript
try {
    api.call('sms.get', 'unknown hash');
} catch (e) {
    console.log('Error\n', e);
}
```

## Authentication for older versions
* Deprecated method for authenticating with `1.x` versions of the SDK.

For authenticating with older versions of the API SDK can be done the following way:
```javascript
var callr = require('callr');
var api = new callr.api('login', 'password');
...
```

Or when passing options
```javascript
var callr = require('callr');
var options = {
    loginas: {
        type: 'user',       // available types: user, account
        target: '<login>'   // available targets: <login> for type user,
    }                       // <hash> for type account
}

var api = new callr.api('login', 'password', options);
...
```

---

