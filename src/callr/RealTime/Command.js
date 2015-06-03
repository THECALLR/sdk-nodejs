var Exception = require('../Exception'),
    ConferenceParams = require('./Command/ConferenceParams');


var Command = function (command, params) {
    'use strict';

    if ( this === undefined ) {
        throw new Exception('Command is not instanced');
    }

    if ( params !== undefined && typeof params !== 'Array' )
    {
        throw new Exception('Parameter 2 is not an array', 1);
    }

    this.command = command.toString();
    this.params = params;
};

Command.conference = function (id, params) {
    if ( params instanceof ConferenceParams ) {
        params = params.getParams();
        params.id = id;

        return new Command('conference', params);
    }
    //else
    //    throw new Exception('Parameter 2 is not an instance of ConferenceParams');
};

Command.dialout = function( target, cli, ringtone, whisper, cdrField ) {
    return new Command('dialout');
};

module.exports = Command;
