import { useState, createContext, useEffect } from 'react'
import { createBoard } from './utils/createBoard'
import Board from './components/Board'
import Header from './components/Header'

export const BoardContext = createContext()

const difficulties = [
	{
		name: 'easy',
		hiddenCells: Math.floor(Math.random() * (32 - 25 + 1) + 32),
		// hiddenCells: 2,
	},
	{
		name: 'medium',
		hiddenCells: Math.floor(Math.random() * (40 - 33 + 1) + 40),
	},
	{
		name: 'hard',
		hiddenCells: Math.floor(Math.random() * (45 - 40 + 1) + 45),
	},
]

export default function App() {
	const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0])
	const [grid, setGrid] = useState(createBoard(selectedDifficulty.hiddenCells))
	const [board, setBoard] = useState(grid.board)
	const [removedVals, setRemovedVals] = useState(grid.removedVals)
	const [conflicts, setConflicts] = useState([])
	const [done, setDone] = useState(false)
	const [reset, setReset] = useState(false)
	const [timer, setTimer] = useState({ minutes: 0, seconds: 0 })
	const [paused, setPaused] = useState(false)
	const [notesShowing, setNotesShowing] = useState(false)

	const [isDark, setIsDark] = useState(false)

	// console.table(board)
	// console.log(removedVals

	useEffect(() => {
		if (reset) {
			// resetBoardColors()
			setGrid(createBoard(selectedDifficulty.hiddenCells))
			setBoard([...grid.board])
			setRemovedVals(grid.removedVals)
			setDone(false)
			setPaused(false)
			setTimer({ minutes: 0, seconds: 0 })
			setNotesShowing(false)
			setConflicts([])
			const boardElement = document.getElementById('board')
			const buttonElements = boardElement.getElementsByTagName('button')
			for (let i = 0; i < buttonElements.length; i++) {
				buttonElements[i].classList.replace('note-highlight', 'note-default')
			}
		}
		setReset(false)
	}, [board, reset])

	useEffect(() => {
		setBoard(grid.board)
		setRemovedVals(grid.removedVals)
		if (done) {
			setPaused(true)
			setNotesShowing(false)
			const boardElement = document.getElementById('board')
			const spanElements = boardElement.getElementsByTagName('SPAN')
			for (let i = 0; i < spanElements.length; i++) {
				spanElements[i].classList.replace('cell-conflict', 'cell-static')
			}
			for (let i = 0; i < removedVals.length; i++) {
				const removedValId = `${removedVals[i].rowIndex}-${removedVals[i].colIndex}`
				const cell = document.getElementById(removedValId)
				cell.classList.replace('cell-static', 'cell-input')
			}
		}
	}, [board, done])

	useEffect(() => {
		// if (!conflicts.length) {
		const boardElement = document.getElementById('board')
		const inputElements = boardElement.getElementsByTagName('INPUT')
		const spanElements = boardElement.getElementsByTagName('SPAN')
		for (let i = 0; i < inputElements.length; i++) {
			inputElements[i].classList.replace('cell-conflict', 'cell-input')
		}
		for (let i = 0; i < spanElements.length; i++) {
			spanElements[i].classList.replace('cell-conflict', 'cell-static')
			spanElements[i].classList.replace('cell-input', 'cell-static')
		}
		// } else {
		for (let i = 0; i < conflicts.length; i++) {
			const conflictCell = conflicts[i]
			const conflictId = `${conflictCell[0]}-${conflictCell[1]}`
			const conflictElement = document.getElementById(conflictId)
			conflictElement.classList.replace('cell-static', 'cell-conflict')
			conflictElement.classList.replace('cell-input', 'cell-conflict')
		}
		// }
	}, [conflicts])

	useEffect(() => {
		if (isDark) {
			document.body.classList.replace('light', 'dark')
		} else {
			document.body.classList.replace('dark', 'light')
		}
	}, [isDark])

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme')
		if (storedTheme === 'dark') {
			setIsDark(true)
		} else {
			setIsDark(false)
		}
	}, [])

	useEffect(() => {
		const storedDifficulty = localStorage.getItem('difficulty')
		if (storedDifficulty === 'easy') {
			setSelectedDifficulty(difficulties[0])
		}
		if (storedDifficulty === 'medium') {
			setSelectedDifficulty(difficulties[1])
		}
		if (storedDifficulty === 'hard') {
			setSelectedDifficulty(difficulties[2])
		}
	}, [])

	return (
		<BoardContext.Provider
			value={{
				board,
				setBoard,
				removedVals,
				setRemovedVals,
				setDone,
				createBoard,
				setGrid,
				grid,
				done,
				timer,
				setTimer,
				paused,
				setPaused,
				selectedDifficulty,
				setSelectedDifficulty,
				difficulties,
				setReset,
				reset,
				isDark,
				setIsDark,
				notesShowing,
				setNotesShowing,
				setConflicts,
			}}
		>
			<Header />
			<Board board={board} />
		</BoardContext.Provider>
	)
}
