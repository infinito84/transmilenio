self.importScripts('/vendors/ajax.min.js');
self.importScripts('bus.js');
self.importScripts('station.js');

var passengers;
var data;

ajax().get('/passengers.json').then(function(json){
	passengers = json;
});

ajax().get('/trunks.json').then(function(json){
	data = json;
	console.log(data);
});

var simulate = function(solution){
	if(!passengers || !data) return setTimeout(function(){
		simulate(solution);
	}, 1000);
	var s = Date.now();
	console.log('Simulating...')

	var buses = [];
	var stations = {};
	for(var station in data.stations){
		stations[station] = new Station(data.stations[station]);
	}
	for(var i=0; i < data.transmi.fleet;i++){
		var j = parseInt(Math.random() * solution.length);
		buses.push(new Bus(solution[j], stations, data.transmi));
	}
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
		console.log(i+'/'+n);
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
	console.log(total / count);
	for(var station in stations){
		total += stations[station].passengers.length;
	}
	console.log(total);
	var f = (Date.now() - s) / 1000;
	console.log('Done: '+f);
}

self.addEventListener("message", function(e) {
    simulate(e.data.solution);
});
