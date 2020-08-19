import React, { useState, useEffect } from 'react';
import '../css/Toast.css'

import PropTypes from 'prop-types';

const Toast = props => {
    const { toastList } = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, 2500);

        return () => {
            clearInterval(interval);
        }
    }, [toastList, list]);


    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    }

    return (
        <>
            <div className={`notification-container bottom-right`}>
                {
                    list.map((toast, i) =>
                        <div
                            key={i}
                            className={`notification toast bottom-left`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                {toast.icon}
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
Toast.propTypes = {
    toastList: PropTypes.array.isRequired
}
export default Toast;