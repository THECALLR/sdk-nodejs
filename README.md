sdk-nodejs
==========

SDK in NodeJS for CALLR API

## Quick start
Install via NPM

    npm install callr

Or get sources from Github

## Init

```javascript
var callr = require('callr');

var api = new callr.api('login', 'password');
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
api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', null).success(function(response) {
    // success callback
});
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

#### Personalized sender

> Your sender must have been authorized and respect the [sms_sender](http://thecallr.com/docs/formats/#sms_sender) format

```javascript
api.call('sms.send', 'Your Brand', '+33123456789', 'Hello world!', null);
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

#### If you want to receive replies, do not set a sender - we will automatically use a shortcode

```javascript
api.call('sms.send', '', '+33123456789', 'Hello world!', null);
```

*Method*
- [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

#### Force GSM encoding

```javascript
var optionSMS = { force_encoding: 'GSM' };

api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)

#### Long SMS (availability depends on carrier)

```javascript
var text = 'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters ' +
           'Some super mega ultra long text to test message longer than 160 characters';
api.call('sms.send', 'CALLR', '+33123456789', text, null);
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

#### Specify your SMS nature (alerting or marketing)

```javascript
var optionSMS = { nature: 'ALERTING' };

api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)

#### Custom data

```javascript
var optionSMS = { user_data: '42' };

api.call('sms.send', 'CALLR', '+33123456789', 'Hello world!', optionSMS);
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)


#### Delivery Notification - set URL to receive notifications

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

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)


### Inbound SMS - set URL to receive inbound messages (MO) and replies

> **Do not set a sender if you want to receive replies** - we will automatically use a shortcode.

```javascript
var optionSMS = {
    push_mo_enabled: true,
    push_mo_url: 'http://yourdomain.com/mo_delivery_path',
    // push_mo_url_auth: 'login:password' // needed if you use Basic HTTP Authentication
};

api.call('sms.send', '', '+33123456789', 'Hello world!', optionSMS).success(function(response) {
    // success callback
});
```

*Method*
* [sms.send](http://thecallr.com/docs/api/services/sms/#sms.send)

*Objects*
* [SMS.Options](http://thecallr.com/docs/objects/#SMS.Options)


### Get an SMS

```javascript
api.call('sms.get', 'SMSHASH').success(function(response) {
    // success callback
});
```

*Method*
* [sms.get](http://thecallr.com/docs/api/services/sms/#sms.get)

*Objects*
* [SMS](http://thecallr.com/docs/objects/#SMS)

### SMS Global Settings

#### Get settings

```javascript
api.call('sms.get_settings').success(function(response) {
    // success callback
});
```

*Method*
* [sms.get_settings](http://thecallr.com/docs/api/services/sms/#sms.get_settings)

*Objects*
* [SMS.settings](http://thecallr.com/docs/objects/#SMS.Settings)


#### Set settings

> Add options that you want to change in the object

```javascript
var settings = {
    push_dlr_enabled: true,
    push_dlr_url: 'http://yourdomain.com/push_delivery_path',
    push_mo_enabled: true,
    push_mo_url: 'http://yourdomain.com/mo_delivery_path'
};

api.call('sms.set_settings', settings).success(function(response) {
    // success callback
});
```

> Returns the updated settings.

*Method*
* [sms.set_settings](http://thecallr.com/docs/api/services/sms/#sms.set_settings)

*Objects*
* [SMS.settings](http://thecallr.com/docs/objects/#SMS.Settings)

********************************************************************************

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
* [apps.create](http://thecallr.com/docs/api/services/apps/#apps.create)

*Objects*
* [REALTIME10](http://thecallr.com/docs/objects/#REALTIME10)
* [App](http://thecallr.com/docs/objects/#App)

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
* [dialr/call.realtime](http://thecallr.com/docs/api/services/dialr/call/#dialr/call.realtime)

*Objects*
* [Target](http://thecallr.com/docs/objects/#Target)
* [REALTIME10.Call.Options](http://thecallr.com/docs/objects/#REALTIME10.Call.Options)

#### Inbound Calls - Assign a phone number to a REALTIME app

```javascript
api.call('apps.assign_did', 'appHash', 'DID ID').success(function(result) {
    //
});
```

*Method*
* [apps.assign_did](http://thecallr.com/docs/api/services/apps/#apps.assign_did)

*Objects*
* [App](http://thecallr.com/docs/objects/#App)
* [DID](http://thecallr.com/docs/objects/#DID)

********************************************************************************

### DIDs

#### List available countries with DID availability

```javascript
api.call('did/areacode.countries').success(function(result) {
    //
});
```

*Method*
* [did/areacode.countries](http://thecallr.com/docs/api/services/did/areacode/#did/areacode.countries)

*Objects*
* [DID.Country](http://thecallr.com/docs/objects/#DID.Country)

#### Get area codes available for a specific country and DID type

```javascript
api.call('did/areacode.get_list', 'US', null).success(function(result) {
    //
});
```

*Method*
* [did/areacode.get_list](http://thecallr.com/docs/api/services/did/areacode/#did/areacode.get_list)

*Objects*
* [DID.AreaCode](http://thecallr.com/docs/objects/#DID.AreaCode)

#### Get DID types available for a specific country

```javascript
api.call('did/areacode.types', 'US').success(function(result) {
    //
});
```

*Method*
* [did/areacode.types](http://thecallr.com/docs/api/services/did/areacode/#did/areacode.types)

*Objects*
* [DID.Type](http://thecallr.com/docs/objects/#DID.Type)

#### Buy a DID (after a reserve)

```javascript
api.call('did/store.buy_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.buy_order](http://thecallr.com/docs/api/services/did/store/#did/store.buy_order)

*Objects*
* [DID.Store.BuyStatus](http://thecallr.com/docs/objects/#DID.Store.BuyStatus)

#### Cancel your order (after a reserve)

```javascript
api.call('did/store.cancel_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.cancel_order](http://thecallr.com/docs/api/services/did/store/#did/store.cancel_order)

#### Cancel a DID subscription

```javascript
api.call('did/store.cancel_subscription', 'DID ID').success(function(result) {
    //
});
```

*Method*
* [did/store.cancel_subscription](http://thecallr.com/docs/api/services/did/store/#did/store.cancel_subscription)

#### View your store quota status

```javascript
api.call('did/store.get_quota_status').success(function(result) {
    //
});
```

*Method*
* [did/store.get_quota_status](http://thecallr.com/docs/api/services/did/store/#did/store.get_quota_status)

*Objects*
* [DID.Store.QuotaStatus](http://thecallr.com/docs/objects/#DID.Store.QuotaStatus)

#### Get a quote without reserving a DID

```javascript
api.call('did/store.get_quote', 0, 'GOLD', 1).success(function(result) {
    //
});
```

*Method*
* [did/store.get_quote](http://thecallr.com/docs/api/services/did/store/#did/store.get_quote)

*Objects/
* [DID.Store.Quote](http://thecallr.com/docs/objects/#DID.Store.Quote)

#### Reserve a DID

```javascript
api.call('did/store.reserve', 0, 'GOLD', 1, 'RANDOM').success(function(result) {
    //
});
```

*Method*
* [did/store.reserve](http://thecallr.com/docs/api/services/did/store/#did/store.reserve)

*Objects*
* [DID.Store.Reservation](http://thecallr.com/docs/objects/#DID.Store.Reservation)

#### View your order

```javascript
api.call('did/store.view_order', 'OrderToken').success(function(result) {
    //
});
```

*Method*
* [did/store.buy_order](http://thecallr.com/docs/api/services/did/store/#did/store.view_order)

*Objects*
* [DID.Store.Reservation](http://thecallr.com/docs/objects/#DID.Store.Reservation)

********************************************************************************

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
* [conference/10.create_room](http://thecallr.com/docs/api/services/conference/10/#conference/10.create_room)

*Objects*
* [CONFERENCE10](http://thecallr.com/docs/objects/#CONFERENCE10)
* [CONFERENCE10.Room.Access](http://thecallr.com/docs/objects/#CONFERENCE10.Room.Access)

#### Assign a DID to a room

```javascript
api.call('conference/10.assign_did', 'Room ID', 'DID ID');
```

*Method*
* [conference/10.assign_did](http://thecallr.com/docs/api/services/conference/10/#conference/10.assign_did)

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
* [conference/10.create_room](http://thecallr.com/docs/api/services/conference/10/#conference/10.create_room)

*Objects*
* [CONFERENCE10](http://thecallr.com/docs/objects/#CONFERENCE10)
* [CONFERENCE10.Room.Access](http://thecallr.com/docs/objects/#CONFERENCE10.Room.Access)

#### Call a room access

```javascript
api.call('conference/10.call_room_access', 'Room Access ID', 'BLOCKED', true).success(function(result) {
    //
});
```

*Method*
* [conference/10.call_room_access](http://thecallr.com/docs/api/services/conference/10/#conference/10.call_room_access)

********************************************************************************

### Media

#### List your medias

```javascript
api.call('media/library.get_list', null).success(function(result) {
    //
});
```

*Method*
* [media/library.get_list](http://thecallr.com/docs/api/services/media/library/#media/library.get_list)

#### Create an empty media

```javascript
api.call('media/library.create', 'name').success(function(media_id) {
    //
});
```

*Method*
* [media/library.create](http://thecallr.com/docs/api/services/media/library/#media/library.create)

#### Upload a media

```javascript
var media_id = 0;

api.call('media/library.set_content', media_id, 'text', 'base64_audio_data').success(function(result) {
    //
});
```

*Method*
* [media/library.set_content](http://thecallr.com/docs/api/services/media/library/#media/library.set_content)

#### Use Text-to-Speech

```javascript
var media_id = 0;

api.call('media/tts.set_content', media_id, 'Hello world!', 'TTS-EN-GB_SERENA', null).success(function(result) {
    //
});
```

*Method*
* [media/tts.set_content](http://thecallr.com/docs/api/services/media/tts/#media/tts.set_content)

********************************************************************************

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
* [cdr.get](http://thecallr.com/docs/api/services/cdr/#cdr.get)

*Objects*
* [CDR.In](http://thecallr.com/docs/objects/#CDR.In)
* [CDR.Out](http://thecallr.com/docs/objects/#CDR.Out)


********************************************************************************

### SENDR

#### Broadcast messages to a target (BETA)

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
* [sendr/simple.broadcast_1](http://thecallr.com/docs/api/services/sendr/simple/#sendr/simple.broadcast_1)

*Objects*
* [Target](http://thecallr.com/docs/objects/#Target)
* [SENDR.Simple.Broadcast1.Options](http://thecallr.com/docs/objects/#SENDR.Simple.Broadcast1.Options)

********************************************************************************

## Fatal error management
```javascript
try {
    api.call('sms.get', 'unknown hash');
} catch (e) {
    console.log('Error\n', e);
}
```
