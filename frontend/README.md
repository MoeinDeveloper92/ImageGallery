<h1>Image Gallery Application</h1>
<p>This Application is created by MERN technology which contains MongoDB for database/ ExpressJS fro API creation/ React for UI/ Node which is the our runtime environment.
The purpose of the application is , user should create an account and be authneticated in order to get access to the app's functionality. Each user can Upload image with a lable which needs to be selected through the list items, and add a description about the image.
</p>
<hr/>

<ul>
    <li>Backend</li>
    <li>Frontend</li>
</ul>
<hr/>

<h3>Set up nodejs and Express Js</h3>
<p>The first step I have set up nodejs and express in order to handle server side logic</p>
<p>Dependencies which I have used are as below</p>

```bash
npm i expressjs mongoose colors jsonwebtoken bcryptjs colors moment 
```
<p>I have used nodemon which keeps restarting the server automatically, whenver a chane has been detected.</p>
<hr/>

<h3>MongoDB set up</h3>
<p>In this app I have 2 resources. One is user, and second is Images. In this regard, each user can have multiple images, and each image belong to only one user, which means user should be defigned as a foreign key in Image Schema.</p>
<hr/>
<h3>Creating Restful API </h3>
<p>In the backend I have created restful API for CRUD operation to handle image data and annotation.</p>
<p>End points include route for download/upload/delete/update</p>
<hr/>
<p>The challenging part of the project is user Authentication, which I did it by Express Middleware which is a function that runs during the res and req cycle.</p>

```bash
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

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


module.exports = protect
```

<h1>API Test</h1>
<p>Before getting into the frontend, it is very important to make sure that your api is working properly, otherwise it will be pain in the ass to jump back and fourth between UI and Back:). for API testing I user a cooll toll which is called POSTMAN.
Developers can send req to their endpoints and test it under various scenarios. In this case, for handling errors, I have made a custom Error Handler which is in charge of sending appropriate response to the UI. the UI will catch it trhough Redux and show it to the client.
</p>

```bash
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}


module.exports = errorHandler
```
<p>In Express js every error has a name and has a code, which means developers can easily handle error by Error Class and prepare an appropriate response and send it to the UI.
for example: if (err.code ===1101){
    res.status(400)
    throw Error("Duplicate user in DB")
}
</p>

<hr/>

<h1>Frontend</h1>
<p>As for UI. I have used React, and all its dependencies which make app development much cooler and faster, and with respect to the data management I have used Redux.
The first part of the UI is Register page and Login page. When user login or register to the application a JWT will be sent to the UI, it could be stored to http coockies or localStorage, which I stored there. 
Once user logged In, each user can upload image, and see their image within a gallery. user has this capablity to download all its images and its labels ina zip file which will be shown in the Excel.
</p>

<h1>Redux</h1>
<p>Redux is a tool for state management, although react has buil-in useReducer hook ro managing states, my first go for is Redux. In this app we have two resources, User and Images. inside the User, we can perform register/ login/ logout/delete.
    All Requests are done thorugh a separate file called userService, which I have used axios in this regard. In order to access the protected route in the backedn, I should pack the request with Bearer Token. In this regard server will auhthorize the user and let it to make use of app.
    
</p>


<h1>React-Router</h1>
<p>React By deafult does not have routing features, therefore we make use of a package called, react-router-m version 6 in order to navigate between pages in a SPA. I have used many Link component to navigate and keep the UI in sync with URL, and 
I have user OUTLET which is a nested functionality in Router which allows only authorized users have access to the protected route. In this regard, we not only keep our backend secure, but also our UI is secure.
</p>


<h1>Tailwind/daisyui</h1>
<p>
Tailwind is a CSS framework which uses low-level classes for designing the ui, and daisyui is tailwind plugins which has cool features like navbar/ sidebar/ card and ... 
I have used Tailwind Docs for furhter installation and configuration.

</p>

