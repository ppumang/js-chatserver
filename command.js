function get(redis, cmd, res) {
    if (cmd == 'ls') {
        redis.lrange('users', 0, -1, (err, ret) => {
            res.json(ret);
        });
    }
}

exports.get = get;