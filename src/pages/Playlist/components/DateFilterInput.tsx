import React from 'react'
import { Filter } from '../../../interface/Filters'

type props = {
    filter: Filter,
    onChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function DateFilterInput(props: props) {
    const {filter, onChanged} = props;
    return (
        <div key={filter.id} className="menu__item">
            <label htmlFor={filter.id}>{filter.name}</label>
            <input key={filter.id} type="datetime-local" name={filter.id} onChange={onChanged} />
        </div>
    )
}
