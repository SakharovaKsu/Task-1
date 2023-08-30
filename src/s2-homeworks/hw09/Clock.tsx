import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {

    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // при наведении мышкой
    const [show, setShow] = useState<boolean>(false)

    // сохранение timerId в localStorage
    useEffect(() => {
        restoreState('hw9-timerId', timerId);
    }, [timerId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setDate(new Date());
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const start = () => {
        // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        setIsRunning(true);
    }

    const stop = () => {
         // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        setIsRunning(false)
        clearInterval(timerId)
        setTimerId(undefined)
        setDate(new Date())
    }

    const onMouseEnter = () => { // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // спрятать дату если мышка не наведена
        setShow(false)
    }

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const weekday = date.toLocaleString('en-US', { weekday: 'long' })

    const stringTime = `${hours}:${minutes}:${seconds}` || <br/>
    // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01)

    const stringDate = `${day}.${month}.${year}` || <br/>
    // день.месяц.год (01.02.2022) // варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = weekday || <br/>
    const stringMonth = date.toLocaleString('en-US', { month: 'long' }) || <br/>

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{'   '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={isRunning} // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!isRunning} // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
