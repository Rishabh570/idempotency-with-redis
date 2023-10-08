const async = require('async');
const axios = require('axios');

const payload = {
	method: 'post',
	url: `http://localhost:8201/url/create`,
	headers: {'Content-Type': 'application/json'},
	data: {
		longURL: 'http://example.com/100'
	}
};

function shortenURL(reqPayload) {
	return axios(reqPayload)
	.then(resp => {
		return resp.data;
	});
}

async.parallel([
	function (callback) {
		return shortenURL(payload).then(res => {
			console.log('res1: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 1 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res2: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 2 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res3: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 3 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res4: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 4 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res5: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 5 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res6: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 6 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res7: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 7 = ',err.message))
	},
	function (callback) {
		payload.data.num += 1;
		return shortenURL(payload).then(res => {
			console.log('res8: ', res.data.slug);
			callback(null, res.data.slug);
		}).catch((err) => console.log('err 8 = ',err.message))
	},
],
(err, results) => {
	if(err) {
		console.log('Final error: ', err.message);
	} else {
		console.log('results: ', results);
	}
});
