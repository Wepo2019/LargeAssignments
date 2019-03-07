const sendOrder = (user, cart) => {
    return fetch('http://localhost:3500/api/orders/' + user.telephone, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userInfo: user,
            order: cart
        })
    }).then((response) => response.json()).then((responseData) => {
      return responseData;
    }).catch(err => err);
};

export default {
    sendOrder
}