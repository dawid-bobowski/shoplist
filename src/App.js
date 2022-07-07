import React, { useState, useEffect } from 'react';
import uniquid from 'uniquid';

import useList from './hooks/useList';
import { Actionbar, Alert, List, Topbar } from './components';

import { FaBroom, FaEdit, FaPlus, FaSave, FaTrash } from 'react-icons/fa';

function App() {
    const {
        listName, setListName,
        list, setList,
        lists, setLists,
        isDarkMode,
    } = useList();

    const [itemName, setItemName] = useState('');
    const [isItemEditing, setIsItemEditing] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(true);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };

    const handleListName = (e) => {
        e.preventDefault();
        if (!listName) {
            showAlert(true, 'danger', 'please enter list name');
        }
        else if (listName.length > 30) {
            showAlert(true, 'danger', 'name is too long (max 30 characters)');
        }
        else {
            setList({
                ...list,
                id: list.id ? list.id : uniquid(),
                title: listName,
            });
            setIsNameEditing(!isNameEditing);
            showAlert(true, 'success', 'list name changed');
        }
    };

    const handleItemName = (e) => {
        e.preventDefault();
        if (!itemName) {
            showAlert(true, 'danger', 'please enter item name');
        }
        else if (itemName && isItemEditing) {
            setList({
                ...list,
                items: list.items.map((item) => {
                    if (item.id === editID) {
                        return { ...item, title: itemName };
                    }
                    return item;
                })
            });
            setItemName('');
            setEditID(null);
            setIsItemEditing(false);
            showAlert(true, 'success', 'item changed');
        }
        else {
            const newItem = { id: uniquid(), title: itemName };
            setList({ ...list, items: [newItem, ...list.items] });
            setItemName('');
            showAlert(true, 'success', 'item added to the list');
        }
    };

    const clearList = (id) => {
        if (list.items.length === 0) {
            showAlert(true, 'danger', 'list is already empty');
        }
        else if (list.items.length > 0 && !id) {
            setList({ ...list, items: [] });
            showAlert(true, 'danger', 'list cleared');
        }
        else {
            setList({ ...list, items: [] });
            const specificList = lists.find(list => list.id === id);
            if (specificList) {
                const newLists = lists.filter(list => list.id !== id);
                setLists([...newLists, list]);
            }
            showAlert(true, 'danger', 'list cleared');
        }
    };

    const saveList = (id) => {
        if (!id) {
            showAlert(true, 'danger', 'set list name to save it');
        }
        else {
            const specificList = lists.find(list => list.id === id);
            if (specificList) {
                const newLists = lists.filter(list => list.id !== id);
                setLists([...newLists, list]);
            }
            else {
                setLists([...lists, list]);
            }
            showAlert(true, 'success', 'list saved');
        }
    };

    const removeList = (id) => {
        setLists(lists.filter(list => list.id !== id));
        setList({ id: null, title: '', items: [] });
        setIsNameEditing(!isNameEditing);
        showAlert(true, 'danger', 'list removed');
    };

    const newList = (id) => {
        saveList(id);
        setList({ id: null, title: '', items: [] });
        setIsNameEditing(true);
        showAlert(true, 'success', 'new list created');
    };

    const removeItem = (id) => {
        setList({ ...list, items: list.items.filter(item => item.id !== id) });
        if (isItemEditing) {
            setIsItemEditing(false);
            setItemName('');
        }
        showAlert(true, 'danger', 'item removed');
    };

    const editItem = (id) => {
        const item = list.items.find(item => item.id === id);
        setIsItemEditing(true);
        setEditID(id);
        setItemName(item.title);
        showAlert(true, 'danger', 'item changed');
    };

    useEffect(() => {
        if (list.title) {
            setIsNameEditing(false);
        }
    }, [list.title]);

    useEffect(() => {
        setListName(list.title);
    }, [list.title, setListName]);

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists));
    }, [lists]);

    const buttons = [
        {
            label: 'clear items',
            action: clearList,
            icon: <FaBroom />,
        },
        {
            label: 'save list',
            action: saveList,
            icon: <FaSave />
        },
        {
            label: 'remove list',
            action: removeList,
            icon: <FaTrash />,
        },
        {
            label: 'new list',
            action: newList,
            icon: <FaPlus />,
        },
    ]

    return <>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <Topbar
            saveList={saveList}
            showAlert={showAlert}
            setIsNameEditing={setIsItemEditing}
        />
        <section className={`section-center${isDarkMode ? ' dark' : ''}`}>
            {
                isNameEditing
                    ?
                    <>
                        <h1 className={isDarkMode ? 'dark' : ''}>
                            {
                                list.title ? `${listName}` : 'new list'
                            }
                        </h1>
                        <form className='name-form' onSubmit={handleListName}>
                            <div className='form-control'>
                                <input
                                    type='text'
                                    className={`list-name${isDarkMode ? ' dark' : ''}`}
                                    placeholder='set up your list name'
                                    onChange={(e) => setListName(e.target.value)}
                                />
                                <button type='submit' className='submit-btn'>
                                    apply
                                </button>
                            </div>
                        </form>
                    </>
                    :
                    <h1 className={isDarkMode ? 'dark' : ''} onClick={() => setIsNameEditing(!isNameEditing)}>
                        {listName}
                        <FaEdit className='edit-btn' />
                    </h1>
            }
            <form className='shopping-form' onSubmit={handleItemName}>
                <div className='form-control'>
                    <input
                        type='text'
                        className={`shopping${isDarkMode ? ' dark' : ''}`}
                        placeholder='insert item name'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <button type='submit' className='submit-btn'>
                        {isItemEditing ? 'edit' : 'add'}
                    </button>
                </div>
            </form>
            <div className='shopping-container'>
                <List removeItem={removeItem} editItem={editItem} />
            </div>
        </section>
        <Actionbar buttons={buttons} />
    </>
}

export default App;
