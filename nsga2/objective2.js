module.exports = function(solution){
	var total = 0;
	solution.forEach(function(route){
		total += route.stations.length / Object.keys(route.stop).length;
	});
	return total / solution.length;
}
