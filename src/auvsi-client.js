'use strict';

import request from 'request-promise-native';

import { verifyTelem } from './helpers';

/**
 * Client to interact with the AUVSI SUAS Interoperability Server.
 */
export default class AUVSIClient {
    /**
     * Create a new AUVSIClient.
     *
     * This does not handle logging in the server. To log in, see
     * {@link login}.
     */
    constructor() {
        this._setup();
    }

    /**
     * Whether or not the client is currently logged in.
     *
     * @type {boolean}
     */
    get loggedIn() {
        return this._loggedIn;
    }

    /**
     * The base URL of the interop server.
     *
     * This will be an empty string if not logged in.
     *
     * @type {string}
     */
    get url() {
        return this._url;
    }

    /**
     * Set up the base request function and logged out status.
     */
    _setup() {
        this._loggedIn = false;
        this._url = '';

        this._req = request.defaults({ jar: true });
    }

    /**
     * Send a base request.
     *
     * @private
     * @see https://github.com/request/request-promise-native#readme
     * @param  {Object} options           - Request options
     * @param  {string} options.url       - Interop server URL
     * @param  {string} options.uri       - Interop server endpoint
     * @param  {string} options.method    - Must be one of 'GET',
     *                                      POST', 'PUT', or 'DELETE'
     * @param  {Object} [options.headers] - Custom HTTP headers
     * @param  {string} [options.headers['content-type']]
     *                                    - Content type header
     * @param  {Object} [options.form]    - Encodes and sends a form
     * @param  {Object} [options.json]    - Send an object as json
     * @param  {number} [options.timeout=10000]
     *                                    - Request timeout in ms
     * @return {Promise<Response, Error>}
     */
    _request(options) {
        // If we're not logged in and we're not trying to, return an
        // error
        if (!this.loggedIn && options.url === undefined) {
            return Promise.reject(new Error('not logged in'));
        }

        options.url = (options.url || this.url) + options.uri;
        delete options.uri;

        options.resolveWithFullResponse = true;
        options.timeout = options.timeout || 10000;

        return this._req(options).then((response) => {
            if (!/^2/.exec(response.statusCode.toString())) {
                throw new Error(response.body || 'unknown error');
            }

            return response;
        });
    }

    /**
     * Log in to the interop server.
     *
     * @param  {string} url            - Interop url
     * @param  {string} username       - Interop username
     * @param  {string} password       - Interop password
     * @param  {number} [timeout=1000] - Request timeout in ms
     * @return {Promise<void, Error>}
     */
    login(url, username, password, timeout) {
        return this._request({
            method: 'POST',
            url,
            uri: '/api/login',
            form: { username, password },
            timeout
        }).then(() => {
            this._url = url;
            this._loggedIn = true;
        }).catch((err) => {
            this._url = '';
            throw err;
        });
    }

    /**
     * Log out of the interop server.
     *
     * @return {Promise<void, Error>}
     */
    logout() {
        this._setup();
    }

    /**
     * Post telemetry to the interop server.
     *
     * @param  {Telemetry} telem           - Telemetry to post
     * @param  {number}    [timeout=10000] - Request timeout in ms
     * @return {Promise<void, Error>}
     */
    postTelemetry(telem, timeout = 10000) {
        return verifyTelem(telem).then(() => this._request({
            method: 'POST',
            uri: '/api/telemetry',
            form: {
                latitude: telem.lat,
                longitude: telem.lon,
                altitude_msl: telem.alt_msl,
                uas_heading: telem.yaw,
            },
            timeout
        }));
    }
}
