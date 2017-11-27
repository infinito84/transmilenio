using namespace std;

double objective2(Solution *solution, vector<Station*> stations){
	vector<Bus*> buses;
	for(short j=0; j<FLEET; j++){
		buses.push_back(new Bus(solution->cromosomes[j % solution->n]));
	}

	return solution->objective2;
}
