using namespace std;

class Cromosome{
public:
	short *adn;
	vector <Station*> stations;
	int n;

	Cromosome(int n);
	Cromosome(Cromosome *cromosome);
	string toString();
	void update(vector<Station*> stations);
};

Cromosome::Cromosome(int num){
	n = num;
	adn = new short[n+1]();
	adn[n] = true;
}

Cromosome::Cromosome(Cromosome *that){
	n = that->n;
	adn = new short[n+1];
	stations = that->stations;
	for(short i = 0; i<n; i++){
		adn[i] = dices() < 0.5;
	}
	adn[n] = dices() > MUTATION;
}

void Cromosome::update(vector<Station*> update){
	for(short i=0; i<n;i++){
		for(short j=0; j<update.size();j++){
			if(stations[i]->id.compare(update[j]->id) == 0){
				stations[i] = update[j];
				break;
			}
		}
	}
}

string Cromosome::toString(){
	stringstream res;
	for(short i = 0; i< n; i++){
		res << adn[i];
	}
	res << "[" << adn[n] << "]\n";
	return res.str();
}
