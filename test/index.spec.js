import { expect } from 'chai';
import {
  isNotValue,
  mapToUpper,
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

  it('should check if values are not empty', () => {
    expect(areNotEmpty).to.exist;
    expect(areNotEmpty).to.be.a('function');
    expect(areNotEmpty.name).to.be.equal('areNotEmpty');
    expect(areNotEmpty('a', 'b')).to.be.true;
    expect(areNotEmpty('a', '')).to.be.false;
    expect(areNotEmpty('a', undefined)).to.be.false;
    expect(areNotEmpty('a', null)).to.be.false;
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
});
