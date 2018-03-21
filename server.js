const express = require('express');
//const authRoutes = require('./routes/authRoutes');
//const billingRoutes = require('./routes/billingRoutes');
//const surveyRoutes = require('./routes/surveyRoutes');

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User'); // should be first
require('./models/Survey'); // should be first
require('./services/passport'); // passport JS



mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
app.use( cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize()); // Add user to req
app.use(passport.session());    // Add user to req


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like our main.js file or main.css file
    app.use(express.static('client/build'));
      

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,
             'client', 'build', 'index.html'));
    });  
}

const PORT = process.env.PORT || 5000;
app.listen(PORT); 