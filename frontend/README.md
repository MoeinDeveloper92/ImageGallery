<h1>Image Gallery Application</h1>
<p>
  In this application, we are supposed to register to the app and create an account. Every user has this functionality to upload image and associate to each image a lable. For example if
  the user upload a dog's image, the label thorugh a dropdown list should be selected as Dog, and user has this capablity to add description to each image.
  After image upload, the user redirected to dashboard which you can see all your uploaded images. At the end you can have a zip file.csv file as a dataset.
</p>

## Table of the Content

<ul>
  <li>Installation</li>
  <li>Backend</li>
  <li>Frontend</li>
</ul>

<h2>1-Installation</h2>
<p>First I have set up the API for the user. Basically, in this App, for user, we have 3 endpoints. 
<ul>
  <li>/api/users/register</li>
  <li>/api/users/login</li>
</ul>
</p>
<p>
  In order to set up server in the Nodejs, we require a bunch of packages, namely, <strong>ExpressJs</strong>, <strong>jsonwebtoken</strong>,<strong>express-async-handler</strong>,<strong>mongoose</strong>,
  <strong>colors</strong>.

</p>

```bash
npm i expressjs jsonwebtoken express-async-handler mongoose colors dotenv
```

<p>
  Another package which is very important is <strong>Nodemon</strong>. It monitors the server constantly. Once a change has been detected, It restarts the server automatically, whihch means there is no need to restart the server manually every time a change occurs.

```bash
npm i -D nodemon
```

We have used flag -D to showcase that we user this package during the development of the app.

</p>

<h2>2-Backend</h2>
<p>
  First step is to create our route. As a developer writing a clean code is a must-have skill. Therefore, I have created a folder in the backend and name it routes, which I have set up all my routes there.
  On top of that, I have put all my endpoint's function in a separate folder and gave it a name(controller), and end up connect these controllers to express Router.
</p>

<p>
  The next step is to TEST my endpoint. There is a cool tool called <strong>POSTMAN</strong> which developers can test out their api routes and send request along with body data to make sure the API behaves as it should.
  We test API to make sure it not only sends appropriate response to the UI, but also it knows how to handle Errors. In this regard I have used custom express error handler to handle errors and exception.
  I have created a folder which it's name is middleware, inside that, there is a file called errorMiddleware which is in charge for error handling.
</p>

<h3>
  Database Setup
</h3>
<p>
  I have user MongoDB atlas which is a cloud version of MongoDB. In this application we have got two resources. One is User, and second is Images. Each user can have many images, but each image just only belongs to one user, which means user should be defined as a foreign key in the Image Schema.
  In the user schema we have got <string>Name Email Password</string> as a user's information which needs to be sent to the Backedn from the UI.
</p>
<p>
  For visualizing data I have user a tool called MongoDB compass which is a GUI to visualize Collection and documents inside Cluster. I have also used Mongoose which is an ODM for MongoDB which is an abstraction layer to connect NODEjs app to DB. In the root, I have created a folder config, and I have conneted my Nodejs to the DB.
</p>

<p>
  Now we have created the model and having database set up, we are ready to go to controller function for user registration.
</p>

<p>
  If you look at the code in the user controller folder, all controller functions,  returns a Promise, therefore I need to handle it. There is nothing better than async await to handler promise. That's why I have used this, although there are try catch block or .then .catch syntax to handle Promise.
</p>

<hr/>

<p>In the mongoose there is a hook and middleware called pre.save, which means you can change data before storing into the database. As a matter of fact, data security is very imperative in Web applicaiton, so it is recommended to hash the password. In this regard I have used bcrypt.js which hasshes the password for us. 
</p>

```bash
userSchema.pre("save",asyncfunction(next){
if(!this.isModified("password")){
next()
}
const hash = await bcrypt.genSalt(10)
this.password=await bcrypt.hash(this.password,salt)
})
```

<hr/>
<br>
<br>
<p>
  Once we have set up our controller functions , now we need to set up user authnetication. In order to validate a user , user needs to send JWT along with the request. The server will run a piece of middleware, and disect the JWT and grab it's payload which includes user's id or whatever. if the user validates, the server will attach the user to the req. Below is the snippet of this middleware.
</p>

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

```
