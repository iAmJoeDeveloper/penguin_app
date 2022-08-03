import React from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'date-fns/locale'
import format from 'date-fns/format'
import 'react-day-picker/dist/style.css'

const DatePicker = ({ date, setFecha }) => {
	return (
		<div>
			<input type='text' readOnly value={format(date, `dd 'de' MMMM 'del' yyyy`, { locale: es })} />
			<DayPicker mode='single' selected={date} onSelect={setFecha} locale={es} />
		</div>
	)
}

export default DatePicker
