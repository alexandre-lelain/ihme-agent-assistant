module.exports = function(app) {
    var controller = require('./controller');
    var multer = require('multer');
    var upload = multer();

    app.route('/:query').get(controller.bravoNils);
}
