import { findBreakingChanges, type GraphQLSchema } from 'graphql';
import chalk from 'chalk';

const printChanges = changes => {
  console.error('');
  for (const change of changes) {
    console.error(chalk.red.bold(change.type) + ' - ' + change.description);
  }
  console.error('');
};

export default (oldSchema: GraphQLSchema, newSchema: GraphQLSchema) => {
  const changes = findBreakingChanges(oldSchema, newSchema);
  if (changes.length > 0) {
    console.error(
      chalk.red(
        'You introduced breaking changes into the public GraphQL schema. ',
      ) +
        'This change may or may not be intentional. These breaking changes ' +
        'may break some clients consuming our public API. Please try to ' +
        'find a way how to avoid breaking changes and try it again. Here is ' +
        'list of all breaking changes:',
    );
    printChanges(changes);
    console.error(
      `Tips how to avoid breaking changes:

- field removal/modification (introduce new field and only deprecate the old one)
- type removal/modification (just deprecate it and leave it there)
- removal from enum/union (introduce new enum/union)
- arguments removal/modification (introduce new query or graph node)
- change nullable -> non-nullable (just don't do it or introduce new field)
- interface removal (don't or introduce new objects)
- change of default argument value (don't or introduce new argument/query)
`,
    );
    process.exit(1);
  }
};
