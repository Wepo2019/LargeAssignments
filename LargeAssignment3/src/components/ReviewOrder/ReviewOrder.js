import React from 'react';

const ReviewOrder = (props) => {
    const user = JSON.stringify(localStorage.getItem('user'));
    console.log(user.name);
    return (
        <div>
            <h3>{user.name}</h3>
            <p>{user.address}</p>
            <p>{user.city}</p>
            <p>{user.telephone}</p>
            <p>{user.region}</p>
        </div>
    )
};

export default ReviewOrder;
