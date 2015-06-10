var Exception = require('../Exception');

exports.Request = function( data ) {
    'use strict';

    this.app = null;
    this.callid = null;
    this.request_hash = null;
    this.cli_name = null;
    this.cli_number = null;
    this.date_started = null;
    this.number = null;
    this.command = null;
    this.command_id = null;
    this.command_result = null;
    this.command_error = null;
    this.call_status = null;
    this.cdr_field = null;
    this.variables = null;

    if ( typeof data !== 'string' || data.length === 0 ) {
        throw new Exception('Empty Request', 400);
    }

    try {
        data = JSON.parse( data );

        for ( var k in data ) {
            if ( this.hasOwnProperty(k) ) {
                this[k] = data[k];
            }
        }
    } catch ( e ) {
        throw new Exception('JSON Decode Error [' + e.message + ']', 400);
    }
};
