import { useRef, useState } from 'react';
import { getLocalList, getLocalLists } from '../helpers/LocalStorage';


const useProvideList = () => {
	const [listName, setListName] = useState('');
	const [list, setList] = useState(getLocalList);
	const [lists, setLists] = useState(getLocalLists);
	const [showLists, setShowLists] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const listsContainerRef = useRef(null);
	const listsRef = useRef(null);

	return {
		listName, setListName,
		list, setList,
		lists, setLists,
		showLists, setShowLists,
		isDarkMode, setIsDarkMode,
		listsContainerRef, listsRef,
	};
}

export default useProvideList;