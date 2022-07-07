import { useContext } from 'react';
import ListContext from '../contexts/ListContext';

const useList = () => {
	return useContext(ListContext);
}

export default useList;