import React from 'react';

import './item-list.css';

const ItemList = (props) => {

    const {data, onItemSelected, children: renderLabel} = props;

    const items = data.map((item) => {

        const label = renderLabel(item);

        return (
            <li className="list-group-item"
                key={item.id}
                onClick={() => onItemSelected(item.id)}>
                {label}
            </li>
        )
    })

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}
export default ItemList;