module.exports = function(app) {
    var controller = require('./controller');
    var multer = require('multer');
    var upload = multer();

    app.route('/dialog/:id/confirm/:value').put(controller.confirmDialogFlow);
    app.route('/dialog/:id/add').put(controller.queryDialogFlow);
    app.route('/dialog/create').post(controller.createDialogFlow);
}
