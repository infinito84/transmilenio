function PeeksAndValleys(){
	var that = this;
	var xmin = 10;
	var xmax = 410;
	var ymax = 10;
	var ymin = 60;

	that.minutes = [];

	that.draw = function(context){
		context.beginPath();
		context.moveTo(xmin, ymin);
		that.minutes.forEach(function(el){
			var x = xmin + el.min * xmax / that.end;
			var y = (ymin) - (el.per * (ymin - ymax) / 1000)
			context.lineTo(x, y);
		});
		context.stroke();
	}

	ajax().get('minutes.json?_'+Date.now()).then(function(data) {
        that.minutes = data.minutes;
		that.end = data.end;
    });
}
