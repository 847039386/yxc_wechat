var mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/yxc_wechat', {
    server: { poolSize: 20 }
}, function (err) {
    if (err) {
        process.exit(1);
    }
});

exports.user =  require("./user").user;
