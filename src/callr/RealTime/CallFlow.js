var Callflow = function() {
    'use strict';

    var labels = [];
    var onInboundHandler = null;
    var onOutboundHandler = null;
    var onHangupHandler = null;
    var currentRequest = null;

    this.define = function( label, before, after ) {
        labels[label] = {
            before: before,
            after: after,
        };
    };

    // construct
    this.define('_hangup', function() {
        return Command.hangup();
    });
};

module.exports = Callflow;
