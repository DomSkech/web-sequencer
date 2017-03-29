
const isGoingUp = (i, length) => {
	return (i < length - 1) ? i += 1 : 0;
}

const isGoingDown = (i, length) => {
	return (i > 0) ? i += -1 : length -1;
}

let dirUp = true;

export default {
	"up" : {
		"loop": (i, length) => {
			return isGoingUp(i, length);
		},
		"name": "Up"
	},
	"down" : {
		"loop": (i, length) => {
			return isGoingDown(i, length);
		},
		"name": "Down"
	},
	"updown" : {
		"loop": (i, length) => {
			dirUp = dirUp || (i === 0);
			dirUp = (i === length - 1) ? false : dirUp;

			return dirUp ? i +=1 : i -= 1;
		},
		"name": "Up <=> Down"
	},
	"random" : {
		"loop": (i, length) => {
			return Math.floor(Math.random() * length);
		},
		"name": "Random"
	}
}