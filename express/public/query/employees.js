
// Get with header

// const fetch = require("fetch");
const axios = require('axios');

const url = "http://localhost:3500/employees";
const headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlcmlsIiwiaWF0IjoxNjkxMTA4NDkyLCJleHAiOjE2OTExMDg1ODJ9.2Ik5s3ppFDxOAUy7klmWLPQZRB8VoiQQU6lObiv0oBc",
    "Content-Type": "application/json",
    "User-Agent": "MyApp/1.0",
};

// const response = await fetch(url, {
//     headers,
// })


axios.get(url, { headers })

    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });


// if (response.status === 200) {
//     const users = await response.json();
//     console.log(users);
// } else {
//     console.log(response.status);
// }