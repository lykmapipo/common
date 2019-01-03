'use strict';

process.env.NODE_ENV = 'test';

/* dependencies */
const { expect } = require('chai');
const { pkg } = require('../');


describe('common', () => {
  it('should read process package information', () => {
    expect(pkg).to.exist;
    expect(pkg).to.be.a('function');
    expect(pkg.name).to.be.equal('pkg');
    const { name, version } = pkg();
    expect(name).to.exist;
    expect(version).to.exist;
  });
});
