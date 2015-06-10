var Exception = function( message, code ) {
    'use strict';

    this.name = 'Exception';
    this.message = message || '';
    this.code = code || 0;
};

Exception.prototype = new Error();
Exception.prototype.constructor = Exception;

module.exports = Exception;
