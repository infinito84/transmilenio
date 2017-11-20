function Simulator(canvas){
	var that = this;
	var t = '?_'+Date.now();

	async.parallel({
		passengers : function(callback){
			ajax().get('passengers.json'+t).then(callback.bind({}, false));
		},
		solution : function(callback){
			ajax().get('solution.json'+t).then(callback.bind({}, false));
		},
		data : function(callback){
			ajax().get('trunks.json'+t).then(callback.bind({}, false));
		}
	}, function(err, data){
		for(var attr in data){
			that[attr] = data[attr][0];
		}
		console.log('ok', that.passengers[0])
	})
}
