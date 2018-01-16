import { buildClientSchema } from 'graphql';
import mri from 'mri';
import fs from 'fs';
import path from 'path';

import assertBreakingChanges from './assertBreakingChanges';
import assertOutdatedSchema from './assertOutdatedSchema';

const config = mri(process.argv, {
  string: ['schema', 'snapshot'],
});

const schema = require(path.join(process.cwd(), config.schema)).default;
const snapshotLocation = path.join(process.cwd(), config.snapshot);

let snapshot;
try {
  snapshot = require(snapshotLocation);
} catch (error) {
  // snapshot doesn't exist yet - let's create it with minimal schema
  fs.writeFileSync(
    snapshotLocation,
    JSON.stringify({
      __schema: {
        types: [],
      },
    }),
    { flag: 'wx' },
  );
  snapshot = require(snapshotLocation); // FIXME doesn't exist (?)
}

const oldSchema = buildClientSchema(snapshot);
const newSchema = schema;

(async () => {
  assertBreakingChanges(oldSchema, newSchema); // breaks immediately
  await assertOutdatedSchema(oldSchema, newSchema, schema, snapshotLocation);
})();
