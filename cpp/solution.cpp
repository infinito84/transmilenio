using namespace rapidjson;
using namespace std;

class Solution{
public:
	int n;
	double objective1;
	double objective2;

	Cromosome *cromosomes;
	Solution(Document& jsonSolution);
	Solution(Solution& solution);
	string toString();
};

Solution::Solution(Document& jsonSolution){
	n = jsonSolution.Size();
	cromosomes = (Cromosome*)malloc(n * sizeof(Cromosome*));
	for (SizeType j = 0; j < n; j++) {
		Value& route = jsonSolution[j];
		cromosomes[j] = Cromosome(route["stations"].Size());
		for (SizeType k = 0; k < cromosomes[j].n; k++){
			const char *station = route["stations"][k].GetString();
			cromosomes[j].stations[k] = station;
			cromosomes[j].adn[k] = route["stop"].HasMember(station);
		}
	}
}

Solution::Solution(Solution& solution){
	n = solution.n;
	cromosomes = (Cromosome*)malloc(n * sizeof(Cromosome*));
	for(short i=0; i< n; i++){
		cromosomes[i] = Cromosome(solution.cromosomes[i]);
	}
}

string Solution::toString(){
	stringstream res;
	res << "[\n";
	for(short i = 0; i < n; i++){
		res << "\t" << cromosomes[i].toString();
	}
	res << "]\n";
	return res.str();
}
