using namespace rapidjson;
using namespace std;

class Station{
public:
	string id;
	string name;
	double time;
	vector<Passenger*> passengers;
	Station(string i, string n, double t);
	Station(Station *station);
	void sumTime();
	static vector<Station*> loadStations(Document& trunks);
};

Station::Station(string i, string n, double t){
	id = i;
	name = n;
	time = t;
}

void Station::sumTime(){
	for(short j = 0; j<passengers.size(); j++){
		passengers[j]->time++;
	}
}

vector<Station*> Station::loadStations(Document& trunks){
	vector<Station*> stations;
	Value::ConstMemberIterator itr = trunks["stations"].MemberBegin();
	while(itr != trunks["stations"].MemberEnd()){
		string i = itr->name.GetString();
		string n = itr->value["name"].GetString();
		double t = itr->value["time"].GetDouble();
		stations.push_back(new Station(i, n, t));
		itr++;
	}
	return stations;
}
