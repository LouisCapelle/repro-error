import { GluegunToolbox } from 'gluegun'
import { promptBlankParam, generateTemplates, runPrettier } from '../../utils'

export const description = 'Generates query hook'

export const run = async (toolbox: GluegunToolbox): Promise<void> => {
  const { parameters, strings, patching, print } = toolbox

  const queryName = await promptBlankParam(
    toolbox,
    parameters.first,
    "What's the name of the query"
  )

  const gqlName = strings.snakeCase(queryName).toUpperCase()
  const hookName = 'use' + strings.pascalCase(queryName)

  const templates = [
    {
      template: 'query/index.ts.ejs',
      target: `app/api/hooks/${hookName}/index.ts`,
    },
    {
      template: 'query/query.gql.ts.ejs',
      target: `app/api/hooks/${hookName}/${hookName}.gql.ts`,
    },
    {
      template: 'query/query.ts.ejs',
      target: `app/api/hooks/${hookName}/${hookName}.ts`,
    },
  ]

  await generateTemplates(toolbox, templates, { queryName, gqlName, hookName })

  await patching.append(
    'app/api/hooks/index.ts',
    `export * from './${hookName}'`
  )

  await runPrettier(toolbox, [
    ...templates.map((template) => template.target),
    'app/api/hooks/index.ts',
  ])

  print.newline()
  print.warning(
    "Don't forget to generate GraphQL types (yarn graphql:generate), after completing the gql file 🖖"
  )
}
