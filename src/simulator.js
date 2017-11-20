function Simulator(canvas){
	var that = this;

	async.parallel({
		solution : function(callback){
			ajax().get('solution.json').then(callback.bind({}, false));
		}
	}, function(err, data){
		for(var attr in data){
			that[attr] = data[attr][0];
		}
		that.simulate();
	})

	that.simulate = function(){
		var worker = new Worker('src/workers/simulator.js');
		worker.onmessage = function(event) {

		};
		worker.postMessage({
			action : 'simulate',
			solution : that.solution
		})
	}
}
