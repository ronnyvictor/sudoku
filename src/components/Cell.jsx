import { useContext, useRef, useState, useEffect } from 'react'
import { BoardContext } from '../App'
import { findConflicts } from '../utils/findConflicts'
// import { findConflicts } from '../utils/findConflicts'
import Notes from './Notes'

export default function Cell({ board, value, row, col }) {
	const {
		removedVals,
		setRemovedVals,
		setDone,
		done,
		reset,
		notesShowing,
		setConflicts,
	} = useContext(BoardContext)
	const cellInput = useRef()
	const [input, setInput] = useState('')
	const id = `${row}-${col}`

	useEffect(() => {
		if (reset) {
			setInput('')
		}
	}, [reset])

	useEffect(() => {
		for (let i = 0; i < removedVals.length; i++) {
			const { rowIndex, colIndex, val } = removedVals[i]
			const cell = board[rowIndex][colIndex]
			if (row === rowIndex && col === colIndex) {
				if (Number(cell) === val) {
					removedVals[i].correct = true
					setRemovedVals(removedVals)
				}
				if (Number(cell) !== val) {
					removedVals[i].correct = false
					setRemovedVals(removedVals)
				}
				if (!input) {
					removedVals[i].correct = false
					setRemovedVals(removedVals)
				}
				if (removedVals.every(removedVal => removedVal.correct)) {
					setDone(true)
				}
			}
		}
	}, [input, board])

	const onChange = e => {
		setInput(e.target.value)
		board[row][col] = e.target.value || 0

		if (e.target.value.length > 1) {
			const newNum = e.target.value.charAt(1)
			if (newNum === e.target.value.charAt(0)) {
				setInput('')
				board[row][col] = 0
			} else {
				setInput('')
				board[row][col] = 0
				setTimeout(() => {
					board[row][col] = newNum
					setInput(newNum)
				}, 0)
			}
		}
	}

	// console.log(conflicts)
	useEffect(() => {
		setConflicts(findConflicts(board))
	}, [input, board])

	return (
		<div
			className={`flex-cell border-cell text-cell ${
				(row === 0 && col === 0 && 'rounded-tl-2xl') ||
				(row === 0 && col === 8 && 'rounded-tr-2xl') ||
				(row === 8 && col === 8 && 'rounded-br-2xl') ||
				(row === 8 && col === 0 && 'rounded-bl-2xl') ||
				''
			}`}
		>
			{!value || typeof value === 'string' ? (
				<div className='flex-cell'>
					{(!notesShowing || typeof value === 'string') && (
						<div
							className='flex-cell cursor-text'
							onClick={() => {
								cellInput.current.focus()
							}}
						>
							<input
								id={id}
								ref={cellInput}
								type='number'
								value={input}
								autoComplete='off'
								disabled={done}
								className='cell-input flex-cell text-center font-extralight caret-sand-900/80 focus:outline-none dark:caret-yuma'
								onChange={e => onChange(e)}
								onWheel={e => e.target.blur()}
								onKeyDown={e =>
									['0', 'e', 'E', '+', '-', '.'].includes(e.key) &&
									e.preventDefault()
								}
							/>
						</div>
					)}
					{/* {notesShowing && !value && <Notes cellId={id} />} */}
					<div
						className="gap-x-2' grid grid-cols-3 gap-x-2"
						style={{ display: (value || !notesShowing) && 'none' }}
					>
						<Notes cellId={id} value={value} />
					</div>
				</div>
			) : (
				<span
					id={id}
					className='cell-static flex-cell'
					style={{ backgroundColor: 'transparent' }}
				>
					{value}
				</span>
			)}
		</div>
	)
}
