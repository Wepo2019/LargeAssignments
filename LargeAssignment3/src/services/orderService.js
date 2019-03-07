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

const getAllOrderForTel = (tel) => {
    return fetch('http://localhost:3500/api/orders/' + tel).then(resp => {
        if (resp.ok) { return resp.json(); }
    }).then(data => {
        if (!data) { return []; }
        return data;
    });
};

export default {
    sendOrder,
    getAllOrderForTel
}