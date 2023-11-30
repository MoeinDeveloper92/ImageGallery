# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

```bash
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            //extract the token from the the Bearer token
            token = req.headers.authorization.split(" ")[1]
            //decode the jwt and compare it by the id of user
            const decoded = jwt.decode(token, process.env.SECRET_KEY)

            //if there was a user with this id, attach it to the req
            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No Token, Not Authorized")
    }
})

To learn React, check out the [React documentation](https://reactjs.org/).
```