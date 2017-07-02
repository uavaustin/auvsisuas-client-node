'use strict';

import request from 'request';

// Make the request module store cookies by default
let req = request.defaults({ jar: true });

const STANDARD_TELEMETRY = {
    latitude: 'number',
    longitude: 'number',
    altitude_msl: 'number',
    uas_heading: 'number'
};

const STANDARD_TARGETS = {
    type: 'string',
    latitude: 'number',
    longitude: 'number',
    orientation: 'string',
    shape: 'string',
    background_color: 'string',
    alphanumeric: 'string',
    alphanumeric_color: 'string',
    description: 'string',
    autonomous: 'boolean'
};

const NOT_LOGGED_IN = 'Not logged in';

export default class AUVSIClient {

}
