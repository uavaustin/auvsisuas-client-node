'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AUVSIClient from '..';

chai.use(chaiAsPromised);
let expect = chai.expect;

const URL = 'http://localhost:8080';
const USERNAME = 'testuser';
const PASSWORD = 'testpass';

describe('AUVSIClient', function () {
    it('should log in, send telemetry, and then log out', function () {
        let client = new AUVSIClient();

        let telem = { lat: 10, lon: 15, alt_msl: 20, yaw: 25 };

        expect(client.loggedIn).to.equal(false);
        expect(client.url).to.equal('');

        return client.login(URL, USERNAME, PASSWORD)
            .then(() => expect(client.loggedIn).to.equal(true))
            .then(() => expect(client.url).to.equal(URL))
            .then(() => client.postTelemetry(telem))
            .then(() => client.logout())
            .then(() => expect(client.loggedIn).to.equal(false))
            .then(() => expect(client.url).to.equal(''));
    });
});
