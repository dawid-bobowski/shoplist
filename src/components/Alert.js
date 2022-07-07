import React, { useEffect } from 'react';
import useList from '../hooks/useList';

const Alert = ({ type, msg, removeAlert }) => {
    const { list } = useList();

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert();
        }, 3000);

        return () => clearTimeout(timeout);
    }, [list, removeAlert]);

    return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
