using namespace rapidjson;
using namespace std;

bool dominates(Solution *a, Solution *b){
	return (a->objective1 <= b->objective1 && a->objective2 <= b->objective2) && (a->objective1 < b->objective1 || a->objective2 < b->objective2);
}

vector< vector<Solution*> > pareto(int g, vector<Solution*>& population){
	vector< vector<Solution*> > frontiers;
	bool show = true;
	while(population.size()){
		vector<Solution*> no;
		vector<Solution*> si;
		for(short i=0; i<population.size();i++){
			short howManyDominates = 0;
			for(short j=0; j<population.size();j++){
				if(j == i) continue;
				if(dominates(population[j], population[i])){
					howManyDominates++;
				}
			}
			if(howManyDominates == 0){
				no.push_back(population[i]);
			}
			else{
				si.push_back(population[i]);
			}
		}
		population = si;
		frontiers.push_back(no);
		if(show){
			stringstream res, res2;
			for(short k=0; k < no.size(); k++){
				res << no[k]->objective1 << "\t" << no[k]->objective2 << "\n";
				if(g == GENERATIONS-1){
					stringstream res3;
					res3 << "solution" << k;
					writeFile(res3.str().c_str(), no[k]->toString());
				}
			}
			res2 << "frontier" << g;
			writeFile(res2.str().c_str(), res.str());
		}
	}
	return frontiers;
}
