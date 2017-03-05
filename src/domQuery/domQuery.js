export default (id) => {
	const element = document.getElementById(id);
	return {
		html : (markup) => {
			if( markup ){
				element.innerHTML = markup;
			} else {
				return element.innerHTML;
			}
		},
		el: element
	}
}