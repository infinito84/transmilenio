using namespace rapidjson;
using namespace std;

class Passenger{
public:
	string from;
	string to;
	short minute;
	short time;
	Passenger(string a, string b, short t);
	static vector<Passenger*> loadPassengers(Document& json);
	static vector<Passenger*> clone(vector<Passenger*>& pp);
};

Passenger::Passenger(string a, string b, short t){
	from = a;
	to = b;
	minute = t;
	time = 0;
}

vector<Passenger*> Passenger::loadPassengers(Document& json){
	vector<Passenger*> passengers;
	Value::ConstMemberIterator itr = json.MemberBegin();
	while(itr != json.MemberEnd()){
		short t = boost::lexical_cast<short>(itr->name.GetString());
		short size = itr->value.Size();
		for(short i=0; i< size; i++){
			string a = itr->value[i]["from"].GetString();
			string b = itr->value[i]["to"].GetString();
			passengers.push_back(new Passenger(a, b, t));
		}
		itr++;
	}
	return passengers;
}

vector<Passenger*> Passenger::clone(vector<Passenger*>& ss){
	vector<Passenger*> passengers;
	for(long i=0; i< ss.size(); i++){
		passengers.push_back(new Passenger(ss[i]->from, ss[i]->to, ss[i]->minute));
	}
	return passengers;
}
