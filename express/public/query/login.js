// Make sure you have Axios installed, you can do this via npm or yarn
// npm install axios

const axios = require('axios');

const loginEndpoint = 'http://localhost:3500/auth'; // Replace with your API endpoint
const nextPageRoute = '/welcome_page';

// Function to make the login API call
const loginUser = async (user, pwd) => {
  try {
    const response = await axios.post(loginEndpoint, {
      user: user,
      pwd: pwd,
    });

    // Assuming the API returns a token upon successful login, you can access it from the response object.
    const authToken = response.data;
    const token = localStorage.setItem("authToken");
    //response.redirect(nextPageRoute);
    // You can then save this token to use for authenticated requests in your application.

    return authToken;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error while logging in:', error);
    throw error;
  }
};

// Example usage of the loginUser function
const user = 'Deril';
const pwd = '123';

loginUser(user, pwd)
  .then((authToken) => {
    console.log('Logged in successfully! Auth Token:', authToken);
    // Do further processing or redirect to the next page after successful login.
  })
  .catch((error) => {
    // Handle login failure
    console.error('Login failed:', error.message);
    // Display appropriate error messages to the user.
  });
