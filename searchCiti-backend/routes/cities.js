'use strict';

( function () {

    const Router = require('@koa/router');
    const router = new Router();

    const citiesController = require("../controllers/cities");
    const helpers = require("../helpers/requestHelpers");


    module.exports = function (app) {

        router.get("/cities/:searchStr", async (ctx) => {

            const searchStr = ctx.params.searchStr
            try {
                let result = await citiesController.list(searchStr)
                ctx.body = result;
            } catch (e) {
                helpers.sendError(e, ctx);
            }
        });

        app.use(router.routes());
    };

}) ()