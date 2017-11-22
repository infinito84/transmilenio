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
	for(var j=0; j < 400;j++){
		buses.push(new Bus(solution[nBuses % solution.length], stations, data.transmi));
		nBuses++;
	}
	var n = 180;  //3 hours
	for(var i=0; i < n; i++){
		if(i % 5 === 0){
			for(var j=0; j < howBuses && nBuses < data.transmi.fleet;j++){
				buses.push(new Bus(solution[nBuses % solution.length], stations, data.transmi));
				nBuses++;
			}
		}
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
	var count = 0;
	for(var i=0; i < n; i++){
		if(!passengers[i]) continue;
		passengers[i].forEach(function(p){
			count++;
			total += p.time;
		})
	}
	/*
	var total2 = 0;
	for(var station in stations){
		total2 += stations[station].negative;
		total += total2;
	}*/
	var f = (Date.now() - s) / 1000;
	//console.log('Done: '+f);
	callback(null, total);
}

module.exports = simulate;
