import { GluegunToolbox } from 'gluegun'
import { generateTemplates, promptBlankParam, runPrettier } from '../../utils'

export const description = 'Generates a React Navigation navigator.'
export const run = async function (toolbox: GluegunToolbox): Promise<void> {
  // grab some features
  const {
    parameters,
    strings,
    patching,
    prompt: { ask, confirm },
    filesystem: { list },
  } = toolbox

  const navigatorTypes = {
    Stack: 'createStackNavigator',
    Tab: 'createBottomTabNavigator',
    // Drawer: 'createDrawerNavigator',
  }

  // validation
  let name = await promptBlankParam(
    toolbox,
    parameters.first,
    "What's the name of the navigator"
  )
  name = strings.pascalCase(name)

  const navigatorName = strings.pascalCase(
    name.toLocaleLowerCase().endsWith('navigator') ? name : `${name}Navigator`
  )

  const NAVIGATION_FOLDER = `app/navigation`

  // what navigator type to generate?
  let navigatorType = parameters.options.type
  if (!navigatorType) {
    const askForNavigatorType = {
      type: 'select',
      name: 'navigatorType',
      message: 'What type of navigator do you want to create ?',
      initial: 'Stack',
      choices: Object.keys(navigatorTypes),
    }

    const navigatorTypeResult = await ask(askForNavigatorType)
    navigatorType = navigatorTypeResult.navigatorType
  }

  // is the navigator nested ?
  let isNested = parameters.options.nested !== undefined
  let nestedNavigator = parameters.options.nestedNavigator
  let nestedType = null

  const askIfNested =
    parameters.options.nested === undefined && navigatorType === 'Stack'
  isNested = askIfNested
    ? await confirm('Is your new navigator nested inside another one ?')
    : parameters.options.nested === true

  let isTab = true
  if (isNested) {
    const allNavigators = list(NAVIGATION_FOLDER).filter(
      (name) => name !== 'index.ts' && name !== 'RootNavigator'
    )
    const askForNavigators = {
      type: 'select',
      name: 'nestedNavigator',
      message: 'Which navigator is your new navigator nested in ?',
      choices: allNavigators,
    }

    const navigatorResult = await ask(askForNavigators)
    nestedNavigator = navigatorResult.nestedNavigator

    // check if nested navigator is tab
    isTab = await patching.exists(
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.tsx`,
      navigatorTypes.Tab
    )
    nestedType = isTab ? 'Tab' : 'Stack'
  }

  const props = {
    name: navigatorName,
    navigatorType,
    isNested,
    nestedType,
    nestedNavigator,
  }

  // make the template
  const templates = [
    {
      template: `navigator/navigator.${navigatorType.toLowerCase()}.tsx.ejs`,
      target: `app/navigation/${navigatorName}/${navigatorName}.tsx`,
    },
    {
      template: 'navigator/navigator.types.ts.ejs',
      target: `app/navigation/${navigatorName}/${navigatorName}.types.ts`,
    },
    {
      template: 'navigator/index.ts.ejs',
      target: `app/navigation/${navigatorName}/index.ts`,
    },
  ]
  await generateTemplates(toolbox, templates, props)

  if (isNested) {
    const before = `</${nestedType}.Navigator>\n`
    let insert =
      `      <${nestedType}.Screen\n` +
      `        name="${navigatorName}"\n` +
      `        component={${navigatorName}}\n`
    if (isTab) {
      insert =
        insert +
        '        options={{ tabBarIcon: (): any => <Icon name="home" /> }}\n'
    }
    insert = insert + '      />\n'
    await patching.patch(
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.tsx`,
      {
        before,
        insert,
      }
    )

    await patching.patch(
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.types.ts`,
      {
        after: `export type ${nestedNavigator}ParamList = {\n`,
        insert: `  ${navigatorName}: undefined\n`,
      }
    )

    await patching.patch(
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.tsx`,
      {
        after: `import { ${nestedNavigator}ParamList } from './${nestedNavigator}.types'\n`,
        insert: `import { ${navigatorName} } from '../${navigatorName}'\n`,
      }
    )
  }

  await patching.append(
    `${NAVIGATION_FOLDER}/index.ts`,
    `export * from './${navigatorName}'`
  )

  await runPrettier(toolbox, [
    ...templates.map((template) => template.target),
    `${NAVIGATION_FOLDER}/index.ts`,
    isNested &&
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.tsx`,
    isNested &&
      `${NAVIGATION_FOLDER}/${nestedNavigator}/${nestedNavigator}.types.ts`,
  ])
}
