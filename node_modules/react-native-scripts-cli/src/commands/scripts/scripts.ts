import { GluegunToolbox } from 'gluegun'
import * as fontello from './fontello'
import * as configureEnv from './configure-env'

type Choice = 'Fontello' | 'Configure env'

const scripts: Record<Choice, typeof fontello | typeof configureEnv> = {
  Fontello: fontello,
  'Configure env': configureEnv,
}

export const description =
  'List of scripts to manage react-native project easily'

export const alias = ['s']

export const run = async (toolbox: GluegunToolbox): Promise<void> => {
  const { prompt } = toolbox

  const { script } = await prompt.ask<{ script: Choice }>({
    type: 'select',
    name: 'script',
    choices: Object.keys(scripts),
    message: 'Which script do you want to run 🤭',
  })

  scripts[script].run(toolbox)
}
