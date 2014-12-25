umeng
=====

umeng push server by nodejs.This module create by promise.

Example
=====

```javascript
  var umeng = new UMENG({
			appKey: YOUR APPKEY,
			app_master_secret: YOUR MASTERSECRET
  });
  
  #android push
  
  umeng.androidPush({
			type: 'unicast',
			device_tokens: DEVICETOKENS,
			display_type: 'notification',
			body: {
				ticker: 'test ticker notification',
				title: 'test title notification',
				text: 'test text notification',
				custom: {
					key: val
				}
			}
		})
		
		
	#ios push
	
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
		})
		
	#getstatus
	
	umeng.getStatus({
			"timestamp":"xx",
			"validation_token":"xx",
			"task_id":"xx"
		})
		
```
License
=====
MIT
