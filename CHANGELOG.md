#### 0.13.0 (2019-04-01)

##### New Features

*  add error normalizer to object ([f2964009](https://github.com/lykmapipo/common/commit/f296400946de0ee56dad1699632caaabdf3fe424))

##### Refactors

*  improve error to object use cases ([1a4fed76](https://github.com/lykmapipo/common/commit/1a4fed76e5678584815f8e3efb586a18a974e6fd))

#### 0.12.1 (2019-04-01)

##### Chores

*  force latest dependencies ([37c311cb](https://github.com/lykmapipo/common/commit/37c311cb1fd6b10fa4265f3e3c207c9109179663))

##### Bug Fixes

*  convert to string before check for emptiness ([e96e8508](https://github.com/lykmapipo/common/commit/e96e85088f8c0dc85be06471cf085f9a66f70b87))

##### Tests

*  allow empty check for numbers and arrays ([5ceba1d8](https://github.com/lykmapipo/common/commit/5ceba1d8285afd2383f08c506fd0d33275aac241))

#### 0.12.0 (2019-03-24)

##### New Features

*  add map to lower for array values ([9dd3857e](https://github.com/lykmapipo/common/commit/9dd3857e34362872fb58868b9adb69d93a7c7c6b))
*  add array map to upper ([c719998f](https://github.com/lykmapipo/common/commit/c719998f0939b564cc0b91b4225f15da1d56f499))

#### 0.11.1 (2019-03-22)

##### Chores

*  exclude builds from lint-stage to enforce use strict on cjs ([b0dca3de](https://github.com/lykmapipo/common/commit/b0dca3de25623a50fdbcacd06e5b69566769e4bc))

#### 0.11.0 (2019-03-22)

##### New Features

*  add hasAny to check if collection has any value ([5bd99aec](https://github.com/lykmapipo/common/commit/5bd99aec4fbbf9802e3aeed47dbaa580c84cc28f))
*  add hasAll to check if collection has all values ([951fd844](https://github.com/lykmapipo/common/commit/951fd844153c23ba4a9cd077a0afddd17100d2c3))
*  add has to check if value is in collection ([71d85f29](https://github.com/lykmapipo/common/commit/71d85f296de4263b228ee8b64a20c3fa328ec7b9))

#### 0.10.0 (2019-03-22)

##### New Features

*  add camelized variable name generator ([cc97b847](https://github.com/lykmapipo/common/commit/cc97b847ca430564826271231d42b3795a4ef4b8))
*  add mergeObjects to merge list of objects to single object ([e7bda400](https://github.com/lykmapipo/common/commit/e7bda4001e9206ea233f6edd24cb95ca86c1919c))
*  add idOf allow get an id or _id of an object ([820e1fca](https://github.com/lykmapipo/common/commit/820e1fcae7d815acc64121bc4c29a8730fecbdaf))

##### Refactors

*  idOf to return undefined for object with no id ([7e5381d5](https://github.com/lykmapipo/common/commit/7e5381d54eadcdb6e5fe797d79696e5705f73701))

##### Code Style Changes

*  make resource action private ([6b4b0587](https://github.com/lykmapipo/common/commit/6b4b0587ca2ae5e42cede8a160d3202aff3f28b7))
*  improve and correct jsdoc ([1f63da20](https://github.com/lykmapipo/common/commit/1f63da201d040d6c76e21e473755d72f3a04ddd9))
*  improve jsdoc ([47688f17](https://github.com/lykmapipo/common/commit/47688f17bde8a3b883882489b4967bdfa12644ad))

#### 0.9.0 (2019-03-22)

##### Bug Fixes

*  unresolved dependencies for builds ([ae500c9d](https://github.com/lykmapipo/common/commit/ae500c9d28805cc024fa2d802c9a2454dab63f0d))

##### Refactors

*  migrate to use rollup and npm scripts ([a74ff669](https://github.com/lykmapipo/common/commit/a74ff6699144d29bf81a625268b500ec788274ea))

#### 0.8.0 (2019-02-12)

##### New Features

*  implement words abbreviation generator ([7afc6587](https://github.com/lykmapipo/common/commit/7afc6587103c3b0ce5e6e0144dbd5629148d0723))

#### 0.7.0 (2019-02-08)

##### New Features

*  add areNotEmpty to check for varags emptiness ([0606e794](https://github.com/lykmapipo/common/commit/0606e79415b5fb4be98b2bbdca08ea55b6647e8e))

#### 0.6.0 (2019-02-01)

##### Documentation Changes

*  add scopesFor usage doc ([29d0b9bc](https://github.com/lykmapipo/common/commit/29d0b9bc456eeb81d17bba2221a173cd50ba5822))

##### New Features

*  add resource scope generator ([5f5046e4](https://github.com/lykmapipo/common/commit/5f5046e411fa142c683983956a68d60981101c53))

#### 0.5.0 (2019-01-30)

##### New Features

*  add map feature default values ([c503d3e9](https://github.com/lykmapipo/common/commit/c503d3e95ed90b4f3be75e8f01e10f30ed93aee7))
*  expose map feature places tags ([875a3502](https://github.com/lykmapipo/common/commit/875a3502ade3fc8936a946e1720c89a772f15c44))
*  add map feature families ([7afc38a4](https://github.com/lykmapipo/common/commit/7afc38a422e4383dd2d51d815a8f7386eedd257f))

##### Refactors

*  rename MAP_FEATURE_GROUPS to MAP_FEATURE_NATURES ([927a51d8](https://github.com/lykmapipo/common/commit/927a51d81ef615622b9535723356907cd86cef7c))

#### 0.4.2 (2019-01-29)

##### Chores

*  generate changelog & bump to v0.4.2 ([610a199f](https://github.com/lykmapipo/common/commit/610a199fafb9372c168495b49cf54016ed93111f))

##### Refactors

*  rename MAP_FEATURES_GROUP to MAP_FEATURE_GROUPS ([b32763bb](https://github.com/lykmapipo/common/commit/b32763bb8b30aaddb83c0fd68994767ec5d33066))

#### 0.4.1 (2019-01-29)

##### Chores

*  genarate changelog & bump to v0.4.0 ([6a078c98](https://github.com/lykmapipo/common/commit/6a078c98b5448009672703df3c916af3ba4b431d))

##### New Features

*  add map feature group constans ([18841d4d](https://github.com/lykmapipo/common/commit/18841d4d8770874761bad2b7ba4c0f5ec1649918))

##### Other Changes

*  update usage doc ([11c4f8dc](https://github.com/lykmapipo/common/commit/11c4f8dc67c152aab0509ae0cb7bc70db9068661))

##### Refactors

*  rename constants to use upper name convection ([80f2c7d3](https://github.com/lykmapipo/common/commit/80f2c7d36bdd6729186601c75f30850c605bebaf))

#### 0.4.0 (2019-01-29)

##### New Features

*  add map feature group constans ([18841d4d](https://github.com/lykmapipo/common/commit/18841d4d8770874761bad2b7ba4c0f5ec1649918))

##### Refactors

*  rename constants to use upper name convection ([80f2c7d3](https://github.com/lykmapipo/common/commit/80f2c7d36bdd6729186601c75f30850c605bebaf))

#### 0.3.0 (2019-01-28)

##### Documentation Changes

*  update usage doc ([7a16a147](https://github.com/lykmapipo/common/commit/7a16a147581d0a37409998aad489a5be747e92f5))

##### New Features

*  add country calling codes constants ([c0a48667](https://github.com/lykmapipo/common/commit/c0a48667bfc33cc070bbb73030cbd5695adbb374))
*  expose country codes constants ([de750431](https://github.com/lykmapipo/common/commit/de7504311b41f318e6ec1fe1e486cec48918880b))
*  add continent and country names constants ([930dfcef](https://github.com/lykmapipo/common/commit/930dfcef9e97b2a96f6869ada55f5e5f23d759fc))

