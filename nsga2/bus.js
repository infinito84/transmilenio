module.exports = function Bus(route, stations, transmi){
	var that = this;
	this.passengers = {};
	route.where = route.where || 0;
	route.where = route.where > route.stations.length - 2 ? 0 : route.where;
	this.count = route.where;
	this.minutes = 0;
	this.n = 0;
	this.success = 0;
	this.totalMinutes = 0;

	this.calc = function(){
		this.station = route.stations[this.count];
		this.nextStation = route.stations[this.count + 1];

		if(this.minutes === 0){
			for(var i = stations[this.station].passengers.length - 1; i >= 0; i--){
				var p = stations[this.station].passengers[i];
				if(route.stop[p.from] && route.stop[p.to] && that.n < transmi.limitPerBus){
					that.passengers[p.to] = that.passengers[p.to] || [];
					that.passengers[p.to].push(p);
					that.n++;
					stations[this.station].passengers.splice(i, 1);
				}
			}
			var pass = this.passengers[this.station];
			if(pass){
				that.n -= pass.length;
				delete this.passengers[this.station];
				this.success += pass.length;
			}
		}
		else{
			if(stations[this.nextStation].time === this.minutes){
				this.minutes = -1;
				this.count++;

				var pass = this.passengers[this.station];
				if(this.count === route.stations.length - 1){
					//console.log('Total: '+this.totalMinutes);
					this.passengers = {};
					this.n = 0;
					this.count = 0;
					this.totalMinutes = 0;
					if(pass){
						this.success += pass.length;
					}
				}
			}
		}
		this.minutes++;
		this.totalMinutes++;
	}

	this.sumTime = function(){
		for(var to in this.passengers){
			for(var j=0; j< this.passengers[to].length; j++){
				this.passengers[to][j].time++;
			}
		}
	}
}
