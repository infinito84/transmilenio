#include <iostream>
#include <stdio.h>
#include <time.h>
#include <string>
#include <sstream>
#include <cstdlib>
#include "rapidjson/document.h"
#include "constants.h"
#include "utils.cpp"
//#include "population.cpp"
#include "cromosome.cpp"
#include "solution.cpp"
#include "objective1.cpp"

using namespace std;
using namespace rapidjson;

int main() {
	cout << "NSGA II" << endl;
	Document jsonSolution;
	jsonSolution.Parse(readFile("../solution.json"));

	// Obtenemos solución actual
	Solution current(jsonSolution);
	objective1(current);
	cout << current.objective1 << endl;;

	// Creamos N individuos aleatorios (basados en solución actual)
	// y calculamos fitness
	Solution *population = (Solution*) malloc(N * sizeof(Solution*));
	for(short i=0; i< N; i++){
		population[i] = Solution(current);
		objective1(population[i]);
	}


    return 0;
}

// g++ main.cpp -o bin/main
// time ./bin/main
