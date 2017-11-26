var Bus = require('./bus.js');
var Station = require('./station.js');
var fs = require('fs');

var passengers = require('../passengers.json');
var data = require('../trunks.json');

var simulate = function(solution, callback){
	var s = Date.now();
	//console.log('Simulating...')

	var buses = [];
	var stations = {};
	var nBuses = 0;
	var howBuses = 100;
	for(var station in data.stations){
		stations[station] = new Station(data.stations[station]);
	}
	for(var j=0; j < data.transmi.fleet;j++){
		buses.push(new Bus(solution[j % solution.length], stations, data.transmi));
	}
	//var n = 59;
	//var n = 180;  //3 hours
	var n = data.transmi.end;
	for(var i=0; i < n; i++){
		if(!passengers[i]) continue;
		for(var j=0; j<passengers[i].length; j++){
			var p = passengers[i][j];
			p.time = 0;
			stations[p.from].passengers.push(p);
		};
		for(var j=0; j< buses.length; j++){
			buses[j].calc();
			buses[j].sumTime();
		}
		for(var station in stations){
			stations[station].sumTime();
		}
		//console.log(i+'/'+n);
	}
	var total = 0;
	var count = 0.0;
	for(var i=0; i < n; i++){
		if(!passengers[i]) continue;
		passengers[i].forEach(function(p){
			count++;
			total += p.time;
		})
	}

	var successes = 0;
	buses.forEach(b => {
		successes += b.success;
	})
	console.log((100*successes/count).toFixed(2)+'%', count, successes);

	var f = (Date.now() - s) / 1000;
	//console.log('Done: '+f);
	callback(null, total);
}

module.exports = simulate;
