import React from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, onChange, id = 'hw15',
    }
) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage) // вычисляем количество страниц

    const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
        console.log(event)
        // Вызываем колбэк onChange, передавая новые значения страницы и количества элементов на странице
        onChange(page, event.eventPhase)
    }

    const onChangeSelect = (event: any) => {
        const count = Number(event.target.value); // Преобразуем выбранное значение в число
        onChange(1, count); // Вызываем колбэк onChange, передавая новые значения страницы (1) и количества элементов на странице
    }

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                sx={{
                    padding: '4px 8px',
                }}
                page={page}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
                color={'primary'}
                shape={'rounded'}
            />

            <span className={s.text1}>
                показать
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    // здесь в value были числа (поменяла на строки из-за ошибки из hw7)
                    {id: 4, value: '4'},
                    {id: 7, value: '7'},
                    {id: 10, value: '10'},
                ]}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>
                строки в таблице
            </span>
        </div>
    )
}

export default SuperPagination
