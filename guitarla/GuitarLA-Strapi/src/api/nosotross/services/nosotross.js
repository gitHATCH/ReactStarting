'use strict';

/**
 * nosotross service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::nosotross.nosotross');
