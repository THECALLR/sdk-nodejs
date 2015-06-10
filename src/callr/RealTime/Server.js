var Request = require('./Request'),
    Exception = require('../Exception');

exports.Server = function() {
    'use strict';

    var CONTENT_TYPE = 'application/json';

    var callFlow = [];
    var outputHandler = null;

    this.setOutputHandler = function( callback ) {
        outputHandler = callback;
    };

    this.registerCallFlow = function( hash, obj ) {
        if ( typeof hash !== 'string' || typeof obj !== 'object') {
            throw new Exception('Invalid type');
        }
        callFlow[hash] = obj;
    };

    this.start = function( request, response ) {
        if (request.method == 'POST') {
            var body = '';

            request.on('data', function( chunk ) {
                body += chunk.toString();
            });

            request.on('end', function() {
                try {
                    var req = new Request( body );
                    var cf = null;

                    if ( callFlow.hasOwnProperty(req.app) ) {
                        cf = callFlow[req.app];
                    }
                    else if ( callFlow.hasOwnProperty('*') ) {
                        cf = callFlow['*'];
                    }
                    else {
                        throw new Exception('CallFlow for ' + req.app + ' not found', 404);
                    }

                    if ( true ) {
                        var result;

                        response.writeHead( 200, 'OK', { 'Content-Type': CONTENT_TYPE } );
                        response.write( JSON.stringify( result ) );
                    }
                } catch ( e ) {
                    response.writeHead(e.code, e.message);
                    response.write( JSON.stringify({
                        error: {
                            code: e.code,
                            message: e.message
                        }
                    }));
                }

                response.end();
            });
        }
    };
};
