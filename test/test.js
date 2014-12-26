/**
 * Created by lonso on 14-12-24.
 * liusc@polyvi.com
 */
'use strict';
var UMENG = require('..');
var should = require('should');
var APPKEY = 'YOUR APPKEY';
var MASTERSECRET = 'YOU MASTERSECRET';
var DEVICETOKENS = 'YOUR DEVICETOKENS';

describe('umeng server push test', function () {
	xit('good testCase for android', function (done) {
		var umeng = new UMENG({
			appKey: APPKEY,
			app_master_secret: MASTERSECRET

		});
		umeng.androidPush({
			type: 'unicast',
			device_tokens: DEVICETOKENS,
			display_type: 'notification',
			body: {
				ticker: 'test ticker notification',
				title: 'test title notification',
				text: 'test text notification',
				custom: {
					type: 1
				}
			}
		}).then(function (data) {
				(data && data.ret === 'SUCCESS').should.be.true;
			}).catch(function (err) {
				(!err).should.be.true;
			}).finally(function () {
				done()
			})
	});

	xit('good testCase for ios', function (done) {
		var umeng = new UMENG({
			appKey: APPKEY,
			app_master_secret: MASTERSECRET
		});
		umeng.iosPush({
			type: 'unicast',
			device_tokens: DEVICETOKENS,
			payload: {
				body: {
					aps: {
						alert: 'test alert notification'
					},
					custom: {
						type: 1
					}
				}
			}
		}).then(function (data) {
				(data && data.ret === 'SUCCESS').should.be.true;
			}).catch(function (err) {
				(!err).should.be.true;
			}).finally(function () {
				done()
			})
	});


	xit('good testCase for get status', function (done) {
		var umeng = new UMENG({
			appKey: APPKEY,
			app_master_secret: MASTERSECRET
		});
		umeng.getStatus({
			"timestamp": "xx",
			"validation_token": "xx",
			"task_id": "xx"
		}).then(function (data) {
				(data.body && data.body.ret === 'SUCCESS').should.be.true;
			}).catch(function (err) {
				(!err).should.be.true;
			}).finally(function () {
				done()
			})
	});


	xit('good testCase for cancel', function (done) {
		var umeng = new UMENG({
			appKey: APPKEY,
			app_master_secret: MASTERSECRET
		});
		umeng.cancel({
			"timestamp": "xx",
			"validation_token": "xx",
			"task_id": "xx"
		}).then(function (data) {
				(data.body && data.body.ret === 'SUCCESS').should.be.true;
			}).catch(function (err) {
				(!err).should.be.true;
			}).finally(function () {
				done()
			})
	});

	it('good testCase for upload', function (done) {
		var umeng = new UMENG({
			appKey: APPKEY,
			app_master_secret: MASTERSECRET
		});
		umeng.upload({
			"timestamp": "xx",
			"validation_token": "xx",
			"content": "xx"
		}).then(function (data) {
				(data.body && data.body.ret === 'SUCCESS').should.be.true;
			}).catch(function (err) {
				(!err).should.be.true;
			}).finally(function () {
				done()
			})
	});

});