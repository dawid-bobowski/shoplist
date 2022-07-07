import React, { useEffect } from 'react';
import { FaList, FaMoon, FaSun } from 'react-icons/fa';
import useList from '../hooks/useList';

const Topbar = ({ saveList, showAlert, setIsNameEditing }) => {
    const {
        lists,
        list, setList,
        listsContainerRef, listsRef,
        showLists, setShowLists,
        isDarkMode, setIsDarkMode,
    } = useList();

    const toggleLists = () => {
        setShowLists(!showLists);
    };

    const loadList = (id) => {
        if (list.id) {
            const specificList = lists.find((list) => list.id === id);
            if (specificList) {
                let isAnyItemChanged = false;
                for (let i = 0; i < specificList.items.length; i++) {
                    if (specificList.items[i] !== list.items[i]) {
                        isAnyItemChanged = true;
                    }
                }
                if (isAnyItemChanged || list.items.length > specificList.items.length) {
                    if (window.confirm('Would you like to save your current list?')) {
                        saveList(list.id);
                    }
                }
                else {

                }
            }
        }
        setList(lists.find(list => list.id === id));
        setIsNameEditing(false);
        toggleLists();
        showAlert(true, 'success', 'list loaded');
    };

    useEffect(() => {
        const listsHeight = listsRef.current.getBoundingClientRect().height;
        if (showLists) {
            listsContainerRef.current.style.height = `${listsHeight}px`;
        }
        else {
            listsContainerRef.current.style.height = '0';
        }
    }, [listsContainerRef, listsRef, showLists]);

    return <nav>
        <div className={`nav-header${isDarkMode ? ' dark' : ''}`}>
            <div className='logo-container'>
                <h1 className={isDarkMode ? ' dark' : ''}>Shoplist</h1>
                <span className={isDarkMode ? ' dark' : ''}>your number 1 shopping companion!</span>
            </div>
            <div className='nav-buttons'>
                {
                    isDarkMode ?
                        <FaSun className='nav-toggle sun' onClick={() => setIsDarkMode(!isDarkMode)} />
                        :
                        <FaMoon className='nav-toggle moon' onClick={() => setIsDarkMode(!isDarkMode)} />
                }
                {
                    lists.length > 0 && (
                        <div className={`nav-toggle last${isDarkMode ? ' dark' : ''}`} onClick={toggleLists}>
                            <FaList />
                        </div>
                    )
                }
            </div>
        </div>
        <div className='lists-container' ref={listsContainerRef}>
            <div className='lists' ref={listsRef}>
                {
                    lists.map((list) => {
                        return <button key={list.id} onClick={() => loadList(list.id)}>
                            {list.title}
                        </button>
                    })
                }
            </div>
        </div>
    </nav>
};

export default Topbar;