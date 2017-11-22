const fs = require('fs');
const async = require('async');
const Population = require('./population');
const obj1 = require('./objective1');
const obj2 = require('./objective2');
const evaluate = require('./evaluate');
const Pareto = require('./pareto');
const CrowdingDistance = require('./crowding');
const Reproduction = require('./crossover');
const generations = 100;
const n = 20;
let bestSolution = [];

console.log('Generating population');
let population = Population(n);

console.log('Evaluating parents');
async.map(population, function(solution, callback){
	var fitness = {
		solution : solution,
		obj2 : obj2(solution)
	}
	obj1(solution, (err, obj1) => {
		fitness.obj1 = obj1;
		callback(null, fitness);
	});
}, function(err, data){
	population = data;
	let children = [];
	async.times(generations, function(i, callback){
		let frontiers = Pareto(population);
		var front = '';
		frontiers[0].forEach((f) => {
			front += f.obj1 +'\t'+ f.obj2 +'\n';
		})
		fs.writeFileSync('../frontier.txt', front, 'utf-8');
		fs.writeFileSync('../bestSolution.json', JSON.stringify(frontiers[0][0]));
		population = [];
		let count = 0;
		let lastFrontier;
		frontiers.some((frontier, j) => {
			if(count + frontier.length <= n){
				count += frontier.length;
				frontier.forEach((individual) => {
					population.push(individual);
				})
			}
			else{
				lastFrontier = frontier;
				return true;
			}
		});
		CrowdingDistance(n - count, lastFrontier).forEach((individual) => {
			population.push(individual);
		})
		evaluate(i, population);
		let children = Reproduction(population, n / 2);
		async.each(children, function(child, next){
			var fitness = {
				solution : child.solution,
				obj2 : obj2(child.solution)
			}
			obj1(child.solution, (err, obj1) => {
				fitness.obj1 = obj1;
				population.push(fitness);
				next();
			});
		}, callback);
	}, function(){
		console.log('Listo')
	})
})
