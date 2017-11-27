vector<Solution*> crossover(vector<Solution*>& population){
	vector<Solution*> children;
	for(short i=0; i< POPULATION/2; i++){
		Solution *p1 = population[i];
		Solution *p2 = population[POPULATION - 1 - i];
		int n = p1->n;
		Solution *c1 = new Solution(n);
		Solution *c2 = new Solution(n);
		for(short j=0; j<n; j++){
			Cromosome *cp1 = p1->cromosomes[j];
			Cromosome *cp2 = p2->cromosomes[j];
			int n2 = cp1->n;
			Cromosome *cc1 = new Cromosome(n2);
			Cromosome *cc2 = new Cromosome(n2);
			cc1->stations = cp1->stations;
			cc2->stations = cp2->stations;
			n2++;
			short bitSplitter = rand() % n2;
			for(short k=0; k<n2; k++){
				if(k<bitSplitter){
					cc1->adn[k] = cp1->adn[k];
					cc2->adn[k] = cp2->adn[k];
				}
				else{
					cc1->adn[k] = cp2->adn[k];
					cc2->adn[k] = cp1->adn[k];
				}
			}
			if(dices() < MUTATION){
				short mutationBit = rand() % 2;
				if(cc1->adn[mutationBit] == 1){
					cc1->adn[mutationBit] = 0;
				}
				else{
					cc1->adn[mutationBit] = 1;
				}
			}
			if(dices() < MUTATION){
				short mutationBit = rand() % 2;
				if(cc2->adn[mutationBit] == 1){
					cc2->adn[mutationBit] = 0;
				}
				else{
					cc2->adn[mutationBit] = 1;
				}
			}
			c1->cromosomes.push_back(cc1);
			c2->cromosomes.push_back(cc2);
		}
		children.push_back(c1);
		children.push_back(c2);

	}
	return children;
}
