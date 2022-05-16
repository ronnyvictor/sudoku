import { useContext } from 'react'
import { BoardContext } from '../App'

export default function ButtonGroup() {
	const {
		board,
		removedVals,
		setBoard,
		setDone,
		setPaused,
		setReset,
		notesShowing,
		setNotesShowing,
		done,
	} = useContext(BoardContext)

	const showHideNotes = () => {
		if (!done) {
			setNotesShowing(!notesShowing)
		}
	}

	const solveBoard = () => {
		setDone(true)
		setPaused(true)
		for (let i = 0; i < removedVals.length; i++) {
			let solvedBoard = board
			const { rowIndex, colIndex, val } = removedVals[i]
			solvedBoard[rowIndex][colIndex] = val
			// ids.push(`${rowIndex}-${colIndex}`)
			// console.table(solvedBoard)
			setBoard(board)
		}
	}

	const resetBoard = () => {
		setReset(true)
	}

	return (
		<div className='mt-4 flex justify-between px-1'>
			<div className='space-x-3'>
				<button className='btn btn-primary' onClick={solveBoard}>
					Solve
				</button>
				<button className='btn btn-primary ' onClick={resetBoard}>
					New Board
				</button>
			</div>
			<button onClick={showHideNotes}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className={`h-7 w-7 ${
						!notesShowing
							? 'stroke-sand-900/80 dark:stroke-tallow'
							: 'stroke-cyprus-600 dark:stroke-cyprus-400'
					}`}
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
					/>
				</svg>
			</button>
		</div>
	)
}
