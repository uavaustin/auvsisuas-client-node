/**
 * Helper file for AUVSIClient.
 */

'use strict';

const TELEMETRY = {
    lat: 'number',
    lon: 'number',
    alt_msl: 'number',
    yaw: 'number'
};

/**
 * @typedef  {Object} Telemetry
 * @property {number} lat     - Latitude in degrees
 * @property {number} lon     - Longitude in degrees
 * @property {number} alt_msl - Altitude MSL in feet
 * @property {number} yaw     - Heading in degrees
 */

/**
 * Verify telemetry for missing or additional keys.
 *
 * @param  {Telemetry} telem - Telemetry to verify
 * @return {Promise<void, Error>}
 */
export function verifyTelem(telem) {
    return new Promise((resolve, reject) => {
        let keys = Object.keys(telem);
        let realKeys = Object.keys(TELEMETRY);

        if (keys.length > realKeys.length) {
            reject(new Error('too many keys in telemetry'));
            return;
        }

        if (keys.length < realKeys.length) {
            reject(new Error('not enough keys in telemetry'));
            return;
        }

        // Check that the type of each key is right
        for (let i = 0; i < realKeys.length; i++) {
            if (typeof telem[realKeys[i]] != TELEMETRY[realKeys[i]]) {
                reject(new Error(`key '${realKeys[i]}' is of the wrong type`));
                return;
            }
        }

        resolve(true);
    });
}
