const cookieSession = require('cookie-session');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

app.use(bodyParser.json());
 
app.use(cookieSession({
  name: 'session',
  keys: ['session'],
 
  // Cookie Options
  maxAge: 2 * 60 * 1000 // 2 minutes
}));

app.post('/add-click', (req,res) => {
  req.session.totalClicks = req.session.totalClicks || 0;
  req.session.totalClicks += 1;
  res.sendStatus(200);
});

app.get('/get-clicks', (req, res) => {
  req.session.totalClicks = req.session && req.session.totalClicks || 0;
  const {totalClicks} = req.session;
  res.send({totalClicks});
});

app.post('/login', (req,res) => {
  if(req.body.username && req.body.password) {
    // check username and password
    if(authenticated) {
        // create a token and store it with the current date (if you want it to expire)
        var token = generateAndStoreRandomString(req.body.username);
        res.redirect("http://your.domain/path?token=" + token);
        return;
    }
    // Do something if username or password wrong
}
// Do something if no username or password
  res.sendStatus(200);
});

app.get('/login', (req, res) => {
  if(!req.query.token) {
    res.redirect("http://your.domain/login");
    return;
}
// Check token in database, if it exists and it hasn't expired
if(!authenticated) {
    res.redirect("http://your.domain/login");
    return;
}
// The user is authenticated. Do the actions required by "somePath"
});
// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
