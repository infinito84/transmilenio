function Canvas() {
	var that = this;

    this.context = document.querySelector('canvas').getContext('2d');
	this.stations = [];
	var points = 30000;

    this.draw = function() {
		that.context.clearRect(0,0,1000,850);
		// dibujamos estaciones
		that.stations.forEach(function(station){
			that.context.beginPath();
			that.context.rect(station.localizacion.lng,1000 - station.localizacion.lat,10,10);
			that.context.lineWidth = 2;
			that.context.strokeStyle = station.troncal_color;
			that.context.stroke();
		});

		for(var i=0;i<points;i++){
			var x = Math.random() * 1000;
			var y = Math.random() * 850;
		}
	}

    ajax().get('data.json').then(function(data) {
        that.stations = data.coordenadas;
    });

	setInterval(this.draw, 50);
}
