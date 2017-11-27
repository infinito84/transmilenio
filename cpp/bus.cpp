class Bus{
public:
	vector<Passenger*> passengers;
	short count;
	short minutes;
	short n;
	short success;
	short totalMinutes;
	Cromosome *route;

	Bus(Cromosome *r);
};

Bus::Bus(Cromosome *r){
	count = 0;
	minutes = 0;
	n = 0;
	success = 0;
	totalMinutes = 0;
	route = r;
}
