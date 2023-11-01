// Create web server
// Load the express module
const express = require('express');
// Create an instance of express
const app = express();
// Load the path module
const path = require('path');
// Load the fs module
const fs = require('fs');
// Load the body-parser module
const bodyParser = require('body-parser');
// Load the express-session module
const session = require('express-session');
// Load the cookie-parser module
const cookieParser = require('cookie-parser');
// Load the express-messages module
const flash = require('express-flash');
// Load the express-validator module
const expressValidator = require('express-validator');
// Load the passport module
const passport = require('passport');
// Load the mongoose module
const mongoose = require('mongoose');
// Load the morgan module
const morgan = require('morgan');
// Load the config module
const config = require('./config/database');
// Connect to database
mongoose.connect(config.database);
// Load the passport module
require('./config/passport')(passport);
// Load the database module
const db = mongoose.connection;
// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});
// Check for DB errors
db.on('error', function(err){
    console.log(err);
});
// Load the Article model
const Article = require('./models/article');
// Load the User model
const User = require('./models/user');
// Load the comments model
const Comment = require('./models/comment');
// Load the comments route
const comments = require('./routes/comments');
// Load the articles route
const articles = require('./routes/articles');
// Load the users route
const users = require('./routes/users');
// Set the public folder
app.use(express.static(path.join(__dirname, 'public')));
// Load the express-handlebars module
const exphbs = require('express-handlebars');
// Load the express-handlebars module
const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        if_eq: function(a, b, opts) {
            if(a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        }
    }
});
// Load the method-override module
const methodOverride = require('method-override');
// Load the moment module
const moment = require('moment');
// Use the morgan middleware
app.use(morgan('dev'));
// Use the cookie