class Bus{
public:
	vector<Passenger*> passengers;
	short count;
	short temp;
	short minutes;
	short n;
	short success;
	short totalMinutes;
	Cromosome *route;

	Bus(Cromosome *r);
	void calc();
	void sumTime();
};

Bus::Bus(Cromosome *r){
	count = rand() % (r->n - 2);
	temp = count;
	minutes = 0;
	n = 0;
	success = 0;
	totalMinutes = 0;
	route = r;
}

Station *getStation(vector<Station*>& stations, string name){
	for(short i=0; i< stations.size(); i++){
		if(stations[i]->id.compare(name) == 0){
			return stations[i];
		}
	}
	return NULL;
}

void Bus::calc(){
	Station *station = route->stations[count];
	Station *nextStation = route->stations[count+1];
	if(minutes == 0){
		if(route->adn[count]){
			for(short i=passengers.size() - 1; i>=0; i--){
				if(passengers[i]->to.compare(station->id) == 0){
					n--;
					success++;
					totalMinutes += passengers[i]->time;
					passengers.erase(passengers.begin() + i);
				}
			}
			for(short i = station->passengers.size() - 1; i>=0 && n <= LIMIT; i--){
				if(getStation(route->stations, station->passengers[i]->to) != NULL){
					passengers.push_back(station->passengers[i]);
					n++;
					station->passengers.erase(station->passengers.begin() + i);
				}
			}
		}
	}
	else{
		if(nextStation->time == minutes){
			minutes = -1;
			count++;
			if(count == route->stations.size() - 1){
				for(short i=passengers.size() - 1; i>=0; i--){
					totalMinutes += passengers[i]->time;
				}
				success += passengers.size();
				passengers.clear();
				n = 0;
				count = temp;
			}
		}
	}
	minutes++;
}

void Bus::sumTime(){
	for(short j = 0; j<passengers.size(); j++){
		passengers[j]->time++;
	}
}
