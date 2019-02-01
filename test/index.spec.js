'use strict';

process.env.NODE_ENV = 'test';

/* dependencies */
const { expect } = require('chai');
const {
  compact,
  uniq,
  sortedUniq,
  pkg,
  scopesFor,
  CONTINENT_NAMES,
  COUNTRY_NAMES,
  COUNTRY_CODES,
  CALLING_CODES,
  MAP_FEATURE_DEFAULT_NATURE,
  MAP_FEATURE_DEFAULT_FAMILY,
  MAP_FEATURE_DEFAULT_TYPE,
  MAP_FEATURE_NATURES,
  MAP_FEATURE_FAMILIES,
  MAP_FEATURE_PLACES,
} = require('../');

describe('common', () => {
  it('should read current process package information', () => {
    expect(pkg).to.exist;
    expect(pkg).to.be.a('function');
    expect(pkg.name).to.be.equal('pkg');
    const { name, version } = pkg();
    expect(name).to.exist;
    expect(version).to.exist;
  });

  it('should pick current process package information', () => {
    const info = pkg('name', 'version');
    expect(info.name).to.exist;
    expect(info.version).to.exist;
  });

  it('should compact an array', () => {
    const a = [null, 1, '', undefined];
    const b = compact(a);
    expect(b).to.exist;
    expect(b).to.eql([1]);
    b.push(2);
    expect(a).to.not.contain(2);
  });

  it('should compact an object', () => {
    const x = { a: null, b: 1, c: '', d: undefined };
    const y = compact(x);
    expect(y).to.exist;
    expect(y).to.not.include.keys('a', 'c', 'd');
    expect(y.b).to.exist;
    y.e = 2;
    expect(x.e).to.not.exist;
  });

  it('should remove duplicates from an array', () => {
    const a = [null, 1, 1, '', undefined, 2];
    const b = uniq(a);
    expect(b).to.exist;
    expect(b).to.eql([1, 2]);
    b.push(3);
    expect(a).to.not.contain(3);
  });

  it('should remove duplicates from an object', () => {
    const x = { a: null, b: 1, c: '', d: undefined };
    const y = uniq(x);
    expect(y).to.exist;
    expect(y).to.not.include.keys('a', 'c', 'd');
    expect(y.b).to.exist;
    y.e = 2;
    expect(x.e).to.not.exist;
  });

  it('should create sorted duplicates array', () => {
    const a = [null, 1, 2, '', undefined, 1];
    const b = sortedUniq(a);
    expect(b).to.exist;
    expect(b).to.eql([1, 2]);
    b.push(3);
    expect(a).to.not.contain(3);
  });

  it('should create sorted duplicates object', () => {
    const x = { a: null, b: 1, c: '', d: undefined };
    const y = sortedUniq(x);
    expect(y).to.exist;
    expect(y).to.not.include.keys('a', 'c', 'd');
    expect(y.b).to.exist;
    y.e = 2;
    expect(x.e).to.not.exist;
  });

  it('should create scopes for resources', () => {
    const scopes = scopesFor('user', 'payment');
    expect(scopes).to.exist;
    expect(scopes).to.include(
      'user:create', 'user:view', 'user:edit',
      'user:delete', 'user:share', 'user:print',
      'user:import', 'user:export', 'user:download',
      'payment:create', 'payment:view', 'payment:edit',
      'payment:delete', 'payment:share', 'payment:print',
      'payment:import', 'payment:export', 'payment:download'
    );
  });

  it('shoulde expose continent names', () => {
    expect(CONTINENT_NAMES).to.exist;
    expect(CONTINENT_NAMES).to.be.an('array');
    expect(CONTINENT_NAMES).to.be.to.have.length.at.least(1);
    expect(CONTINENT_NAMES).to.include('Africa');
  });

  it('shoulde expose country names', () => {
    expect(COUNTRY_NAMES).to.exist;
    expect(COUNTRY_NAMES).to.be.an('array');
    expect(COUNTRY_NAMES).to.be.to.have.length.at.least(1);
    expect(COUNTRY_NAMES).to.include('Tanzania');
  });

  it('shoulde expose country codes', () => {
    expect(COUNTRY_CODES).to.exist;
    expect(COUNTRY_CODES).to.be.an('array');
    expect(COUNTRY_CODES).to.be.to.have.length.at.least(1);
    expect(COUNTRY_CODES).to.include('TZ');
  });

  it('shoulde expose country calling codes', () => {
    expect(CALLING_CODES).to.exist;
    expect(CALLING_CODES).to.be.an('array');
    expect(CALLING_CODES).to.be.to.have.length.at.least(1);
    expect(CALLING_CODES).to.include('255');
  });

  it('shoulde expose map features default values', () => {
    expect(MAP_FEATURE_DEFAULT_NATURE).to.be.equal('Other');
    expect(MAP_FEATURE_DEFAULT_FAMILY).to.be.equal('Other');
    expect(MAP_FEATURE_DEFAULT_TYPE).to.be.equal('Other');
  });

  it('shoulde expose map features natures', () => {
    expect(MAP_FEATURE_NATURES).to.exist;
    expect(MAP_FEATURE_NATURES).to.be.an('array');
    expect(MAP_FEATURE_NATURES).to.be.to.have.length.at.least(1);
    expect(MAP_FEATURE_NATURES).to.include('Boundary');
  });

  it('shoulde expose map features families', () => {
    expect(MAP_FEATURE_FAMILIES).to.exist;
    expect(MAP_FEATURE_FAMILIES).to.be.an('array');
    expect(MAP_FEATURE_FAMILIES).to.be.to.have.length.at.least(1);
    expect(MAP_FEATURE_FAMILIES).to.include('Administrative');
  });

  it('shoulde expose map feature places tags', () => {
    expect(MAP_FEATURE_PLACES).to.exist;
    expect(MAP_FEATURE_PLACES).to.be.an('array');
    expect(MAP_FEATURE_PLACES).to.be.to.have.length.at.least(1);
    expect(MAP_FEATURE_PLACES).to.include('country');
  });
});
