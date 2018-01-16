```
yarn run build
```

## TODO

- creates snapshot if doesn't exist
- Flow
- tests (CI):

```
yarn babel-node src/index.js -- --schema=../tests/schema.js --snapshot=../tests/doesntexist.json
yarn babel-node src/index.js -- --schema=../tests/schema.js --snapshot=../tests/snapshot.json
yarn babel-node src/index.js -- --schema=../tests/schema.breaking.js --snapshot=../tests/snapshot.json
yarn babel-node src/index.js -- --schema=../tests/schema.compatible.js --snapshot=../tests/snapshot.json
```
