function Canvas() {
	var that = this;
	var context = document.querySelector('canvas').getContext('2d');

	that.stations = [];
	that.peeks = new PeeksAndValleys();

    that.draw = function() {
		context.clearRect(0,0,1000,850);
		// dibujamos estaciones
		that.stations.forEach(function(station){
			context.beginPath();
			context.rect(station.localizacion.lng,1000 - station.localizacion.lat,10,10);
			context.lineWidth = 2;
			context.strokeStyle = station.troncal_color;
			context.stroke();
		});

		that.peeks.draw(context);
	}

    ajax().get('stations.json').then(function(data) {
        that.stations = data.coordenadas;
    });

	setInterval(that.draw, 50);
}
