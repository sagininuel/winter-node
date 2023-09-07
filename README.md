# winter-node
Learning node.js during winter vacation. #hobby_moments

To run the API for testing purposes

1. Clone the repository
2. On your favorite IDE, run the command 'npm install' to install all the necessary dependencies.
3. After installation run 'npm run dev'
4. Open chrome browser (recommended) and run localhost:3500.
5. Then check out the following routes using postman

- localhost:3500/
- localhost:3500/auth: [after which use the access token as Bearer to access the other protected routes] by copy pasting the access token and pasting it on the authorization tab.
- You can clear the users.json file under models and leave '[]' for an empty list, then add users with a password of choice.
- Follow the same above procedure to check all the remaining following routes as indicated in the server.js file.

Happy coding!
