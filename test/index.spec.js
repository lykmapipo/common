import { expect } from '@lykmapipo/test-helpers';
import {
  isNotValue,
  copyOf,
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
  assign,
  mergeObjects,
  variableNameFor,
  has,
  hasAll,
  hasAny,
  normalizeError,
  bagify,
  mapErrorToObject,
  osInfo,
  processInfo,
  randomColor,
  formatDate,
  mimeTypeOf,
  mimeExtensionOf,
  hashOf,
  parseTemplate,
  stripHtmlTags,
  stringify,
  parse,
  pluralize,
  singularize,
  autoParse,
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
    expect(isNotValue(false)).to.be.false;
    expect(isNotValue(true)).to.be.false;
  });

  it('should make a copy of a value', () => {
    expect(copyOf).to.exist;
    expect(copyOf).to.be.a('function');
    expect(copyOf.name).to.be.equal('copyOf');
    expect(copyOf('a')).to.be.equal('a');
    expect(copyOf('')).to.be.equal('');
    expect(copyOf(null)).to.be.equal(null);
    expect(copyOf(undefined)).to.be.equal(undefined);
    expect(copyOf(false)).to.be.equal(false);
    expect(copyOf(true)).to.be.equal(true);
    expect(copyOf({ a: 1 })).to.be.eql({ a: 1 });
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
    const x = { a: null, b: 1, c: '', d: undefined, e: false };
    const y = compact(x);
    expect(y).to.exist;
    expect(y).to.include.keys('b', 'e');
    expect(y).to.not.include.keys('a', 'c', 'd');
    expect(y.b).to.exist;
    y.f = 2;
    expect(x.f).to.not.exist;
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

  it('should value to object', () => {
    const obj = { a: 1 };
    expect(assign(obj, { b: 1 })).to.be.eql({ a: 1, b: 1 });
  });

  it('should merge objects to single object', () => {
    expect(mergeObjects({ a: 1 }, { b: 1 })).to.be.eql({ a: 1, b: 1 });
    expect(mergeObjects({ a: 1 }, { b: 1 }, { b: undefined })).to.be.eql({
      a: 1,
      b: 1,
    });
    expect(mergeObjects({ a: false }, { b: true })).to.be.eql({
      a: false,
      b: true,
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

  it('should normalize error instance', () => {
    const error = new Error('Internal Server Error');
    const object = normalizeError(error);
    expect(object.code).to.be.equal(500);
    expect(object.status).to.be.equal(500);
    expect(object.name).to.be.equal('Error');
    expect(object.message).to.be.equal('Internal Server Error');
  });

  it('should normalize error instance', () => {
    const error = new Error('Internal Server Error');
    const object = normalizeError(error, { code: 100, status: 500 });
    expect(object.code).to.be.equal(100);
    expect(object.status).to.be.equal(500);
    expect(object.name).to.be.equal('Error');
    expect(object.message).to.be.equal('Internal Server Error');
  });

  it('should normalize error instance to object', () => {
    const error = new Error('Internal Server Error');
    const object = mapErrorToObject(error);
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      error: 'Error',
      message: 'Internal Server Error',
      description: 'Internal Server Error',
      error_description: 'Internal Server Error',
    });
  });

  it('should normalize error instance to object with message', () => {
    const error = new Error('Invalid Arguments');
    const object = mapErrorToObject(error);
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      error: 'Error',
      message: 'Invalid Arguments',
      description: 'Invalid Arguments',
      error_description: 'Invalid Arguments',
    });
  });

  it('should normalize error instance to object with code', () => {
    const error = new Error('Invalid Arguments');
    const object = mapErrorToObject(error, { code: 400 });
    expect(object).to.be.eql({
      status: 400,
      code: 400,
      name: 'Error',
      error: 'Error',
      message: 'Invalid Arguments',
      description: 'Invalid Arguments',
      error_description: 'Invalid Arguments',
    });
  });

  it('should normalize error instance to object with status', () => {
    const error = new Error('Invalid Arguments');
    const object = mapErrorToObject(error, { code: 100, status: 400 });
    expect(object).to.be.eql({
      status: 400,
      code: 100,
      name: 'Error',
      error: 'Error',
      message: 'Invalid Arguments',
      description: 'Invalid Arguments',
      error_description: 'Invalid Arguments',
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
        index: 'name',
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
        index: 'name',
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
        index: 'name',
      },
    };
    const error = new Error('Validation Error');
    error.errors = errors;
    const object = mapErrorToObject(error, { name: 'ValidationError' });
    expect(object).to.be.eql({
      status: 500,
      code: 500,
      name: 'Error',
      error: 'Error',
      message: 'Validation Error',
      description: 'Validation Error',
      error_description: 'Validation Error',
      errors: {
        name: {
          message: 'Path `name` (John Doe) is not unique.',
          name: 'ValidatorError',
          type: 'unique',
          kind: 'unique',
          path: 'name',
          value: 'John Doe',
          index: 'name',
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
    expect(info.networkInterfaces).to.exist;
    expect(info.networkInterfaces).to.be.an('object');
    expect(info.platform).to.exist;
    expect(info.platform).to.be.a('string');
    expect(info.release).to.exist;
    expect(info.release).to.be.a('string');
    expect(info.tmpdir).to.exist;
    expect(info.tmpdir).to.be.a('string');
    expect(info.totalmem).to.exist;
    expect(info.totalmem).to.be.a('number');
    expect(info.type).to.exist;
    expect(info.type).to.be.a('string');
    expect(info.uptime).to.exist;
    expect(info.uptime).to.be.a('number');
  });

  it('should get process information', () => {
    const info = processInfo();
    expect(info).to.exist;
    expect(info).to.be.an('object');

    expect(info.arch).to.exist;
    expect(info.arch).to.be.a('string');
    expect(info.cpuUsage).to.exist;
    expect(info.cpuUsage).to.be.an('object');
    expect(info.cwd).to.exist;
    expect(info.cwd).to.be.a('string');
    expect(info.features).to.exist;
    expect(info.features).to.be.an('object');
    expect(info.egid).to.exist;
    expect(info.egid).to.be.a('number');
    expect(info.euid).to.exist;
    expect(info.euid).to.be.a('number');
    expect(info.gid).to.exist;
    expect(info.gid).to.be.a('number');
    expect(info.groups).to.exist;
    expect(info.groups).to.be.an('array');
    expect(info.uid).to.exist;
    expect(info.uid).to.be.a('number');
    expect(info.hrtime).to.exist;
    expect(info.hrtime).to.be.an('array');
    expect(info.memoryUsage).to.exist;
    expect(info.memoryUsage).to.be.an('object');
    expect(info.pid).to.exist;
    expect(info.pid).to.be.a('number');
    expect(info.platform).to.exist;
    expect(info.platform).to.be.a('string');
    expect(info.ppid).to.exist;
    expect(info.ppid).to.be.a('number');
    expect(info.title).to.exist;
    expect(info.title).to.be.a('string');
    expect(info.uptime).to.exist;
    expect(info.uptime).to.be.a('number');
    expect(info.version).to.exist;
    expect(info.version).to.be.a('string');
    expect(info.versions).to.exist;
    expect(info.versions).to.be.an('object');
  });

  it('should generate random color', () => {
    const color = randomColor();
    expect(color).to.exist;
  });

  it('should format dates', () => {
    expect(formatDate()).to.exist;
    expect(formatDate(new Date('2019-01-25'))).to.be.equal('2019-01-25');
    expect(formatDate(new Date('2019-01-25'), 'YYYY')).to.be.equal('2019');
  });

  it('should get mime type of extension', () => {
    let mime = mimeTypeOf('txt');
    expect(mime).to.exist.and.be.equal('text/plain');

    mime = mimeTypeOf('file.txt');
    expect(mime).to.exist.and.be.equal('text/plain');
  });

  it('should get file extension of mime type', () => {
    const extension = mimeExtensionOf('text/plain');
    expect(extension).to.exist.and.be.equal('txt');
  });

  it('should generate object hash', () => {
    const object = { a: 1, b: 1 };
    expect(hashOf(object)).to.exist.and.be.equal(hashOf(object));
    expect(hashOf(object, 'a')).to.exist.and.not.be.equal(hashOf(object));
  });

  it('should parse string template', () => {
    const template = 'Hello {name}, you have {count} unread messages';
    const formatted = parseTemplate(template, { name: 'John', count: 12 });
    expect(formatted).to.exist.and.be.equal(
      'Hello John, you have 12 unread messages'
    );
  });

  it('should strip html tags', () => {
    const html = 'lorem ipsum <strong>dolor</strong> <em>sit</em> amet';
    const formatted = stripHtmlTags(html);
    expect(formatted).to.exist.and.be.equal('lorem ipsum dolor sit amet');
  });

  it('should stringify a value', () => {
    expect(stringify({ x: 5, y: 6 })).to.be.equal('{"x":5,"y":6}');
  });

  it('should parse a value', () => {
    expect(parse('{"x":5,"y":6}')).to.be.eql({ x: 5, y: 6 });
  });

  it('should pluralize a value', () => {
    expect(pluralize('person')).to.be.eql('people');
    expect(pluralize('Hat')).to.be.eql('Hats');

    const val = 'Hat';
    expect(pluralize(val)).to.be.eql('Hats');
    expect(val).to.eql(val);
  });

  it('should singularize a value', () => {
    expect(singularize('people')).to.be.eql('person');
    expect(singularize('Hats')).to.be.eql('Hat');

    const val = 'Hats';
    expect(singularize(val)).to.be.eql('Hat');
    expect(val).to.eql(val);
  });

  it('should autoparse a value', () => {
    expect(autoParse('5')).to.be.eql(5);
    expect(autoParse(' Undefined ')).to.be.eql(undefined);
    expect(autoParse('{"a":5,"b":6}')).to.be.eql({ a: 5, b: 6 });
    expect(autoParse({ a: '5', b: '6' })).to.be.eql({ a: 5, b: 6 });
    expect(autoParse({ a: '5', b: '6' }, 'a')).to.be.eql({ a: 5, b: '6' });

    const val = '5';
    expect(autoParse(val)).to.be.eql(5);
    expect(val).to.eql(val);
  });
});
