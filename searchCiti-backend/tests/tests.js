
const assert = require('assert');
const citiesController = require("../controllers/cities");


describe('search cities', () => {

    it('should return array', () => {

        return citiesController.list("zel")

            .then(cities => {
                assert.strictEqual(Array.isArray(cities), true);
            })

            .catch(err => {
                assert.fail(err)
            })

    });

});



