using namespace std;

class Cromosome{
public:
	short *adn;
	vector <Station*> stations;
	int n;

	Cromosome(int n);
	Cromosome(Cromosome *cromosome);
	string toString();
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

string Cromosome::toString(){
	stringstream res;
	for(short i = 0; i< n; i++){
		res << adn[i];
	}
	res << "[" << adn[n] << "]\n";
	return res.str();
}
