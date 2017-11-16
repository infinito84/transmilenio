function Canvas() {
	var that = this;

    this.context = document.querySelector('canvas').getContext('2d');

    this.draw = function() {
		// dibujamos estaciones
		this.stations.forEach(function(station){
			that.context.fillStyle = station.troncal_color;
			that.context.fillRect(station.localizacion.lng,1000 - station.localizacion.lat,10,10);
		})
		console.log(lat, lng)
	}

    ajax().get('data.json').then(function(data) {
        that.stations = data.coordenadas;
		that.draw();
    });
}
