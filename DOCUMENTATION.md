#### isNotValue(value) 

Check if variable has no associated state




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Mixed`  | variable to check if it has no associated state | &nbsp; |




##### Examples

```javascript

const isNotValue = isValue('a');
//=> false

const isNotValue = isValue(null);
//=> true
```


##### Returns


- `Boolean`  whether variable contain state



#### areNotEmpty(values) 

Check if provided values are not empty




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `String`  | set of values to check for emptiness | &nbsp; |




##### Examples

```javascript

const notEmpty = areNotEmpty('a', 'b', 'c');
//=> true

const notEmpty = areNotEmpty('a', 'b', null);
//=> false
```


##### Returns


- `Boolean`  whether values are not empty



#### compact(value) 

Creates new array(or object) with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `Object`  | The array(or object) to compact. | &nbsp; |




##### Examples

```javascript

const b = compact([null, 1, "", undefined]);
// => [ 1 ]

const y = compact({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `Object` `Array`  new array(or object) of filtered values.



#### uniq(value) 

Creates new duplicate-free version of array(or object).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `Object`  | The array(or object) to inspect. | &nbsp; |




##### Examples

```javascript

const b = uniq([null, 1, 1, "", undefined, 2]);
// => [ 1, 2 ]

const y = uniq({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `Object` `Array`  new duplicate free array(or object).



#### sortedUniq(value) 

Creates new duplicate-free version of sorted array(or object).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Array` `Object`  | The array(or object) to inspect. | &nbsp; |




##### Examples

```javascript

const b = sortedUniq([null, 1, 2, "", undefined, 1]);
// => [ 1, 2 ]

const y = sortedUniq({a: 1, b: "", c: undefined});
// => { a: 1 }
```


##### Returns


- `Object` `Array`  new duplicate free sorted array(or object).



#### pkg(field) 

read current process package information




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| field | `String` `Array.<String>` `String`  | fields to pick from package | &nbsp; |




##### Examples

```javascript

const { name, version } = pkg();
// => { name: ..., version: ...}
```


##### Returns


- `Object`  current process package information



#### scopesFor(resources) 

generate resource scopes(permissions)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| resources | `String`  | resources | &nbsp; |




##### Examples

```javascript

const scopes = scopesFor('user')
// => ['user:create', 'user:view']
```


##### Returns


- `Array`  resources scopes



#### abbreviate(words) 

generate shortened form of word(s) or phrase.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| words | `String`  | set of words to derive abbreaviation | &nbsp; |




##### Examples

```javascript

const abbreaviation = abbreviate('Ministry of Finance')
// => MoF
```


##### Returns


- `String`  abbreviation



#### idOf(data) 

obtain an id or a given object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | object to pick id from | &nbsp; |




##### Examples

```javascript

const id = idOf({ id: 1 })
//=> 1

const id = idOf({ _id: 1 })
//=> 1
```


##### Returns


- `Mixed`  id of a given object



#### mergeObjects(objects) 

merge a list on objects into a single object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| objects | `Object`  | list of objects | &nbsp; |




##### Examples

```javascript

const obj = mergeObjects({ a: 1 }, { b: 1 }, { c: 2}, { c: 2}, {b: null})
//=> { a: 1, b: 1, c: 2 }
```


##### Returns


- `Object`  a merged object



#### variableNameFor(names) 

produce camelize variable name based on passed strings




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| names | `String`  | list of strings to produce variable name | &nbsp; |




##### Examples

```javascript

const name = variableNameFor('get', 'name');
//=> getName

const name = variableNameFor('pick', 'a', 'name');
//=> pickAName
```


##### Returns


- `String`  camelized variable name




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
