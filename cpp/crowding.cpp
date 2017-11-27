using namespace rapidjson;
using namespace std;

struct Sorting {
	int what;
	bool operator() (Solution *i,Solution *j) {
		if(what == 1){
			return i->objective1 < j->objective1;
		}
		if(what == 2){
			return i->objective2 < j->objective2;
		}
		if(what == 3){
			return i->crowding > j->crowding;
		}
	}
} sorter;

void normalize(vector<Solution*>& frontier){
	double max1 = 0;
	double max2 = 0;
	for(short i=0; i<frontier.size();i++){
		if(frontier[i]->objective1 > max1){
			max1 = frontier[i]->objective1;
		}
		if(frontier[i]->objective2 > max2){
			max2 = frontier[i]->objective2;
		}
	}
	for(short i=0; i<frontier.size();i++){
		frontier[i]->nobj1 = frontier[i]->objective1 / max1;
		frontier[i]->nobj2 = frontier[i]->objective2 / max2;
		frontier[i]->crowding = 0;
	}
}

vector<Solution*> crowding(short n, vector<Solution*>& frontier){
	normalize(frontier);
	sorter.what = 1;
	sort(frontier.begin(), frontier.end(), sorter);
	for(short i=0; i<frontier.size();i++){
		if(i == 0) frontier[i]->crowding += RAND_MAX;
		else if(i == frontier.size() - 1) frontier[i]->crowding += RAND_MAX;
		else{
			frontier[i]->crowding += frontier[i - 1]->nobj1 + frontier[i + 1]->nobj1;
		}
	}
	sorter.what = 2;
	sort(frontier.begin(), frontier.end(), sorter);
	for(short i=0; i<frontier.size();i++){
		if(i == 0) frontier[i]->crowding += RAND_MAX;
		else if(i == frontier.size() - 1) frontier[i]->crowding += RAND_MAX;
		else{
			frontier[i]->crowding += frontier[i - 1]->nobj2 + frontier[i + 1]->nobj2;
		}
	}
	sorter.what = 3;
	sort(frontier.begin(), frontier.end(), sorter);
	vector<Solution*> last;
	for(short i=0; i<n; i++){
		last.push_back(frontier[i]);
	}
	return last;
}
