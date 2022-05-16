export function createBoard(num) {
	const x = null
	let numbers = []
	while (numbers.length < 9) {
		var r = Math.floor(Math.random() * 9) + 1
		if (numbers.indexOf(r) === -1) numbers.push(r)
	}

	let newBoard = [
		numbers,
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
	]

	let newBoard1 = [
		[numbers[0], x, x, x, x, x, x, x, x],
		[numbers[1], x, x, x, x, x, x, x, x],
		[numbers[2], x, x, x, x, x, x, x, x],
		[numbers[3], x, x, x, x, x, x, x, x],
		[numbers[4], x, x, x, x, x, x, x, x],
		[numbers[5], x, x, x, x, x, x, x, x],
		[numbers[6], x, x, x, x, x, x, x, x],
		[numbers[7], x, x, x, x, x, x, x, x],
		[numbers[8], x, x, x, x, x, x, x, x],
	]

	let newBoard2 = [
		[numbers[0], numbers[1], numbers[2], x, x, x, x, x, x],
		[numbers[3], numbers[4], numbers[5], x, x, x, x, x, x],
		[numbers[6], numbers[7], numbers[8], x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
	]

	let newBoard3 = [
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, numbers[0], numbers[1], numbers[2], x, x, x],
		[x, x, x, numbers[3], numbers[4], numbers[5], x, x, x],
		[x, x, x, numbers[6], numbers[7], numbers[9], x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
		[x, x, x, x, x, x, x, x, x],
	]

	function solve(board) {
		if (solved(board)) {
			return board
		} else {
			const possibilities = nextBoards(board)
			const validBoards = keepOnlyValid(possibilities)
			return searchForSolution(validBoards)
		}
	}

	function searchForSolution(boards) {
		// List[Board] -> Board or false
		// finds a valid solution to the sudoku problem
		if (boards.length < 1) {
			return false
		} else {
			// backtracking search for solution
			var first = boards.shift()
			const tryPath = solve(first)
			if (tryPath !== false) {
				return tryPath
			} else {
				return searchForSolution(boards)
			}
		}
	}

	function solved(board) {
		// THIS FUNCTION WORKS.
		// Board -> Boolean
		// checks to see if the given puzzle is solved
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] == null) {
					return false
				}
			}
		}
		return true
	}

	function nextBoards(board) {
		// THIS FUNCTION WORKS.
		// Board -> List[Board]
		// finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
		var res = []
		const firstEmpty = findEmptySquare(board)
		if (firstEmpty !== undefined) {
			const y = firstEmpty[0]
			const x = firstEmpty[1]
			for (var i = 1; i <= 9; i++) {
				var newBoard = [...board]
				var row = [...newBoard[y]]
				row[x] = i
				newBoard[y] = row
				res.push(newBoard)
			}
		}
		return res
	}

	function keepOnlyValid(boards) {
		// THIS FUNCTION WORKS.
		// List[Board] -> List[Board]
		// filters out all of the invalid boards from the list
		var res = []
		for (var i = 0; i < boards.length; i++) {
			if (validBoard(boards[i])) {
				res.push(boards[i])
			}
		}
		return res
	}

	function findEmptySquare(board) {
		// THIS FUNCTION WORKS.
		// Board -> [Int, Int]
		// (get the i j coordinates for the first empty square)
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (board[i][j] == null) {
					return [i, j]
				}
			}
		}
	}

	function validBoard(board) {
		// THIS FUNCTION WORKS.
		// Board -> Boolean
		// checks to see if given board is valid
		return rowsGood(board) && columnsGood(board) && boxesGood(board)
	}

	function rowsGood(board) {
		// THIS FUNCTION WORKS.
		// Board -> Boolean
		// makes sure there are no repeating numbers for each row
		for (var i = 0; i < 9; i++) {
			var cur = []
			for (var j = 0; j < 9; j++) {
				if (cur.includes(board[i][j])) {
					return false
				} else if (board[i][j] !== null) {
					cur.push(board[i][j])
				}
			}
		}
		return true
	}

	function columnsGood(board) {
		// THIS FUNCTION WORKS.
		// Board -> Boolean
		// makes sure there are no repeating numbers for each column
		for (var i = 0; i < 9; i++) {
			var cur = []
			for (var j = 0; j < 9; j++) {
				if (cur.includes(board[j][i])) {
					return false
				} else if (board[j][i] !== null) {
					cur.push(board[j][i])
				}
			}
		}
		return true
	}

	function boxesGood(board) {
		// transform this everywhere to update res
		const boxCoordinates = [
			[0, 0],
			[0, 1],
			[0, 2],
			[1, 0],
			[1, 1],
			[1, 2],
			[2, 0],
			[2, 1],
			[2, 2],
		]
		// THIS FUNCTION WORKS.
		// Board -> Boolean
		// makes sure there are no repeating numbers for each box
		for (var y = 0; y < 9; y += 3) {
			for (var x = 0; x < 9; x += 3) {
				// each traversal should examine each box
				var cur = []
				for (var i = 0; i < 9; i++) {
					var coordinates = [...boxCoordinates[i]]
					coordinates[0] += y
					coordinates[1] += x
					if (cur.includes(board[coordinates[0]][coordinates[1]])) {
						return false
					} else if (board[coordinates[0]][coordinates[1]] != null) {
						cur.push(board[coordinates[0]][coordinates[1]])
					}
				}
			}
		}
		return true
	}

	const rotateMatrix = array => {
		const n = array.length

		// Create a temporary matrix of size n x n
		let t = Array.from(Array(n), () => Array.from(Array(n)))

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				// basically array[i][j] gets moved to [j][n - (i + 1)]
				// e.g. array[0][0] => array[0][8] assuming 9x9 matrix
				let ele = array[i][j]
				let idx = n - (i + 1)

				t[j][idx] = ele
			}
		}
		return t
	}

	const pokeHoles = (startingBoard, holes) => {
		const removedVals = []

		while (removedVals.length < holes) {
			const val = Math.floor(Math.random() * 81) // Value between 0-81
			const randomRowIndex = Math.floor(val / 9) // Integer 0-8 for row index
			const randomColIndex = val % 9

			if (!startingBoard[randomRowIndex]) continue // guard against cloning error
			if (startingBoard[randomRowIndex][randomColIndex] === 0) continue // If cell already empty, restart loop

			removedVals.push({
				// Store the current value at the coordinates
				rowIndex: randomRowIndex,
				colIndex: randomColIndex,
				val: startingBoard[randomRowIndex][randomColIndex],
				correct: false,
			})
			startingBoard[randomRowIndex][randomColIndex] = 0 // "poke a hole" in the board at the coords
			const proposedBoard = startingBoard.map(row => row.slice()) // Clone this changed board

			// Attempt to solve the board after removing value. If it cannot be solved, restore the old value.
			// and remove that option from the list
			if (!solve(proposedBoard)) {
				startingBoard[randomRowIndex][randomColIndex] = removedVals.pop().val
			}
		}
		return { removedVals, startingBoard }
	}

	const random = Math.floor(Math.random() * 10)
	// const random = 2

	const board = solve(newBoard)
	const rotate1 = rotateMatrix(board)
	const rotate2 = rotateMatrix(rotate1)
	const rotate3 = rotateMatrix(rotate2)
	const rotate4 = rotateMatrix(rotate3)
	const rotate5 = rotateMatrix(rotate4)
	const rotate6 = rotateMatrix(rotate5)
	const rotate7 = rotateMatrix(rotate6)
	const rotate8 = rotateMatrix(rotate7)
	const rotate9 = rotateMatrix(rotate8)

	// console.log(random)

	if (random === 0) {
		const { removedVals, startingBoard } = pokeHoles(board, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 1) {
		const { removedVals, startingBoard } = pokeHoles(rotate1, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 2) {
		const { removedVals, startingBoard } = pokeHoles(rotate2, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 3) {
		const { removedVals, startingBoard } = pokeHoles(rotate3, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 4) {
		const { removedVals, startingBoard } = pokeHoles(rotate4, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 5) {
		const { removedVals, startingBoard } = pokeHoles(rotate5, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 6) {
		const { removedVals, startingBoard } = pokeHoles(rotate6, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 7) {
		const { removedVals, startingBoard } = pokeHoles(rotate7, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 8) {
		const { removedVals, startingBoard } = pokeHoles(rotate8, num)
		return { removedVals, board: startingBoard }
	}

	if (random === 9) {
		const { removedVals, startingBoard } = pokeHoles(rotate9, num)
		return { removedVals, board: startingBoard }
	}
}
