import Cell from './Cell'
import ButtonGroup from './ButtonGroup'
import Timer from './Timer'

export default function Board({ board }) {
	return (
		<div id='board' className='flex flex-col items-center'>
			<div className='w-fit select-none '>
				<Timer />
				<div className='board'>
					{board.map((row, rowIndex) => {
						return (
							<div
								className={`flex w-fit flex-row ${
									(rowIndex === 2 && 'border-bottom') ||
									(rowIndex === 5 && 'border-bottom') ||
									''
								}`}
								key={rowIndex}
							>
								{row.map((col, colIndex) => {
									return (
										<div
											className={`${
												(colIndex === 2 && 'border-right') ||
												(colIndex === 5 && 'border-right') ||
												''
											}`}
											key={colIndex}
										>
											<Cell
												board={board}
												value={col}
												row={rowIndex}
												col={colIndex}
											/>
										</div>
									)
								})}
							</div>
						)
					})}
				</div>
				<ButtonGroup />
			</div>
		</div>
	)
}
