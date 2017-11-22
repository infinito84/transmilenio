const solution = require('../solution');

let mutation = 0.1;

module.exports = (n) => {
	let population = [];
	for(let i=0; i<n; i++){
		let routes = [];
		solution.forEach((route, j) => {
			if(Math.random() < mutation) return;
			var stop = {};
			route.stations.forEach(station => {
				if(Math.random() < 0.5){
					stop[station] = 1;
				}
			})
			routes.push({
				stations : route.stations.slice(0),
				stop : stop,
				gen : j
			})
		})
		population.push(routes);
	}
	return population;
}
