import { GluegunToolbox } from 'gluegun'
import { generateTemplates, promptBlankParam, runPrettier } from '../../utils'

export const description = 'Generates a React Native screen.'

export const run = async function (toolbox: GluegunToolbox): Promise<void> {
  // grab some features
  const {
    parameters,
    strings,
    filesystem,
    patching,
    prompt: { ask, confirm },
  } = toolbox

  // validation
  const name = await promptBlankParam(
    toolbox,
    parameters.first,
    "What's the name of the screen"
  )
  const screenName = strings.pascalCase(name)

  const NAVIGATION_FOLDER = 'app/navigation'
  const isInNavigation = await confirm(
    'Is your new screen nested inside a navigator ?'
  )
  let navigator = null
  let isNested = false
  let navigationProp = null
  let navigationPropImport = null
  let isTab = false

  if (isInNavigation) {
    const allNavigators = filesystem
      .list(NAVIGATION_FOLDER)
      .filter((name) => name !== 'index.ts' && name !== 'RootNavigator')
    const askForNavigators = {
      type: 'select',
      name: 'navigator',
      message: 'Which navigator is your new screen in ?',
      choices: allNavigators,
    }
    const navigatorResult = await ask(askForNavigators)
    navigator = navigatorResult.navigator

    isTab = await patching.exists(
      `${NAVIGATION_FOLDER}/${navigator}/${navigator}.tsx`,
      'createBottomTabNavigator'
    )
    navigationProp = isTab ? 'BottomTabNavigationProp' : 'StackNavigationProp'
    navigationPropImport = isTab
      ? '@react-navigation/bottom-tabs'
      : '@react-navigation/stack'

    isNested = await patching.exists(
      `${NAVIGATION_FOLDER}/${navigator}/${navigator}.types.ts`,
      `${navigator}Prop`
    )
  }

  const props = {
    name: screenName,
    isInNavigation,
    navigator,
    isNested,
    navigationProp,
    navigationPropImport,
  }

  // make the templates
  const templates = [
    {
      template: 'screen/screen.tsx.ejs',
      target: `app/screens/${screenName}/${screenName}.tsx`,
    },
    {
      template: 'screen/index.ts.ejs',
      target: `app/screens/${screenName}/index.ts`,
    },
    {
      template: 'screen/screen.props.ts.ejs',
      target: `app/screens/${screenName}/${screenName}.props.ts`,
    },
    {
      template: 'screen/screen.styles.ts.ejs',
      target: `app/screens/${screenName}/${screenName}.styles.ts`,
    },
  ]
  await generateTemplates(toolbox, templates, props)

  await patching.append(
    'app/screens/index.ts',
    `export * from './${screenName}'`
  )

  if (isInNavigation) {
    await patching.patch(
      `${NAVIGATION_FOLDER}/${navigator}/${navigator}.types.ts`,
      {
        after: `export type ${navigator}ParamList = {\n`,
        insert: `${screenName}: undefined\n`,
      }
    )
    const navigatorFunction = isTab
      ? 'createBottomTabNavigator'
      : 'createStackNavigator'
    await patching.patch(`${NAVIGATION_FOLDER}/${navigator}/${navigator}.tsx`, {
      after: `import { ${navigatorFunction} } from '${navigationPropImport}'\n`,
      insert: `import { ${screenName} } from '@screens/${screenName}'\n`,
    })
    const navigationType = isTab ? 'Tab' : 'Stack'
    let insert =
      `<${navigationType}.Screen\n` +
      `        name="${screenName}"\n` +
      `        component={${screenName}}\n`
    if (isTab) {
      insert =
        insert +
        '        options={{ tabBarIcon: (): any => <Icon name="home" /> }}\n'
    }
    insert = insert + '      />\n'
    await patching.patch(`${NAVIGATION_FOLDER}/${navigator}/${navigator}.tsx`, {
      before: `</${navigationType}.Navigator>\n`,
      insert,
    })
  }

  await runPrettier(toolbox, [
    ...templates.map((template) => template.target),
    'app/screens/index.ts',
    isInNavigation && `${NAVIGATION_FOLDER}/${navigator}/${navigator}.types.ts`,
    isInNavigation && `${NAVIGATION_FOLDER}/${navigator}/${navigator}.tsx`,
  ])
}
