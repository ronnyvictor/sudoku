import { useEffect, useContext, useState } from 'react'
import { BoardContext } from '../App'

export default function Timer() {
	const [showTimer, setShowTimer] = useState(true)
	const { timer, setTimer, paused, setPaused, done } = useContext(BoardContext)
	const { minutes, seconds } = timer

	const formatTimer = num => {
		num = String(num)
		if (num.length === 1) {
			num = `0${num}`
		}
		return num
	}

	useEffect(() => {
		if (!paused) {
			let myInterval = setInterval(() => {
				if (seconds < 60) {
					setTimer({ minutes, seconds: seconds + 1 })
				}
				if (seconds === 59) {
					setTimer({ minutes: minutes + 1, seconds: 0 })
				}
			}, 1000)
			return () => {
				clearInterval(myInterval)
			}
		}
	})

	const handlePause = () => {
		if (!done) {
			setPaused(!paused)
		}
	}

	const showHideTimer = () => {
		setShowTimer(!showTimer)
	}

	return (
		<div className='my-2 flex h-7 justify-between py-5 pl-1 pr-3'>
			<div className='flex'>
				<label className='toggle-label'>
					Show Timer
					<input
						className='peer invisible appearance-none'
						onChange={showHideTimer}
						id='timer-input'
						type='checkbox'
						checked={showTimer}
					/>
					<span className='transition-3 toggle'></span>
				</label>
			</div>
			{showTimer && (
				<div className='flex items-center space-x-2'>
					<button onClick={handlePause}>
						{!paused ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 stroke-cyprus-600 dark:stroke-cyprus-400'
								fill='none'
								viewBox='0 0 24 24'
								// stroke='currentColor'
								strokeWidth={2.5}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 stroke-sand-900/80 dark:stroke-tallow'
								fill='none'
								viewBox='0 0 24 24'
								// stroke='currentColor'
								strokeWidth={2.2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						)}
					</button>
					<p
						className={`${
							!paused ? 'text-cyprus-600 dark:text-cyprus-400' : ''
						} pt-[0.22rem] text-lg font-extrabold`}
					>
						{formatTimer(minutes)}:{formatTimer(seconds)}
					</p>
				</div>
			)}
		</div>
	)
}
