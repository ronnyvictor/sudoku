export default function Notes({ cellId }) {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	const highlightNumber = number => {
		const id = `${cellId}-${number}`
		const element = document.getElementById(id)
		if (element.classList.value === 'note-default') {
			element.classList.replace('note-default', 'note-highlight')
		} else if (element.classList.value === 'note-highlight') {
			element.classList.replace('note-highlight', 'note-default')
		}
	}

	return numbers.map(number => (
		<button
			key={number}
			id={`${cellId}-${number}`}
			className='note-default'
			onClick={() => highlightNumber(number)}
		>
			{number}
		</button>
	))
}
