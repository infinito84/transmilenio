function Station(station){
	this.id = station.id;
	this.time = station.time;
	this.passengers = [];

	this.sumTime = function(){
		this.passengers.forEach(function(p){
			p.time++;
		})
	}
}
