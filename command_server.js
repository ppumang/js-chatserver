const redisClient = require('./app').redisClient;

exports.ls = (req, res) => {
    redisClient.lrange('users', 0, -1, (err, ret) => {
        res.json(ret);
    });
}