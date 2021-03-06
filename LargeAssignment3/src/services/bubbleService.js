const getAllBubbles = () => {
    return fetch('http://localhost:3500/api/bubbles').then(resp => {
        if (resp.ok) { return resp.json(); }
    }).then(data => {
        if (!data) { return []; }
        const bubbles = data.map(d => { return { id: d.id, name: d.name, description: d.description, price: d.price, image: d.image } });
        return bubbles;
    });
};

const getSingleBubble = (id) => {
    return fetch('http://localhost:3500/api/bubbles/' + id).then(resp => {
        if (resp.ok) { return resp.json(); }
    }).then(data => {
        if (!data) { return {}; }
        return data;
    });
};

export default {
    getAllBubbles,
    getSingleBubble
};