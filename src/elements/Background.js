import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Points } from './../img/puntos.svg'

const Svg = styled.svg`
	height: 50vh;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 0;
	path {
		fill: rgba(135, 182, 194, 0.15);
	}
`

const PointsUp = styled(Points)`
	position: fixed;
	z-index: 1;
	top: 2.5rem; /* 40px */
	left: 2.5rem; /* 40px */
`

const PointsDown = styled(Points)`
	position: fixed;
	z-index: 1;
	bottom: 2.5rem; /* 40px */
	right: 2.5rem; /* 40px */
`

const Background = () => {
	return (
		<>
			<PointsUp />
			<Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'>
				<path
					fillOpacity='1'
					d='M0,128L48,112C96,96,192,64,288,69.3C384,75,480,117,576,138.7C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
				></path>
			</Svg>
			<PointsDown />
		</>
	)
}

export default Background
