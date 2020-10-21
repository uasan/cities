'use strict';

( function () {

    const sendError = function (err, ctx) {
        let status = (err && err.status) ? err.status : 500;
        let message = (err && err.message) ? err.message : err;
        console.log(status, message);
        ctx.status = err.status;
        ctx.type = 'html';
        ctx.body = message;
    };

    module.exports = {
        sendError: sendError,
    }
}) ()