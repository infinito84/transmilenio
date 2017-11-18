const request = require('request');
const async = require('async');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://www.sitp.gov.co/loader.php?lServicio=Rutas&lTipo=busqueda&lFuncion=lstRutasAjax&draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&length=20&search%5Bregex%5D=false';
const limit = 134;

var indexes = [];
for(let i = 0; i <= limit; i += 20){
	indexes.push(i);
}

async.reduce(indexes, [], (routes, i, callback) => {
	request({
		url : url + '&start='+i+'&_='+Date.now(),
		headers : {
			//filter i guess
			'Cookie': 'nexuraSID=1819b6b62a00d9aa4127f5212ce21a61'
		}
	}, (err, response, body) => {
		var html = JSON.parse(body).data;
		html.forEach(function(el){
			if(~el[0].indexOf('Lunes')){
				let $ = cheerio.load(el[0]);
				routes.push({
					cod : $('.codigoRuta').text(),
					title : $('a').attr('title'),
					url : $('a').attr('href')
				})
			}
		})
		callback(err, routes);
	})
}, (err, data) => {
	fs.writeFile('../routes.json', JSON.stringify(data), function(){
		if(err) return console.error(err);
		console.log('Routes saved')
	})
})
