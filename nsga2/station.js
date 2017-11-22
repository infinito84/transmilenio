module.exports = function Station(station){
	this.id = station.id;
	this.time = station.time;
	this.passengers = [];
	this.negative = 0;

	this.sumTime = function(){
		for(var i = this.passengers.length -1; i>=0; i--){
			this.passengers[i].time++;
			if(this.passengers[i].time > 15){
				this.passengers.splice(i, 1);
				this.negative++;
			}
		}
	}
}
