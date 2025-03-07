/**
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 */

'use strict';

require('should');
let Errors = require('../../src/Errors');

describe('Formatted Error Logging', () => {
  it('should fall back to a minimal error format when an exception occurs', () => {
    let error = new Error('custom message');
    error.name = 'CircularError';
    error.backlink = error;

    let loggedError = JSON.parse(Errors.toFormatted(error).trim());
    loggedError.should.have.property('errorType', 'CircularError');
    loggedError.should.have.property('errorMessage', 'custom message');
    loggedError.should.have.property('trace').with.length(11);
  });
});
