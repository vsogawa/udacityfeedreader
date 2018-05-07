/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        })

        it('has a URL defined', function () {
            for (let a = 0; a < allFeeds.length; a++) {
                expect(allFeeds[a].url).toBeDefined();
                expect(allFeeds[a].url.length).not.toBe(0);
            }
        })

        it('has a name defined', function () {
            for (let a = 0; a < allFeeds.length; a++) {
                expect(allFeeds[a].name).toBeDefined();
                expect(allFeeds[a].name.length).not.toBe(0);
            }
        })
    });

    describe('The menu', function () {
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

        it('toggles display on menu icon click', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('contains at least one result', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        })
    });

    describe('New Feed Selection', function () {
        let first, second;
        beforeEach(function (done) {
            loadFeed(0, function () { 
                first = $('.feed').html();
                done();
            });
        });
        
        it('results in content updating', function (done) {
            loadFeed(1, function () {
                second = $('.feed').html();
                expect(second).not.toMatch(first);
                done();
            });
        });
    });

}());
