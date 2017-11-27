using namespace std;

double objective2(Solution *solution, vector<Station*>& ss, vector<Passenger*>& pp){
	vector<Station*> stations = Station::clone(ss);
	vector<Passenger*> passengers = Passenger::clone(pp);
	solution->update(stations);

	vector<Bus*> buses;

	for(short j=0; j<FLEET; j++){
		buses.push_back(new Bus(solution->cromosomes[j % solution->n]));
	}
	for(short i=START; i<END; i++){
		int to = 0;
		for(int j=0; j<passengers.size(); j++){
			if(passengers[j]->minute > i){
				to = j;
				break;
			}
			Station *s = getStation(stations, passengers[j]->from);
			s->passengers.push_back(passengers[j]);
		}
		if(to > 0){
			passengers.erase(passengers.begin(), passengers.begin() + to);
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
	int count = 0;
	for(short j=0; j<buses.size(); j++){
		if(buses[j]->totalMinutes > 0){
			total += (double)buses[j]->totalMinutes;
			count += buses[j]->success;
		}
	}
	cout << total << ": " << count << endl;

	solution->objective2 = total;
	return solution->objective2;
}
