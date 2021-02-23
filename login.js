const cookieParser = require('cookie-parser');

exports.login = (req, res) => {
    res.cookie('user_name', req.body.user_name);
    res.redirect('/chat')
}