const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const uri = 'mongodb+srv://anupam:mypassword@cluster0.ug9rzkh.mongodb.net/?retryWrites=true&w=majority';

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello to My App');
})
app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // require the dada from frontend
    const { email, password } = req.body;
    //generete user_id
    const generatedUserId = uuidv4();
    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await client.connect();
        const database = client.db('app-data')
        const users = database.collection('users')
        //check for existing user by existing email address
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).send('User Already Exists. Please Login')
        }

        const sanitizedEmail = email.toLowerCase()
        //store the frontend form data to an object with optimised data
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword
        }
        //Sending the data to database
        const insertedUser = await users.insertOne(data)
        //generete the token
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })
        res.status(201).json({ token, userId: generatedUserId })
    } catch (error) {
        console.log(error)
    }

})
app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    const { email, password } = req.body;
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const user = await users.findOne({ email })
        const correctPassword = await bcrypt.compare(password, user.hashed_password)
        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(201).send().json({ token, userId: user.user_id })
        }
        res.status(400).send('Invalid Credentionals');

    } catch (error) {
        console.log(error);
    }
})

// Get individual user
app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        res.send(user)

    } finally {
        await client.close()
    }
})


//find all by gender
app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const gender = req.query.gender;
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        // const query = { gender_identity: gender }
        const query = { gender_identity: { $eq: gender } }
        const foundUsers = await users.find(query).toArray();

        // const returnedUsers = await users.find().toArray();
        res.send(foundUsers);
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})




//For Updating Data
app.put('/user', async (req, res) => {
    const client = new MongoClient(uri);
    const formData = req.body.formData;
    try {
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const query = { user_id: formData.user_id }
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }

        const insertedUser = await users.updateOne(query, updateDocument);
        res.send(insertedUser);
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
})





app.listen(PORT, () => { console.log('Server Running on PORT ' + PORT) });