const cookieParser = require('cookie-parser');

function login(req, res) {
    res.cookie('user_name', req.body.user_name);
    res.redirect('/chat')
}

exports.login = login