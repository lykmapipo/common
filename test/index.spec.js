import { expect } from 'chai';
import {
  isNotValue,
  mapToUpper,
  mapToLower,
  areNotEmpty,
  compact,
  uniq,
  sortedUniq,
  pkg,
  scopesFor,
  abbreviate,
  idOf,
  mergeObjects,
  variableNameFor,
  has,
  hasAll,
  hasAny,
  bagify,
  mapErrorToObject,
  osInfo,
} from '../src/index';

describe('common', () => {
  it('should check if variable has no state', () => {
    expect(isNotValue).to.exist;
    expect(isNotValue).to.be.a('function');
    expect(isNotValue.name).to.be.equal('isNotValue');
    expect(isNotValue('a')).to.be.false;
    expect(isNotValue('')).to.be.true;
    expect(isNotValue(null)).to.be.true;
    expect(isNotValue(undefined)).to.be.true;
    expect(isNotValue(false)).to.be.true;
  });

  it('should convert values to upper', () => {
    expect(mapToUpper).to.exist;
    expect(mapToUpper).to.be.a('function');
    expect(mapToUpper.name).to.be.equal('mapToUpper');
    expect(mapToUpper('a')).to.be.eql(['A']);
    expect(mapToUpper(['a'])).to.be.eql(['A']);
    expect(mapToUpper(['a', 'b'])).to.be.eql(['A', 'B']);
    expect(mapToUpper(['a'], 'b')).to.be.eql(['A', 'B']);
    expect(mapToUpper('a', 'b')).to.be.eql(['A', 'B']);
  });

  it('should convert values to lower', () => {
    expect(mapToLower).to.exist;
    expect(mapToLower).to.be.a('function');
    expect(mapToLower.name).to.be.equal('mapToLower');
    expect(mapToLower('A')).to.be.eql(['a']);
    expect(mapToLower(['A'])).to.be.eql(['a']);
    expect(mapToLower(['A', 'B'])).to.be.eql(['a', 'b']);
    expect(mapToLower(['A'], 'B')).to.be.eql(['a', 'b']);
    expect(mapToLower('A', 'B')).to.be.eql(['a', 'b']);
  });

  it('should check if values are not empty', () => {
    expect(areNotEmpty).to.exist;
    expect(areNotEmpty).to.be.a('function');
    expect(areNotEmpty.name).to.be.equal('areNotEmpty');
    expect(areNotEmpty('a', 'b')).to.be.true;
    expect(areNotEmpty('a', '')).to.be.false;
    expect(areNotEmpty('a', undefined)).to.be.false;
    expect(areNotEmpty('a', null)).to.be.false;
    expect(areNotEmpty(1, null)).to.be.false;
    expect(areNotEmpty(1, undefined)).to.be.false;
    expect(areNotEmpty(1)).to.be.true;
    expect(areNotEmpty([1, 'a'])).to.be.true;
  });

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
      'user:create',
      'user:view',
      'user:edit',
      'user:delete',
      'user:share',
      'user:print',
      'user:import',
      'user:export',
      'user:download',
      'payment:create',
      'payment:view',
      'payment:edit',
      'payment:delete',
      'payment:share',
      'payment:print',
      'payment:import',
      'payment:export',
      'payment:download'
    );
  });

  it('should abbreviate a phrase', () => {
    const abbreviation = abbreviate('Ministry of Finance');
    expect(abbreviation).to.exist;
    expect(abbreviation).to.be.equal('MOF');

    expect(abbreviate('Ministry of Finance')).to.be.equal(
      abbreviate('Ministry', 'of', 'Finance')
    );
    expect(abbreviate('Ministry of Finance')).to.be.equal(
      abbreviate(['Ministry', 'of', 'Finance'])
    );
    expect(abbreviate('Ministry of Finance')).to.be.equal(
      abbreviate(['Ministry'], 'of', ['Finance'])
    );
  });

  it('should get an id of an object', () => {
    expect(idOf({ id: 1 })).to.be.equal(1);
    expect(idOf({ _id: 1 })).to.be.equal(1);
    expect(idOf({})).to.be.undefined;
    expect(idOf(1)).to.be.undefined;
    expect(idOf('1')).to.be.undefined;
  });

  it('should merge objects to single object', () => {
    expect(mergeObjects({ a: 1 }, { b: 1 })).to.be.eql({ a: 1, b: 1 });
    expect(mergeObjects({ a: 1 }, { b: 1 }, { b: undefined })).to.be.eql({
      a: 1,
      b: 1,
    });
  });

  it('should generate camelized variable name', () => {
    expect(variableNameFor('get', 'name')).to.be.equal('getName');
    expect(variableNameFor('pick', 'a', 'name')).to.be.equal('pickAName');
  });

  it('should check if value is in collection', () => {
    expect(has([1, 2], 1)).to.be.true;
    expect(has([1, 2], 3)).to.be.false;
  });

  it('should check if all values are in collection', () => {
    expect(hasAll([1, 2], 1, 2)).to.be.true;
    expect(hasAll([1, 2], [1, 2])).to.be.true;
    expect(hasAll([1, 2], 3)).to.be.false;
    expect(hasAll([1, 2], 1, 3)).to.be.false;
  });

  it('should check if any value is in collection', () => {
    expect(hasAny([1, 2], 1, 2)).to.be.true;
    expect(hasAny([1, 2], [1, 2])).to.be.true;
    expect(hasAny([1, 2], 1, 3)).to.be.true;
    expect(hasAny([1, 2], 3)).to.be.false;
  });

  it('should normalize error instance to object', () => {
    const error = new Error();
    const object = mapErrorToObject(error);
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      message: 'Internal Server Error',
      description: 'Internal Server Error',
    });
  });

  it('should normalize error instance to object with message', () => {
    const error = new Error('Invalid Arguments');
    const object = mapErrorToObject(error);
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      message: 'Invalid Arguments',
      description: 'Invalid Arguments',
    });
  });

  it('should normalize error instance to object with code', () => {
    const error = new Error('Invalid Arguments');
    const object = mapErrorToObject(error, { code: 400 });
    expect(object).to.be.eql({
      status: 400,
      code: 400,
      name: 'Error',
      message: 'Invalid Arguments',
      description: 'Invalid Arguments',
    });
  });

  it('should normalize error instance to object with stack', () => {
    const error = new Error('Bad Request');
    const object = mapErrorToObject(error, { stack: true });
    expect(object.stack).to.exist;
  });

  it('should normalize errors bag', () => {
    const errors = {
      name: {
        message: 'Path `name` (John Doe) is not unique.',
        name: 'ValidatorError',
        properties: {
          type: 'unique',
          path: 'name',
          value: 'John Doe',
          message: 'Path `name` (John Doe) is not unique.',
          reason: 'E11000 duplicate key error collection',
        },
        kind: 'unique',
        path: 'name',
        value: 'John Doe',
        reason: 'E11000 duplicate key error collection',
      },
    };

    const object = bagify(errors);
    expect(object).to.be.eql({
      name: {
        message: 'Path `name` (John Doe) is not unique.',
        name: 'ValidatorError',
        type: 'unique',
        kind: 'unique',
        path: 'name',
        value: 'John Doe',
      },
    });
  });

  it('should normalize errors bag in error instance', () => {
    const errors = {
      name: {
        message: 'Path `name` (John Doe) is not unique.',
        name: 'ValidatorError',
        properties: {
          type: 'unique',
          path: 'name',
          value: 'John Doe',
          message: 'Path `name` (John Doe) is not unique.',
          reason: 'E11000 duplicate key error collection',
        },
        kind: 'unique',
        path: 'name',
        value: 'John Doe',
        reason: 'E11000 duplicate key error collection',
      },
    };
    const error = new Error('Validation Error');
    error.errors = errors;
    const object = mapErrorToObject(error, { name: 'ValidationError' });
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      message: 'Validation Error',
      description: 'Validation Error',
      errors: {
        name: {
          message: 'Path `name` (John Doe) is not unique.',
          name: 'ValidatorError',
          type: 'unique',
          kind: 'unique',
          path: 'name',
          value: 'John Doe',
        },
      },
    });
  });

  it('should get os information', () => {
    const info = osInfo();
    expect(info).to.exist;
    expect(info).to.be.an('object');

    expect(info.arch).to.exist;
    expect(info.arch).to.be.a('string');

    expect(info.cpus).to.exist;
    expect(info.cpus).to.be.an('array');

    expect(info.endianness).to.exist;
    expect(info.endianness).to.be.a('string');

    expect(info.freemem).to.exist;
    expect(info.freemem).to.be.a('number');

    expect(info.homedir).to.exist;
    expect(info.homedir).to.be.a('string');

    expect(info.hostname).to.exist;
    expect(info.hostname).to.be.a('string');

    expect(info.loadavg).to.exist;
    expect(info.loadavg).to.be.an('array');
  });
});
