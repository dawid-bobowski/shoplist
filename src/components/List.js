import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useList from '../hooks/useList';

const List = ({ removeItem, editItem }) => {
    const { list, isDarkMode } = useList();

    const handleItemClick = id => {
        const isCrossed = document.getElementById(`item-${id}`).classList.contains('crossed');
        if (isCrossed) {
            document.getElementById(`item-${id}`).classList.remove('crossed');
        } else {
            document.getElementById(`item-${id}`).classList.add('crossed');
        }
    }

    return (
        <div className={`shopping-list${isDarkMode ? ' dark' : ''}`}>
            {list.items.map((item, index) => {
                const { id, title } = item;
                return (
                    <div id={`item-${id}`} className={`shopping-item${isDarkMode ? ' dark' : ''}`} key={index}>
                        <p className='title' onClick={() => handleItemClick(id)}>{title}</p>
                        <div className='item-btn-container'>
                            <button
                                type='button'
                                className='edit-btn'
                                onClick={() => editItem(id)}
                            >
                                <FaEdit />
                            </button>
                            <button
                                type='button'
                                className='delete-btn'
                                onClick={() => removeItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default List;
