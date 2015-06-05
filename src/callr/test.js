var Realtime = require('./realtime'),
    Command = Realtime.Command;

try {
    console.log( Command(123) );
} catch ( e ) {
    console.log( e );
    console.log(e.code);
}
