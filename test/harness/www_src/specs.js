var Promise = require('bluebird');

describe('cordovaHTTP', function () {
    beforeEach(function (done) {
        document.addEventListener('deviceready', function () { done(); });
    });
    it('should initialize the global object', function () {
        expect(window.cordovaHTTP).toBeDefined();
    });
});
