import React from 'react'
import styled from 'styled-components'
import theme from '../theme'
import convertToCurrency from './../functions/convertToCurrency'
import { useTotalDelMes } from '../context/TotalSpentMontContext'

const TotalBar = styled.div`
	background: ${theme.yellow};
	font-size: 1.25rem; /* 20px */
	letter-spacing: 1px;
	font-weight: 500;
	text-transform: uppercase;
	padding: 0.62rem 2.25rem; /* 10px 40px */
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 31.25rem) {
		/* 500px */
		flex-direction: column;
		font-size: 14px;
	}
`

const TotalSpentBar = () => {
	const { total } = useTotalDelMes()

	return (
		<TotalBar>
			<p>Total Gastado en el mes</p>
			<p>{convertToCurrency(total)}</p>
		</TotalBar>
	)
}

export default TotalSpentBar
