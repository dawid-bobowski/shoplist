import React from 'react';
import useProvideList from '../hooks/useProvideList';
import ListContext from '../contexts/ListContext';

const ProvideList = ({ children }) => {
	const list = useProvideList();

	return (
		<ListContext.Provider value={list}>
			{children}
		</ListContext.Provider>
	);
}

export default ProvideList;