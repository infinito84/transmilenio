#include "constants.cpp"
#include <iostream>
#include <fstream>
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
#include "pareto.cpp"
#include "crowding.cpp"
#include "evaluate.cpp"
#include "crossover.cpp"

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
	objective2(current, stations, passengers);
	writeFile("results/current.txt", current->toString());
	cout << "Reference: " << current->objective1 << "\t" << current->objective2 << endl;

	// Creamos N individuos aleatorios (basados en solución actual)
	// y calculamos fitness
	vector<Solution*> population;
	#pragma omp parallel for
	for(short l=0; l< POPULATION; l++){
		Solution *s = new Solution(current);
		objective1(s);
		objective2(s, stations, passengers);
		population.push_back(s);
	}

	// Evolucionando :)
	for(short i=0; i<GENERATIONS; i++){
		//Ordenamiento
		vector< vector<Solution*> > frontiers = pareto(i, population);
		population.clear();
		short count = 0;
		for(short j=0; j<frontiers.size(); j++){
			vector<Solution*> frontier = frontiers[j];
			if(count + frontier.size() <= POPULATION){
				count += frontier.size();
				for(short k=0; k<frontier.size(); k++){
					population.push_back(frontier[k]);
				}
			}
			else{
				// Crowding distance
				vector<Solution*> last = crowding(POPULATION - count, frontier);
				for(short k=0; k<last.size(); k++){
					population.push_back(last[k]);
				}
			}
		}
		// Evaluación
		evaluate(i, population);
		// Cruce
		vector<Solution*> children = crossover(population);
		// Fitness de los hijos
		#pragma omp parallel for
		for(short l=0; l< children.size(); l++){
			Solution *s = children[l];
			objective1(s);
			objective2(s, stations, passengers);
			population.push_back(s);
		}
	}


    return 0;
}

// g++ main.cpp -o bin/main -fopenmp
// time ./bin/main
