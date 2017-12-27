## TODO

- creates snapshot if doesn't exist
- Babel
- tests:

```
yarn babel-node src/index.js -- --schema=../tests/schema.js --snapshot=../tests/snapshot.json
yarn babel-node src/index.js -- --schema=../tests/schema.breaking.js --snapshot=../tests/snapshot.json
yarn babel-node src/index.js -- --schema=../tests/schema.compatible.js --snapshot=../tests/snapshot.json
```
