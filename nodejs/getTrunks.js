const stations = require('../stations.json');
const fs = require('fs');

let data = {
	trunks : {},
	stations : {}
};

let h2m = (hour) => {
	let h = parseInt(hour.split(':')[0]);
	let m = parseInt(hour.split(':')[1]);
	return (h-4)*60 + m;
}

// from https://brtdata.org/location/latin_america/colombia/bogota
let brtdata = {
	transmi : {
		speed : 26.2,
		passengers : 2213236,
		fleet : 1697,
		limitPerBus : 250,
		start : h2m('4:00'),
		end : h2m('24:00'),
		peeks : [ // from http://caracol.com.co/radio/2014/01/27/bogota/1390840080_064167.html
			{
				from : h2m('6:00'),
				to : h2m('8:29')
			},
			{
				from : h2m('9:30'),
				to : h2m('15:29')
			},
			{
				from : h2m('16:30'),
				to : h2m('19:29')
			}
		]
	},
	1 : {
		peakLoad : 48000,
		passengers : 520880,
		length : 8.1
	},
	2 : {
		peakLoad : 39600,
		passengers : 335700,
		length : 10.3,
	},
	3 : {
		peakLoad : 20100,
		passengers : 121438,
		length : 13
	},
	4 : {
		peakLoad : 23400,
		passengers : 158086,
		length : 10.1
	},
	5 : {
		peakLoad : 19000,
		passengers : 192405,
		length : 12.4
	},
	6 : {
		peakLoad : 24450,
		passengers : 282051,
		length : 13
	},
	7 : {
		peakLoad : 19000,
		passengers : 192405,
		length : 12.7
	},
	8 : {
		peakLoad : 33300,
		passengers : 520880,
		length : 11.9
	},
	9 : {
		peakLoad : 7600,
		passengers : 520880,
		length : 1.9
	},
	10 : {
		peakLoad : 20000, // NOTE: not given
		passengers : 104180,
		length : 12.2
	},
	11 : {
		peakLoad : 25000, // NOTE: not given
		passengers : 256970,
		length : 7.3
	},
	12 : { // NOTE: not given
		peakLoad : 5000,
		passengers : 20000,
		length : 1
	}
}

stations.coordenadas.forEach(station => {
	data.trunks[station.troncal] = data.trunks[station.troncal] || {
		id : station.troncal,
		name : station.troncal_nombre,
		color : station.troncal_color,
		stations : [],
		peakLoad : brtdata[station.troncal].peakLoad,
		passengers : brtdata[station.troncal].passengers,
		length : brtdata[station.troncal].length
	};
	data.trunks[station.troncal].stations.push(station.estacion_portal_codigo);

	data.stations[station.estacion_portal_codigo] = {
		id : station.estacion_portal_codigo,
		name : station.estacion_portal_nombre,
		color : station.troncal_color,
		trunk : station.troncal
	}
});

for(let trunk in data.trunks){
	let trunkObj = data.trunks[trunk];
	let total = (trunkObj.length * 60 / brtdata.transmi.speed);
	let time = parseInt(total / trunkObj.stations.length);
	trunkObj.stations.forEach(station => {
		data.stations[station].time = time;
	})
	/*let diff = total - (time*trunkObj.stations.length);
	let reward = [];
	while(diff > 0){
		let who = parseInt(Math.random() * trunkObj.stations.length);
		if(reward.indexOf(who) === -1){
			reward.push(who);
			let station = trunkObj.stations[who];
			data.stations[station].time++;
			diff--;
		}
	}*/
}

data.transmi = brtdata.transmi;

fs.writeFile('../trunks.json', JSON.stringify(data, null,'\t'), (err) => {
	if(err) return console.error(err);
	console.log('Trunks saved')
})
