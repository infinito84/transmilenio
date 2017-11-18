const request = require('request');
const routes = require('../routes.json');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');

var count = 0;
let getRoute = (item, callback) => {
	request({
		url : item.url
	}, (err, response, body) => {
		let $ = cheerio.load(body);
		let stations = $('.recorrido1');
		let route = [];
		stations.each((i, el) => {
			let station = $(el).find('.ajam').text().split(' => ')[2].split('\n')[0];
			route.push({
				stop : !$(el).find('.icon-circle-blank').length,
				station : station
			})
			if(station.indexOf('BD')){
				console.log(item.cod)
			}
		})
		count++;
		console.log(count+'/'+routes.length);
		callback(null, route);
	})
}

async.map(routes, getRoute, (err, data) => {
	fs.writeFile('../solution.json', JSON.stringify(data), (err) => {
		if(err) return console.error(err);
		console.log('Current solution saved')
	})
})
