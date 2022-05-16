export function findConflicts(board) {
	let conflictIds = []

	for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
		for (let colIdx = 0; colIdx < board.length; colIdx++) {
			for (let i = 0; i < board.length; i++) {
				if (board[rowIdx][colIdx] !== 0) {
					if (board[rowIdx][colIdx] == board[rowIdx][i] && i !== colIdx) {
						conflictIds.push([rowIdx, colIdx])
					}
					if (board[rowIdx][colIdx] == board[i][colIdx] && i !== rowIdx) {
						conflictIds.push([rowIdx, colIdx])
					}
				}
			}
		}
	}

	function getSubGroups(board) {
		const centerCellIds = [
			[1, 1],
			[1, 4],
			[1, 7],
			[4, 1],
			[4, 4],
			[4, 7],
			[7, 1],
			[7, 4],
			[7, 7],
		]

		let subGroupNums = []

		for (let i = 0; i < 9; i++) {
			const centerIndex = [centerCellIds[i][0], centerCellIds[i][1]]
			const top = [centerIndex[0] - 1, centerIndex[1]]
			const topRight = [centerIndex[0] - 1, centerIndex[1] + 1]
			const right = [centerIndex[0], centerIndex[1] + 1]
			const bottomRight = [centerIndex[0] + 1, centerIndex[1] + 1]
			const bottom = [centerIndex[0] + 1, centerIndex[1]]
			const bottomLeft = [centerIndex[0] + 1, centerIndex[1] - 1]
			const left = [centerIndex[0], centerIndex[1] - 1]
			const topLeft = [centerIndex[0] - 1, centerIndex[1] - 1]

			const centerCell = board[centerIndex[0]][centerIndex[1]]
			const topCell = board[top[0]][top[1]]
			const trCell = board[topRight[0]][topRight[1]]
			const rightCell = board[right[0]][right[1]]
			const brCell = board[bottomRight[0]][bottomRight[1]]
			const bottomCell = board[bottom[0]][bottom[1]]
			const blCell = board[bottomLeft[0]][bottomLeft[1]]
			const leftCell = board[left[0]][left[1]]
			const tlCell = board[topLeft[0]][topLeft[1]]

			const SubGroup = [
				[centerCell, centerIndex],
				[topCell, top],
				[trCell, topRight],
				[rightCell, right],
				[brCell, bottomRight],
				[bottomCell, bottom],
				[blCell, bottomLeft],
				[leftCell, left],
				[tlCell, topLeft],
			]

			subGroupNums.push(SubGroup)
		}
		// const id = `${rowIndex}-${colIndex}`

		return subGroupNums
	}

	const subGroups = getSubGroups(board)

	for (let i = 0; i < subGroups.length; i++) {
		let subGroup = subGroups[i]
		for (let j = 0; j < subGroup.length; j++) {
			const cell = subGroup[j]
			if (cell[0] !== 0) {
				for (let k = 0; k < subGroup.length; k++) {
					const cell2 = subGroup[k]

					if (cell[0] == cell2[0] && j !== k) {
						conflictIds.push(cell[1])
					}
				}
			}
		}
	}
	return [...new Set(conflictIds)]
}
