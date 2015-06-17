/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        type: {
            type: "string",
            enum: ['near expiry 30days', 'near expiry 15 days', 'near expiry 7 days', 'expired', 'transfer', 'dealer added product', 'broadcast', 'dealer message']
        },
        user: {
            model: 'user'
        },
        content: {
            type: "text"
        },
        status: {
            type: "string",
            enum: ['Enable', 'Disable']
        }
    }
};