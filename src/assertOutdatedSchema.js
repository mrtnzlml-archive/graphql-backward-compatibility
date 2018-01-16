import fs from 'fs';
import {
  findBreakingChanges,
  introspectionQuery,
  graphql,
  type GraphQLSchema,
} from 'graphql';
import chalk from 'chalk';

const saveSnapshot = async (schema, snapshotLocation) => {
  const meta = await graphql(schema, introspectionQuery);
  fs.writeFileSync(snapshotLocation, JSON.stringify(meta.data, null, 2));
  console.log(
    'Snapshot of the GraphQL schema successfully created! Now please commit it...\n',
  );
  process.exit(1); // this is also considered failure so CI will fail (must be committed manually)
};

export default async (
  oldSchema: GraphQLSchema,
  newSchema: GraphQLSchema,
  schema,
  snapshotLocation,
) => {
  const changes = findBreakingChanges(newSchema, oldSchema);
  if (changes.length > 0) {
    console.warn(
      chalk.yellow.bold(
        `\nGraphQL schema snapshot IS OUTDATED! (will be updated automatically - commit the changes please)`,
      ),
    );

    await saveSnapshot(schema, snapshotLocation);
  } else {
    console.log(
      chalk.green.bold(
        '\nCongratulations! NO BREAKING CHANGES or OUTDATED SCHEMA. Good job!\n',
      ),
    );
  }
};
