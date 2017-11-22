var async = require('async');
var obj1 = require('./objective1');
var obj2 = require('./objective2');
var solution = require('../solution.json');

var fitness = {
	solution : solution,
	obj2 : obj2(solution)
}
obj1(solution, (err, obj1) => {
	fitness.obj1 = obj1;
	console.log(fitness);
});
