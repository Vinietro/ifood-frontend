import React from 'react'
import { Filter } from '../../../interface/Filters'

type props = {
    filter: Filter,
    onChanged?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
export default function SelectFilterInput(props: props) {
    const { filter, onChanged } = props;
    return (
        <div key={filter.id} className="menu__item">
            <label htmlFor={filter.id}>{filter.name}</label>
            <select key={filter.id} name={filter.id} id={filter.id} onChange={onChanged}>
                {filter.values && filter.values.map(option => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}
