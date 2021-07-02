const authJwt = require('../middleware/auth.jwt');
const { isAuthenticated } = require('../middleware/auth.jwt');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers"
        );
        next();
    });

    app.use('/api/v1/account', require('./account.routes'));
    app.use('/api/v1/post-category',  require('./postCategory.routes'));
    app.use('/api/v1/post',  require('./post.routes'));
    app.use('/api/v1/notification', [isAuthenticated],  require('./notification.routes'));
}