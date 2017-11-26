using namespace std;

class Cromosome{
public:
	bool *adn;
	string *stations;
	int n;

	Cromosome(int n);
	Cromosome(Cromosome& cromosome);
	string toString();
};

Cromosome::Cromosome(int num){
	n = num;
	adn = new bool[n+1];
	stations = new string[n];
	adn[n] = 1;
}

Cromosome::Cromosome(Cromosome& that){
	n = that.n;
	adn = new bool[n+1];
	stations = that.stations;
	for(short i = 0; i<n; i++){
		adn[i] = dices() < 0.5;
	}
	adn[n] = dices() > MUTATION;
}

string Cromosome::toString(){
	stringstream res;
	for(short i = 0; i< n; i++){
		if(adn[i]){
			res << "1";
		}
		else{
			res << "0";
		}
	}
	if(adn[n]){
		res << "[1]\n";
	}
	else{
		res << "[0]\n";
	}
	return res.str();
}
