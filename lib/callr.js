var url = require('url'),
	https = require('https'),
	assert = require('assert');

exports.api = function(login, password, config) {
	"use strict";
	assert.equal(typeof(login), 'string', "argument 'login' must be a string");
	assert.equal(typeof(password), 'string', "argument 'password' must be a string");

	var SDK_VERSION = "1.1";

	// var LogAs types
	var loginAsTypes = {
		user: 'user.login',
		account: 'account.hash'
	}

	// allow api url to be changed
	this.apiUrl = "https://api.callr.com/json-rpc/v1.1/";

	// Callback class
	var Callback = function() {
		this.success = false;
		this.error = false;
	};

	// Set login As options
	this.setLoginAs = function (type, target) {
		if(config === undefined) config = {};
		config.loginas = {
			type: type,
			target: target
		}
	}

	// Send a request to THECALLR webservice
	this.call = function(method) {
		assert.equal(typeof(method), 'string', "argument 'method' must be a string");

		var args = Array.prototype.slice.call(arguments);
		return this.send(method, args.slice(1, args.length));
	};

	// Send a request to THECALLR webservice
	this.send = function(method, params, id) {
		assert.equal(typeof(method), 'string', "argument 'method' must be a string");
		assert.ok(params instanceof(Array), "argument 'params' must be an array");

		var json = JSON.stringify({
			id: id === undefined || isNaN(parseInt(id)) ? Math.floor(Math.random() * (999 - 100)) + 100 : id,
			jsonrpc: "2.0",
			method: method,
			params: params instanceof Array ? params : []
		});

		var options = url.parse(this.apiUrl);
		options.port = 443;
		options.method = "POST";
		options.auth = login + ':' + password;
		options.headers = {
			"Content-Type": "application/json-rpc; charset=utf-8",
			"User-Agent": "sdk=NODE; sdk-version="+SDK_VERSION+"; lang-version="+process.version+"; platform="+process.platform,
			"Content-Length": Buffer.byteLength(json)
		};

		// Login As support
		if (config && config.hasOwnProperty('loginas')) {
			assert.equal(typeof (config.loginas.type), 'string', "loginas.type must be a string");
			assert.ok(config.loginas.type.toLowerCase() in loginAsTypes, `loginas type must be one of "${Object.keys(loginAsTypes)}"`);
			assert.equal(typeof (config.loginas.target), 'string', "loginas.target must be a string")

			options.headers['CALLR-Login-As'] = `${loginAsTypes[config.loginas.type.toLowerCase()]} ${config.loginas.target}`;
		}

		// Proxy agent support
		if (config && config.hasOwnProperty('proxyAgent')) {
			options.agent = config.proxyAgent;
		}

		this.callback = new Callback();

		// Annonymous Closure to keep data untouched on successive call
		(function(options, json, callback) {
			// make new request
			var req = https.request(options, function(res) {
				var buf = "";
				if (res.statusCode != 200) {
					doCallback(callback.error, error("HTTP_CODE_ERROR", -1, {
						http_code: res.statusCode
					}));
				}
				res.on('data', function(data) {
					buf += data;
				});
				res.on('end', function() {
					parseData(buf.toString(), callback);
				});
			});

			req.on('error', function(e) {
				doCallback(callback.error, error("HTTP_EXCEPTION", -1, {
					exception: e
				}));
			}).on('end', function() {
				console.log('request end');
			}).end(json);
		})(options, json, this.callback);

		return this;
	};

	// set success callback
	this.success = function(cb) {
		this.callback.success = cb;
		return this;
	};

	// set error callback
	this.error = function(cb) {
		this.callback.error = cb;
		return this;
	};

	// Response analysis
	function parseData(json, callback) {
		try {
			var data = JSON.parse(json);
			if (data && data.hasOwnProperty('result'))
				doCallback(callback.success, data.result);
			else if (data && data.hasOwnProperty('error') && data.error)
				doCallback(callback.error, error(data.error.message, data.error.code, null));
			else
				doCallback(callback.error, error("INVALID_RESPONSE", -1, {
					responses: json.toString()
				}));
		}
		catch (e) {
			doCallback(callback.error, error("INVALID_RESPONSE", -1, {
				exception: e,
				response: json.toString()
			}));
		}
	}

	function doCallback(callback, result) {
		if (typeof(callback) == 'function')
			callback(result);
	}

	function error(msg, code, data) {
		var err = new Error(msg);
		err.code = code;
		err.data = data;
		return err;
	}
};
