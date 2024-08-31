import React from 'react'
import { Filter } from './Filter';
import Sort from './Sort';


export const Sidebar: React.FC = () => {


    return (
        <div>
            <Sort />
            <Filter />
        </div>

    )
}
