using namespace rapidjson;
using namespace std;

void evaluate(short i, vector<Solution*>& population){
	double obj1 = 0;
	double obj2 = 0;
	for(short j = 0; j < population.size(); j++){
		obj1 += population[j]->objective1;
		obj2 += population[j]->objective2;
	}
	cout << "Generation #" << i+1 << " obj1: " << obj1 / POPULATION << " obj2: " << obj2 / POPULATION << endl;
}
