export default {
	"up" : {
		"loop": (i, length) => {
			return (i < length - 1) ? i += 1 : 0;
		},
		"name": "Up"
	},
	"random" : {
		"loop": (i, length) => {
			return Math.floor(Math.random() * length);
		},
		"name": "Random"
	}
}