const fs = require('fs');
const minutes = require('../minutes.json');
const trunks = require('../trunks.json');
const restrictions = require('../restrictions.json');
const solution = require('../solution.json');

let passengers = {};

let totalTrunks = 0;
for(var trunk in trunks.trunks){
	totalTrunks += trunks.trunks[trunk].passengers;
}

// roulette according passengers at day
let getStation = () => {
	let which = parseInt(Math.random() * totalTrunks);
	let count = 0;
	for(var trunk in trunks.trunks){
		let trunkObj = trunks.trunks[trunk];
		count += trunkObj.passengers;
		if(count > which){
			which = parseInt(Math.random() * trunkObj.stations.length);
			return trunkObj.stations[which];
		}
	}
}

let getMinute = () => {
	let which = parseInt(Math.random() * minutes.total);
	let count = 0;
	for(let i=0; i<minutes.minutes.length; i++){
		let min = minutes.minutes[i];
		count += min.per;
		if(count > which){
			return min.min
		}
	}
}

let getStationTo = (from) => {
	var routes = [];
	for(var i=0; i < solution.length; i++){
		if(solution[i].stop[from]){
			routes.push(solution[i]);
		}
	}
	if(routes.length === 0)return false;
	var route = routes[parseInt(Math.random() * routes.length)];
	var keys = Object.keys(route.stop);
	keys.splice(keys.indexOf(from), 1);
	return keys[parseInt(Math.random() * keys.length)];
}

let max = 0;
let which = 0;
for(let i=0; i< trunks.transmi.passengers; i++){
	let min = getMinute();
	passengers[min] = passengers[min] || [];
	let passenger = {
		from : getStation()
	}
	// destination without transshipments
	passenger.to = getStationTo(passenger.from);
	if(!passenger.to){
		i--;
		continue;
	}
	passengers[min].push(passenger);
	if(passengers[min].length > max){
		max = passengers[min].length;
		which = min;
	}
	console.log(i/trunks.transmi.passengers, '%')
}

console.log('The minute '+which+' has '+max+' passengers.');

fs.writeFile('../passengers.json', JSON.stringify(passengers), (err) => {
	if(err) return console.error(err);
	console.log('Passengers created');
})
