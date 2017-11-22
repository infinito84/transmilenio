let mutation = 0.1;

let crossover = (p1, p2, children) => {
	let genes = {};
	let child1 = {solution : []};
	let child2 = {solution : []};
	p1.solution.forEach((route) => {
		genes[route.gen] = genes[route.gen] || [];
		genes[route.gen].push(route);
	})
	p2.solution.forEach((route) => {
		genes[route.gen] = genes[route.gen] || [];
		genes[route.gen].push(route);
	})
	for(var gen in genes){
		if(Math.random() < mutation) continue; // delete gen :D
		if(genes[gen].length === 1){
			let route = genes[gen][0];
			let route1 = {
				stop : {},
				stations : route.stations.slice(0),
				gen : gen
			}
			let route2 = {
				stop : {},
				stations : route.stations.slice(0),
				gen : gen
			}
			route.stations.forEach(station => {
				if(Math.random() < mutation){
					if(!route.stop[station]){
						route1.stop[station] = 1;
						route2.stop[station] = 1;
					}
				}
				else{
					if(route.stop[station]){
						route1.stop[station] = 1;
						route2.stop[station] = 1;
					}
				}
			})
			child1.solution.push(route1);
			child2.solution.push(route2);
		}
		else{
			let routeA = genes[gen][0];
			let routeB = genes[gen][1];
			let route1 = {
				stop : {},
				stations : routeA.stations.slice(0),
				gen : gen
			}
			let route2 = {
				stop : {},
				stations : routeA.stations.slice(0),
				gen : gen
			}
			let cut = parseInt(routeA.stations.length * Math.random());
			routeA.stations.forEach((station, i) => {
				let route = i < cut ? routeA : routeB;
				if(Math.random() < mutation){
					if(!route.stop[station]){
						route1.stop[station] = 1;
						route2.stop[station] = 1;
					}
				}
				else{
					if(route.stop[station]){
						route1.stop[station] = 1;
						route2.stop[station] = 1;
					}
				}
			})
			child1.solution.push(route1);
			child2.solution.push(route2);
		}
	}
	//console.log('routes: ',child1.solution.length, child1.solution.length, p1.solution.length, p2.solution.length, Object.keys(genes).length);
	children.push(child1);
	children.push(child2);
}

module.exports = (population, n) => {
	let children = [];
	for(let i=0; i < n; i++){
		crossover(population[i], population[2*n -1 -i], children);
	}
	return children;
}
