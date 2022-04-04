const Http = () => {
    send: data => {
        return fetch(data).then(r => r.json());
    };
};

export { Http };
