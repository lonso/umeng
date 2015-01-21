/**
 * Created by lonso on 15-1-12.
 * liusc@polyvi.com
 */
'use strict';
var crypto = require('crypto');
var Promise = require('bluebird');
var https = require('https');

exports.cryptoMD5 = function (val) {
	return new Promise(function (resolve, reject) {
		resolve(crypto.createHash('md5').update((val).toString(), 'UTF-8').digest('hex'))
	})
};

var splitUrl = function (url) {
	return new Promise(function (resolve, reject) {
		try {
			var urlInfo = url.split('//');
			url = urlInfo[1];
			var protocol = urlInfo[0];
			var isHttps = protocol === 'https:';
			var urlSplit = url.split('/');
			var path = url.substring(url.indexOf('/'), url.length);
			var addInfo = urlSplit[0];
			var port = addInfo.split(':')[1] || (isHttps ? 443 : 80);
			var hostname = addInfo.split(':')[0];
			resolve({
				port: port,
				hostname: hostname,
				path: path,
				https: isHttps
			})
		} catch (e) {
			reject(e);
		}
	})
};


exports.requestHelper = function (postData) {
	return new Promise(function (resolve, reject) {
		var uri = postData.uri;
		var body  = JSON.stringify(postData.json);
		splitUrl(uri).then(function (reqInfo) {
			var options = {
				hostname: reqInfo.hostname,
				port: reqInfo.port,
				path: reqInfo.path,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': Buffer.byteLength(body)
				}
			};
			var request = '';
			if (reqInfo.https)
				request = require('https');
			else
				request = require('http');

			var data = '';
			var req = request.request(options, function (res) {
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
					data += chunk;
				});
				res.on('end', function () {
					resolve(JSON.parse(data))
				});
			});

			req.on('error', function (e) {
				reject(e);
			});

			req.write(body);
			req.end();
		}).catch(function (e) {
				reject(e);
			})
	})
};