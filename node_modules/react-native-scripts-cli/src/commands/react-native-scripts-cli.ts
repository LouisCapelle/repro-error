import { GluegunCommand } from 'gluegun'
import * as generate from './generate/generate'
import * as scripts from './scripts/scripts'

type Choice = 'Generate' | 'Scripts'

const commands: Record<Choice, typeof generate | typeof scripts> = {
  Generate: generate,
  Scripts: scripts,
}

const command: GluegunCommand = {
  name: 'react-native-scripts-cli',
  run: async (toolbox) => {
    const { prompt } = toolbox

    const { command } = await prompt.ask<{ command: Choice }>({
      type: 'select',
      name: 'command',
      choices: Object.keys(commands),
      message: 'What do you want 🤷‍♂️',
    })

    commands[command].run(toolbox)
  },
}

module.exports = command
