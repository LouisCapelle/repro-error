import { GluegunToolbox } from 'gluegun'
import { promptBlankParam, generateTemplates, runPrettier } from '../../utils'

export const description = 'Generates mutation hook'

export const run = async (toolbox: GluegunToolbox): Promise<void> => {
  const { parameters, strings, patching, print } = toolbox

  const mutationName = await promptBlankParam(
    toolbox,
    parameters.first,
    "What's the name of the mutation"
  )

  const gqlName = strings.snakeCase(mutationName).toUpperCase()
  const hookName = 'use' + strings.pascalCase(mutationName)

  const templates = [
    {
      template: 'mutation/index.ts.ejs',
      target: `app/api/hooks/${hookName}/index.ts`,
    },
    {
      template: 'mutation/mutation.gql.ts.ejs',
      target: `app/api/hooks/${hookName}/${hookName}.gql.ts`,
    },
    {
      template: 'mutation/mutation.ts.ejs',
      target: `app/api/hooks/${hookName}/${hookName}.ts`,
    },
  ]

  await generateTemplates(toolbox, templates, {
    mutationName,
    gqlName,
    hookName,
  })

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
