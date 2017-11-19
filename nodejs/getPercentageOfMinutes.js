const fs = require('fs');
const transmi = require('../trunks.json').transmi;
const smoothTimes = 20;
const minutesArround = 5;

let isPeek = (min) => {
	let is = false;
	transmi.peeks.forEach(peek =>{
		is = is || (peek.from <= min && min <= peek.to)
	});
	return is;
}

let getMinutes = () => {
	let minutes = [];
	for(let i=transmi.start; i < transmi.end; i++){
		minutes.push({
			min : i,
			per : isPeek(i) ? 1000 : 100
		})
	}
	return minutes;
}


let smooth = (minutes) => {
	minutes.forEach((el, i) => {
		let min = el.per;
		let max = el.per;
		for(let j = 1; j < minutesArround; j++){
			let prev = minutes[i-j];
			let next = minutes[i+j];
			if(prev){
				if(prev.per < min) min = prev.per;
				if(prev.per > max) max = prev.per;
			}
			if(next){
				if(next.per < min) min = next.per;
				if(next.per > max) max = next.per;
			}
		}
		el.per = parseInt((min + max) / 2);
	})
}

let minutes = getMinutes();
for(let i=0; i< smoothTimes; i++){
	smooth(minutes);
}

let total = 0;
minutes.forEach(el => {
	total += el.per;
})

fs.writeFile('../minutes.json', JSON.stringify({
	total, minutes, end : transmi.end
}, null,'\t'), (err) => {
	if(err) return console.error(err);
	console.log('Minutes percentage saved')
})
