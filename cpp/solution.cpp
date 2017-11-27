using namespace rapidjson;
using namespace std;

class Solution{
public:
	int n;
	double objective1;
	double objective2;
	vector<Cromosome*> cromosomes;

	Solution(Document& jsonSolution, vector<Station*> stations);
	Solution(Solution* solution);
	string toString();
	void update(vector<Station*> stations);
};

Solution::Solution(Document& jsonSolution, vector<Station*> stations){
	n = jsonSolution.Size();
	for (short j = 0; j < n; j++) {
		Value& route = jsonSolution[j];
		cromosomes.push_back(new Cromosome(route["stations"].Size()));
		for (short k = 0; k < cromosomes[j]->n; k++){
			const char *station = route["stations"][k].GetString();
			for(short i = 0; i < stations.size(); i++){
				if(stations[i]->id.compare(station) == 0){
					cromosomes[j]->stations.push_back(stations[i]);
					cromosomes[j]->adn[k] = route["stop"].HasMember(station) ? 1 : 0;
					break;
				}
			}
		}
	}
}

Solution::Solution(Solution* solution){
	n = solution->n;
	for(short i=0; i< n; i++){
		cromosomes.push_back(new Cromosome(solution->cromosomes[i]));
	}
}

void Solution::update(vector<Station*> stations){
	for(short i=0; i< n; i++){
		cromosomes[i]->update(stations);
	}
}

string Solution::toString(){
	stringstream res;
	res << "[\n";
	for(short i = 0; i < n; i++){
		res << "\t" << cromosomes[i]->toString();
	}
	res << "]\n";
	return res.str();
}
