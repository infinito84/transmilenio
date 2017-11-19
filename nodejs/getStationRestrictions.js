const solution = require('../solution.json');
const fs = require('fs');

let max = 0;
let whoMax = '';
let restrictions = {};

solution.forEach(route =>{
	for(let i=0; i<route.length - 2; i++){
		let a = route[i].station;
		let b = route[i+1].station;
		restrictions[a] = restrictions[a] || {};
		restrictions[a][b] = 1;
		let howMany = Object.keys(restrictions[a]).length ;
		if(howMany > max){
			max = howMany;
			whoMax = a;
			console.log(whoMax, max);
		}
	}
});

console.log('The station with most available transshipments is: '+ whoMax +' with: '+ max);
fs.writeFile('../restrictions.json', JSON.stringify(restrictions, null,'\t'), (err) => {
	if(err) return console.error(err);
	console.log('Restrictions saved')
})
