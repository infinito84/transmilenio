function Bus(route, stations, transmi){
	var that = this;
	this.passengers = {};
	this.count = 0;
	this.minutes = 0;
	this.n = 0;

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
		}
		else{
			if(stations[this.nextStation].time === this.minutes){
				this.minutes = 0;
				this.count++;
				if(this.count === route.stations.length - 1){
					this.passengers = {};
					this.n = 0;
					this.count = 0;
					return;
				}
				if(route.stop[this.nextStation]){
					var pass = this.passengers[this.nextStation];
					if(pass){
						that.n -= pass.length;
						delete this.passengers[this.nextStation];
					}
					for(var i = stations[this.nextStation].passengers.length - 1; i >= 0; i--){
						var p = stations[this.nextStation].passengers[i];
						if(route.stop[p.from] && route.stop[p.to] && that.n < transmi.limitPerBus){
							that.passengers[p.to] = that.passengers[p.to] || [];
							that.passengers[p.to].push(p);
							that.n++;
							stations[this.nextStation].passengers.splice(i, 1);
						}
					}
				}
			}
		}
		this.minutes++;
	}

	this.sumTime = function(){
		for(var to in this.passengers){
			for(var j=0; j< this.passengers[to].length; j++){
				this.passengers[to][j].time++;
			}
		}
	}
}
