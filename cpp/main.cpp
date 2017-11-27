#include "constants.cpp"
#include <iostream>
#include <stdio.h>
#include <time.h>
#include <string>
#include <sstream>
#include <cstdlib>
#include <vector>
#include <boost/lexical_cast.hpp>
#include "rapidjson/document.h"
#include "utils.cpp"
#include "passenger.cpp"
#include "station.cpp"
#include "cromosome.cpp"
#include "solution.cpp"
#include "bus.cpp"
#include "objective1.cpp"
#include "objective2.cpp"

using namespace std;
using namespace rapidjson;

int main() {
	cout << "NSGA II" << endl;
	Document jsonSolution, jsonTrunks, jsonPassengers;

	// Obtenemos estaciones
	jsonTrunks.Parse(readFile("../trunks.json"));
	vector<Station*> stations = Station::loadStations(jsonTrunks);

	// Obtenemos pasajeros
	jsonPassengers.Parse(readFile("../passengers.json"));
	vector<Passenger*> passengers = Passenger::loadPassengers(jsonPassengers);

	// Obtenemos solución actual
	jsonSolution.Parse(readFile("../solution.json"));
	Solution *current = new Solution(jsonSolution, stations);
	objective1(current);
	cout << current->toString() << endl;
	// Creamos N individuos aleatorios (basados en solución actual)
	// y calculamos fitness
	vector<Solution*> population;
	for(short i=0; i< POPULATION; i++){
		population.push_back(new Solution(current));
		objective1(population[i]);
	}


    return 0;
}

// g++ main.cpp -o bin/main
// time ./bin/main
