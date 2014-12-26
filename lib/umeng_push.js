/**
 * Created by lonso on 14-11-13.
 * liusc@polyvi.com
 */
'use strict';

var Promise = require('bluebird');
var crypto = require('crypto');
var request = require('request');


var requestQ = function (options) {
	return new Promise(function (resolve, reject) {
		request(options, function (err, response, body) {
			if (err || +response.statusCode !== 200) reject(err || response)
			else resolve([err, response, body])
		})
	})
};

var md5 = function (val) {
	return new Promise(function (resolve, reject) {
		resolve(crypto.createHash('md5').update((val).toString(), 'UTF-8').digest('hex'))
	})
};

var type = ['unicast', 'broadcast', 'groupcast', 'customizedcast', 'filecast'];

module.exports = Umeng;

var options = {
	uri: 'http://msg.umeng.com/api/send',
	method: 'POST'
};



function Umeng(appInfo) {
	if (!(this instanceof Umeng)) return new Umeng(appInfo);
	if (!appInfo.appKey || !appInfo.app_master_secret) return new Error('appKey and masterSecret need');
	this.appKey = appInfo.appKey;
	this.app_master_secret = appInfo.app_master_secret;
	return this;

}
Umeng.prototype.init = function (args) {
	var that = this;
	var message = {};
	that.message = message;

	return new Promise(function (resolve, reject) {
		if (!~type.indexOf(args.type)) return reject(new Error('type error'));
		var masterSecret = args.app_master_secret || that.app_master_secret;
		args.after_open = args.after_open || "go_app";

		message.appKey = args.appKey || that.appKey;
		message.timestamp = new Date().getTime();
		message.type = args.type || 'broadcast';
		message.device_tokens = args.device_tokens || '';
		message.alias = args.alias || '';
		message.alias_type = args.alias_type || '';
		message.file_id = args.file_id || '';
		message.filter = args.filter || '';
		that.message.policy = args.policy || {};
		args.production_mode && (that.message.production_mode = args.production_mode);
		that.message.description = args.description || '';
		args.thirdparty_id && (that.message.thirdparty_id = args.thirdparty_id);
		md5(message.appKey.toLowerCase() + masterSecret.toLowerCase() + message.timestamp).then(function (md5V) {
			message.validation_token = md5V;
			resolve(message);
		}).catch(function (e) {
				reject(e)
			})
	})
};


/**
 * body 格式
 * {
		ticker: args.ticker,
		title: args.title,
		text: args.content,
		builder_id: args.builder_id || 0,
		icon:  args.icon || '',
		largeIcon:  args.largeIcon || '',
		img: args.img || '',
		play_vibrate: args.play_vibrate || true,
		play_lights: args.play_lights|| true,
		play_sound: args.play_sound || true,
		sound: args.sound || '',
		after_open: args.after_open || 'go_app',
		url: args.url || '',
		activity: args.activity || '',
		custom: args.custom
		}
 * @param args
 * @param cb
 * @returns {Promise}
 */
Umeng.prototype.androidPush = function (args) {
	var that = this;
	return new Promise(function (resolve, reject) {
		if (!args.body.title || !args.body.text || !args.body.ticker)
			return reject(new Error('title, content, ticker must need'));
		that.init(args).then(function () {
			that.message.payload = {
				display_type: args.display_type || "notification",
				body: args.body,
				extra: args.extra || ''
			};
			options.json = that.message;
			return requestQ(options);
		}).then(function (data) {
				resolve(data[1].body)
			}).catch(function (e) {
				reject(e);
			});
	})
};

/**
 * ios push
 * payload 格式:
 * payload: {
				body: {
					aps: {
						alert: 'test alert notification'
					},
					custom: {
						type: 1
					}
				}
			}
 * @param args
 * @returns {Promise}
 */
Umeng.prototype.iosPush = function (args) {
	var that = this;
	return new Promise(function (resolve, reject) {
		if (!args.payload.body.aps.alert)
			return reject(new Error('alert must need'));
		that.init(args).then(function () {
			that.message.payload = args.payload;
			options.json = that.message;
			return requestQ(options);
		}).then(function (data) {
				resolve(data[1].body)
			}).catch(function (e) {
				reject(e);
			});
	})
};

Umeng.prototype.getStatus = function (args) {
	var statusOptions = {
		uri: 'http://msg.umeng.com/api/status',
		method: 'POST'
	};
	statusOptions.json = args;
	statusOptions.json.appKey = this.appKey;
	return requestQ(statusOptions)
};

Umeng.prototype.cancel = function (args) {
	var cancelOptions = {
		uri: 'http://msg.umeng.com/api/cancel',
		method: 'POST'
	};
	cancelOptions.json = args;
	cancelOptions.json.appKey = this.appKey;
	return requestQ(cancelOptions)
};

Umeng.prototype.upload = function (args) {
	var uploadOptions = {
		uri: 'http://msg.umeng.com/upload',
		method: 'POST'
	};
	uploadOptions.json = args;
	uploadOptions.json.appKey = this.appKey;
	return requestQ(uploadOptions)
};