import { useState, useContext } from 'react'
import { BoardContext } from '../App'
import { Transition } from 'react-transition-group'

export default function Header() {
	const {
		selectedDifficulty,
		setSelectedDifficulty,
		difficulties,
		setReset,
		setIsDark,
		isDark,
	} = useContext(BoardContext)
	const [buttonsShowing, setButtonsShowing] = useState(false)

	const { name } = selectedDifficulty

	const showButtons = () => {
		setButtonsShowing(true)
	}

	const sorter = (a, b) => {
		if (a.name === name) {
			return -1
		}
		if (b.name === name) {
			return 1
		}
		return a.name > b.name ? -1 : 1
	}

	const changeDifficulty = difficulty => {
		if (difficulty.name === name) {
			setButtonsShowing(false)
		} else {
			setSelectedDifficulty(difficulty)
			setReset(true)
			setButtonsShowing(false)
			localStorage.setItem('difficulty', difficulty.name)
		}
	}

	const changeTheme = () => {
		setIsDark(!isDark)
		if (isDark) {
			localStorage.setItem('theme', 'light')
		} else {
			localStorage.setItem('theme', 'dark')
		}
	}

	const defaultTransitionStyle = {
		transform: 'translateX(0)',
	}

	const transitionStylesButton = {
		entering: { transform: 'translateX(120%)' },
		entered: { transform: 'translateX(0)' },
		exiting: { transform: 'translateX(120%)' },
		exited: { transform: 'translateX(0)' },
	}

	const transitionStylesButtonGroup = {
		entering: { transform: 'translateX(-1500%)' },
		entered: { transform: 'translateX(0)' },
		exiting: { transform: 'translateX(-1500%)' },
		exited: { transform: 'translateX(0)' },
	}

	return (
		<header className='border-sand-900/30px-4 container-full flex h-20 items-center justify-between border-b-[0.75px] border-sand-900/30 px-5'>
			<div className='flex space-x-8'>
				<h1>Sudoku</h1>
				<button onClick={changeTheme}>
					{isDark ? (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 stroke-tallow'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2.2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
							/>
						</svg>
					) : (
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 stroke-sand-900/80'
							fill='none'
							viewBox='0 0 24 24'
							// stroke='currentColor'
							strokeWidth={2.2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
							/>
						</svg>
					)}
				</button>
			</div>
			<div className='flex flex-row-reverse'>
				<Transition
					in={!buttonsShowing}
					unmountOnExit
					mountOnEnter
					timeout={100}
				>
					{state => (
						<div className='flex flex-row-reverse space-x-4'>
							<button
								onClick={showButtons}
								style={{
									...transitionStylesButton[state],
								}}
								className={`btn-animation ${
									(name === 'easy' && name) ||
									(name === 'medium' && name) ||
									(name === 'hard' && name)
								}`}
							>
								{name}
							</button>
						</div>
					)}
				</Transition>
				<Transition in={buttonsShowing} unmountOnExit mountOnEnter timeout={50}>
					{state => {
						return difficulties.sort(sorter).map(difficulty => {
							const { name } = difficulty
							return (
								<button
									key={name}
									style={{
										...transitionStylesButtonGroup[state],
									}}
									onClick={() => {
										changeDifficulty(difficulty)
									}}
									className={`btn-animation ${
										(name === 'easy' && name) ||
										(name === 'medium' && name) ||
										(name === 'hard' && name)
									}`}
								>
									{name}
								</button>
							)
						})
					}}
				</Transition>
			</div>
		</header>
	)
}
