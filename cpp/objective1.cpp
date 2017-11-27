using namespace std;

double objective1(Solution *solution){
	double total = 0;
	for(short i = 0; i< solution->n; i++){
		Cromosome *cromosome = solution->cromosomes[i];
		if(!cromosome->adn[cromosome->n]) continue;
		double stops = 0;
		for(short k=0; k< cromosome->n; k++){
			if(cromosome->adn[k]){
				stops++;
			}
		}
		total += (double)cromosome->n / stops;
	}
	solution->objective1 = total / (double)solution->n;
	return solution->objective1;
}
