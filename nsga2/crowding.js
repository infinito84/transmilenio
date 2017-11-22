let normalize = (array) => {
	let max = 0;
	array.forEach(item => {
		max = item.n > max ? item.n : max;
	})
	return array.map(item => {
		return {n : item.n / max, w: item};
	});
}

module.exports = (n, frontier) => {
	if(n === 0) return [];
	let obj1 = normalize(frontier.map(f => {
		return {n: f.obj1, w: f}
	}).sort((a,b)=>{
		return a.n - b.n;
	}));
	let obj2 = normalize(frontier.map(f => {
		return {n: f.obj2, w: f}
	}).sort((a,b)=>{
		return a.n - b.n;
	}));
	frontier.forEach((w) => {
		w.crowding = 0;
	})
	obj1.forEach((item, i) => {
		if(i===0) item.w.crowding = Infinity;
		else if(i === obj1.length - 1) item.w.crowding = Infinity;
		else{
			item.w.crowding += obj1[i-1].n + obj1[i+1].n
		}
	})
	obj2.forEach((item, i) => {
		if(i===0) item.w.crowding = Infinity;
		else if(i === obj1.length - 1) item.w.crowding = Infinity;
		else{
			item.w.crowding += obj2[i-1].n + obj2[i+1].n
		}
	});
	let elements = frontier.sort((a,b) => {
		return a.crowding > b.crowding;
	}).slice(0, n)
	//console.log('crowding: '+ elements.length);
	return elements;
}
