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



#### mapToUpper(values) 

convert list of values to upper values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `Array.<String>` `String`  | list to convert to upper | &nbsp; |




##### Examples

```javascript

const mapToUpper = mapToUpper('a');
//=> ['A']

const mapToUpper = mapToUpper(['a', 'b'], 'c');
//=> ['A', 'B', 'C']
```


##### Returns


- `Array.&lt;String&gt;`  list of upper values



#### mapToLower(values) 

convert list of values to lower values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| values | `Array.<String>` `String`  | list to convert to lower | &nbsp; |




##### Examples

```javascript

const mapToLower = mapToLower('A');
//=> ['a']

const mapToLower = mapToLower(['A', 'B'], 'C');
//=> ['a', 'b', 'c']
```


##### Returns


- `Array.&lt;String&gt;`  list of lower values



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



#### pkg([path], field) 

read package information




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid path to package.json file | *Optional* |
| field | `String` `Array.<String>` `String`  | fields to pick from package | &nbsp; |




##### Examples

```javascript

const { name, version } = pkg();
// => { name: ..., version: ...}

const { name, version } = pkg(__dirname);
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



#### has(collection, value) 

check if value is in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array` `Object` `string`  | The collection to inspect. | &nbsp; |
| value | `Mixed`  | The value to search for. | &nbsp; |




##### Examples

```javascript

const hasValue = has([ 1, 2 ], 1);
//=> true

const hasValue = has([ 'a', 'b' ], 'c');
//=> false
```


##### Returns


- `Boolean`  whether value is in collection



#### hasAll(collection, values) 

check if all value are in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array`  | The collection to inspect. | &nbsp; |
| values | `Array` `Mixed`  | The values to search for. | &nbsp; |




##### Examples

```javascript

const hasValues = hasAll([ 1, 2 ], 1, 2);
//=> true

const hasValues = hasAll([ 1, 2 ], [ 1, 2 ]);
//=> true

const hasValues = hasAll([ 'a', 'b' ], 'c', 'd');
//=> false
```


##### Returns


- `Boolean`  whether values are in collection



#### hasAny(collection, values) 

check if any value is in a collection




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| collection | `Array`  | The collection to inspect. | &nbsp; |
| values | `Array` `Mixed`  | The values to search for. | &nbsp; |




##### Examples

```javascript

const hasValues = hasAny([ 1, 2 ], 1, 2);
//=> true

const hasValues = hasAny([ 1, 2 ], [ 1, 2 ]);
//=> true

const hasValues = hasAny([ 'a', 'b' ], 'b', 'd');
//=> true

const hasValues = hasAny([ 'a', 'b' ], 'c', 'd');
//=> false
```


##### Returns


- `Boolean`  whether any value is in collection



#### bagify(errors) 

normalize errors bag to light weight object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| errors | `Object`  | valid errors bag | &nbsp; |




##### Examples

```javascript

const body = bagify({name : new Error('Validation Error') });
//=> { name: { name: 'Error', message: 'Name Required'}, ... }
```


##### Returns


- `Object`  formatted errors bag



#### mapErrorToObject(error[, options]) 

convert error instance to light weight object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| error | `Error`  | valid error instance | &nbsp; |
| options | `Object`  | additional convert options | *Optional* |
| options.name&#x3D;Error | `String`  | default error name | *Optional* |
| options.code&#x3D;500 | `String`  | default error code | *Optional* |
| options.stack&#x3D;false | `String`  | where to include error stack | *Optional* |




##### Examples

```javascript

const body = mapErrorToObject(new Error('Missing API Key'));
//=> { name:'Error', message: 'Missing API Key', ... }
```


##### Returns


- `Object`  formatted error object



#### osInfo() 

obtain operating system information






##### Examples

```javascript

const info = osInfo();
//=> { arch:'x64', ... }
```


##### Returns


- `Object`  os information object



#### processInfo() 

obtain current process information






##### Examples

```javascript

const info = processInfo();
//=> { pid: 8989, ... }
```


##### Returns


- `Object`  current process information



#### randomColor([optns]) 

enerating attractive random colors




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| optns | `Object`  | valid generator options | *Optional* |
| optns.luminosity&#x3D;light | `Object`  | controls the luminosity of the generated color. you can specify a string containing `bright`, `light` or<br>`dark`. | *Optional* |




##### Examples

```javascript

const color = randomColor();
//=> #C349D8
```


##### Returns


- `String`  random color




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
