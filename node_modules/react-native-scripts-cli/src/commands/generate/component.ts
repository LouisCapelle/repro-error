import { GluegunToolbox } from 'gluegun'
import { generateTemplates, promptBlankParam, runPrettier } from '../../utils'

export const description =
  'Generates a component, supporting files, and a storybook test.'

export const run = async function (toolbox: GluegunToolbox): Promise<void> {
  // grab some features
  const { parameters, strings, patching } = toolbox

  // validation
  let name = await promptBlankParam(
    toolbox,
    parameters.first,
    "What's the name of the component"
  )
  name = strings.pascalCase(name)

  const templates = [
    {
      template: 'component/component.story.tsx.ejs',
      target: `app/components/${name}/${name}.story.tsx`,
    },
    {
      template: 'component/index.ts.ejs',
      target: `app/components/${name}/index.ts`,
    },
    {
      template: 'component/component.props.ts.ejs',
      target: `app/components/${name}/${name}.props.ts`,
    },
    {
      template: 'component/component.styles.ts.ejs',
      target: `app/components/${name}/${name}.styles.ts`,
    },
    {
      template: 'component/component.tsx.ejs',
      target: `app/components/${name}/${name}.tsx`,
    },
  ]

  await generateTemplates(toolbox, templates, { name })

  await patching.append('app/components/index.ts', `export * from './${name}'`)

  await patching.append(
    'storybook/storybook-registry.ts',
    `require('../app/components/${name}/${name}.story')`
  )
  await runPrettier(toolbox, [
    ...templates.map((template) => template.target),
    'app/components/index.ts',
    'storybook/storybook-registry.ts',
  ])
}
