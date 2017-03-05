export default {
	render: (list, valProp, nameProp, id = '') => {
		let markup = `<select id=${id}>`;

		list.forEach((item) => {
			markup += `<option value=${item[valProp]} >${item[nameProp]}</option>`;
		});

		markup += "</select>";
		return markup;
	}
}