const request = require('request');
const async = require('async');
const $ = require('jquery');

const url = 'http://www.sitp.gov.co/loader.php?lServicio=Rutas&lTipo=busqueda&lFuncion=lstRutasAjax&draw=1&columns%5B0%5D%5Bdata%5D=0&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&length=20&search%5Bregex%5D=false&_=1510929774051';
const limit = 134;

var indexes = [];
for(let i = 0; i <= limit; i += 20){
	indexes.push(i);
}

async.reduce(indexes, [], (vector, i, callback) => {
	request({
		url : url + '&start='+i
	}, (err, response, body) => {
		var routes = JSON.parse(body).data;

	})
}, (err, data) => {

})
