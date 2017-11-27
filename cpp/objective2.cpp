using namespace std;

double objective2(Solution *solution, vector<Station*>& ss, vector<Passenger*>& passengers){
	vector<Station*> stations = Station::clone(ss);
	solution->update(stations);

	vector<Bus*> buses;

	for(short j=0; j<FLEET; j++){
		Cromosome *cromosome = solution->cromosomes[j % solution->n];
		while(!cromosome->adn[cromosome->n]){
			cromosome = solution->cromosomes[rand() % solution->n];
		}
		buses.push_back(new Bus(cromosome));
	}
	int to = 0;
	for(short i=START; i<END; i++){
		for(int j=to; j<passengers.size(); j++){
			if(passengers[j]->minute > i){
				to = j;
				break;
			}
			Station *s = getStation(stations, passengers[j]->from);
			s->passengers.push_back(passengers[j]);
			s->count++;
		}
		for(short j=0; j<buses.size(); j++){
			buses[j]->calc();
			buses[j]->sumTime();
		}
		for(short j=0; j<stations.size(); j++){
			stations[j]->sumTime();
		}
	}
	double total = 0;
	double count = 0;
	for(short j=0; j<buses.size(); j++){
		total += buses[j]->total;
		count += buses[j]->success;
	}
	for(short j=0; j<stations.size(); j++){
		total += stations[j]->total;
		count += stations[j]->count;
	}

	solution->objective2 = total / count;
	return solution->objective2;
}
