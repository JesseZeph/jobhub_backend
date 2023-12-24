const express = require('express')
const app = express()
const port = 3020
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const jobRouter = require('./routes/job')
const userRouter = require('./routes/user')
const appliedRouter = require('./routes/apply')

const bookmarkRouter = require('./routes/bookmark')
const authRouter = require('./routes/auth')

dotenv.config();
const admin = require('firebase-admin');
const serviceAccount = require('./servicesAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connect to V2 Db'))
    .catch((err)=> console.log(err));

app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/jobs', jobRouter)
app.use('/api/bookmarks', bookmarkRouter)
app.use('/api/users', userRouter)
app.use('/api/applied', appliedRouter)

app.use('/api/', authRouter)


app.listen(process.env.PORT || port, () => 
            console.log(`The Hub is listening on port ${process.env.PORT }!`))