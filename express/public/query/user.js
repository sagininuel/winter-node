const axios = require('axios');

// Add a user
axios.post('http://localhost:3500/auth', {
    "user": "Deril",
    "pwd": "123"
})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error.data);
    });
