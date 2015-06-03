var assert = require('assert');
var Exception = require('../Exception');
var ConferenceParams = require('./Command/ConferenceParams');


var Command = function (command, params) {
    'use strict';

    assert.notStrictEqual(this, undefined, 'Command is not instanced');
    assert.strictEqual(typeof command, 'string', 'Argument "command" must be a string');

    if ( params !== undefined ) {
        assert.ok( params instanceof Array, 'argument "params" must be an Array');
    }

    this.command = command.toString();
    this.params = params || [];
};

Command.conference = function (id, params) {
    if ( params instanceof ConferenceParams === false ) {
        throw new Exception('[Command.conference] params is not an instance of ConferenceParams');
    }
    params = params.getParams();
    params.id = id;

    return new Command('conference', params);
};

Command.dialout = function( targets, cli, ringtone, whisper, cdrField ) {
    if ( typeof targets !== 'object' ) {
        throw new Exception('[Command.dialout] targets is not an object');
    }

    cli = cli || 'BLOCKED';
    ringtone = ringtone || 'RING';
    whisper = whisper || 0;
    cdrField = cdrField || '';

    return new Command('dialout', {
        targets: targets,
        cli: cli,
        ringtone: ringtone,
        whisper: whisper,
        crd_field: cdrField
    });
};

Command.hangup = function() {
    return new Commnad('hangup');
};

Command.hangupCallID = function( callid ) {
    return new Command('callid', {
        callid: callid
    });
};

Command.play = function( media ) {
    return new Command('play', {
        media_id: media
    });
};

Command.playRecord = function( mediaFile ) {
    return new Command('play_record', {
        media_file: mediaFile
    });
};

Command.playWavData = function( wavData ) {
    return new Command('play_wav_data', {
        audio_data: wavData
    });
};

Command.read = function( media, maxDigits, attempts, timeoutMs ) {
    if ( typeof media !== 'string' || ! isInt(media) ) {
        throw new Exception('[Command.read] media is not ');
    }

    maxDigits = maxDigits || 20;
    attempts = attempts || 10;
    timeoutMs = timeoutMs || 30000;

};



var isInt = function (n) { return n === (n | 0); };

module.exports = Command;
