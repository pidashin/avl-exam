import React from 'react'
import PropTypes from 'prop-types'
import './circleProgress.scss'

const calcRotate = rate => (Math.min(rate, 50) / 50) * 180 - 135

const CircleProgress = ({ title, progress, className = '' }) => {
	const rotate_r = calcRotate(progress)

	const rotate_l = calcRotate(progress > 50 ? progress - 50 : 0)

	return (
		<div className={`circleProgress_wrap ${className}`}>
			<p className="my-0 text-uppercase text-white">{title}</p>
			<span>
				<span className="h2 text-white text-bold">{progress}</span>%
			</span>
			<div className="wrapper wrapper--left">
				<div
					className="circleProgress circleProgress--left"
					style={{ transform: `rotate(${rotate_l}deg)` }}
				></div>
			</div>
			<div className="wrapper wrapper--right">
				<div
					className="circleProgress circleProgress--right"
					style={{ transform: `rotate(${rotate_r}deg)` }}
				></div>
			</div>
		</div>
	)
}

CircleProgress.propTypes = {
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
}

export default CircleProgress