import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios, {AxiosResponse} from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test2',
            {params: {find}}
        )
        .then((res: AxiosResponse<{ techs: string[] }>) => res.data.techs)
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
            return [] as string[]
        })
}

const HW14 = () => {
    const [find, setFind] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<string[]>([])


    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                // сохранить пришедшие данные
                setTechs(res)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const onChangeText = (value: string) => {
        setFind(value)
        // добавить/заменить значение в квери урла
        setSearchParams({ find: value })
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <div className={s.container}>
                    <SuperDebouncedInput
                        id={'hw14-super-debounced-input'}
                        value={find}
                        onChangeText={onChangeText}
                        onDebouncedChange={sendQuery}
                    />

                    <div id={'hw14-loading'} className={s.loading}>
                        {isLoading ? '...ищем' : <br/>}
                    </div>

                    {mappedTechs}
                </div>
            </div>
        </div>
    )
}

export default HW14
