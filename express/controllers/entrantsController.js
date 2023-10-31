const data = {
    entrants: require('../model/entrants.json'),
    setentrants: function (data)  { this.entrants = data}
};

const getAllentrants = (req, res) => {
    res.json(data.entrants);
}

const createNewentrant = (req, res) => {
    const type = typeof(data.entrants.find(entrant => entrant.id === parseInt(req.body.id)));
    

    const newentrant = {
        id: type !== 'undefined' ? (data.entrants[data.entrants.length - 1].id) + 1 : req.body.id,
        firstname: req.body.user,
        // lastname: req.body.lastname
    }

    // if (!newentrant.firstname || !newentrant.lastname) {
    //     return res.status(400).json({'message': 'First name and last name are required.' });
    // }
if (!newentrant.firstname) {
        return res.status(400).json({'message': 'First name and last name are required.' });
    }

    data.setentrants([...data.entrants, newentrant]);
    res.status(201).json(data.entrants);
}

const updateentrant = (req, res) => {
    const entrant = data.entrants.find(entrant => entrant.id === parseInt(req.body.id));

    if(!entrant) {
        return res.status(400).json({ "message": `entrant ID ${req.body.id} not found` });
    }

    if(req.body.firstname) entrant.firstname = req.body.firstname;
    if(req.body.lastname) entrant.lastname = req.body.lastname;
    const filteredArray = data.entrants.filter(entrant => entrant.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, entrant];
    data.setentrants(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.d ? -1 : 0));
    res.json(data.entrants);
}

const deleteentrant = (req, res) => {
    const entrant = data.entrants.find(entrant => entrant.id === parseInt(req.body.id));

    if(!entrant) {
        return res.status(400).json({ "message": `entrant ID ${req.body.id} not found` });
    }

    const filteredArray = data.entrants.filter(entrant => entrant.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray];
    data .setentrants(unsortedArray);
    res.json(data.entrants);
}

const getentrant = (req, res) => {
    const entrant = data.entrants.find(entrant => entrant.id === parseInt(req.params.id));

    if(!entrant) {
        return res.status(400).json({ "message": `entrant ID ${req.body.id} not found` });
    }

    res.json(entrant);

}

module.exports  = {
        getAllentrants,
        updateentrant,
        createNewentrant,
        deleteentrant,
        getentrant
}