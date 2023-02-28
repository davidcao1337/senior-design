import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './calendarComp.css'

const CalendarComp = (props) => {

    const { setBirthday } = props

    const [calendar, setCalendar] = useState('')

    const [open, setOpen] = useState(false)

    const refOne = useRef(null)

    useEffect(() => {
        setCalendar(format(new Date(), 'MM/dd/yyyy'))
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        if ( e.key === "Escape" ) {
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        if ( refOne.current && !refOne.current.contains(e.target) ) {
            setOpen(false)
        }
    }
    
    const handleSelect = (date) => {
        setCalendar(format(date, 'MM/dd/yyyy'))
        setBirthday(date)
        setOpen(false)
    }

    return (
        <div className='calendarWrap'>
            <input value={ calendar } readOnly className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" onClick={ () => setOpen(open => !open) } />
            <div ref={refOne}>
                {open &&
                    <Calendar date={ new Date() } className="calendarElement rounded-md" color='#18B283' onChange={ handleSelect } />
                }
            </div>
        </div>
    )
}

export default CalendarComp
