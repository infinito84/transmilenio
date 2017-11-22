var dominates = function(a, b){
	return (a.obj1 <= b.obj1 && a.obj2 <= b.obj2) && (a.obj1 < b.obj1 || a.obj2 < b.obj2);
}

module.exports = function(data){

	let frontiers = [];
	while(data.length){
		var no = [];
		var si = [];
		for(var i=0; i < data.length; i++){
			var howManyDominates = 0;
			for(var j=0; j<data.length; j++){
				if(j === i) continue;
				if(dominates(data[j], data[i])){
					howManyDominates++;
				}
			}
			if(!howManyDominates){
				no.push(data[i]);
			}
			else{
				si.push(data[i]);
			}
		}
		data = si;
		frontiers.push(no);
	}
	return frontiers;
}
