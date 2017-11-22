module.exports = (i, data) =>{
	let t1 = 0;
	let t2 = 0;
	data.forEach(function(fitness){
		t1 += fitness.obj1;
		t2 += fitness.obj2;
	})
	console.log('Generation #'+i, 'obj1: '+t1/data.length, 'obj2: '+t2/data.length);
}
