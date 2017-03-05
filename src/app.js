import midi from "./midi/midi"
import select from "./select/select"
import $$ from "./domQuery/domQuery"

const dom = $$('dom');

midi
.initialize()
.then((midiStream) => {
	let markup = select.render(midiStream.outputs, 'id', 'name', 'port');
	markup += '<button id="playButton">Play note</button>';

	dom.html(markup);

	$$('playButton').el.onclick = () => {
		midi.play($$('port').el.value, 57, 300, 1);
	}
});