/**
 * Created by lonso on 14-12-24.
 * liusc@polyvi.com
 */
'use strict';
var UMENG = require('..');
var should = require('should');
var APPKEY = '';
var MASTERSECRET = '';
var DEVICETOKENS = ''

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
				text: 'test title notification',
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

	it('good testCase for ios', function (done) {
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
});