const request = require('request');
const routes = require('../routes.json');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');

let types = {};
var count = 0;
let getRoute = (item, callback) => {
	request({
		url : item.url
	}, (err, response, body) => {
		let $ = cheerio.load(body);
		let stations = $('.recorrido1');
		let route1 = [];
		let route2 = {};
		stations.each((i, el) => {
			let station = $(el).find('.ajam').text().split(' => ')[2].split('\n')[0];
			if(!$(el).find('.icon-paradero').length){
				route1.push(station);
				if(!$(el).find('.icon-circle-blank').length){
					route2[station] = 1;
				};
			}
		})
		count++;
		console.log(count+'/'+routes.length);
		callback(null, {
			stop : route2,
			stations : route1
		});
	})
}
async.map(routes, getRoute, (err, data) => {
	console.log(types)
	fs.writeFile('../solution.json', JSON.stringify(data,null,'\t'), (err) => {
		if(err) return console.error(err);
		console.log('Current solution saved')
	})
})
