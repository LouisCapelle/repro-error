import { GluegunToolbox } from 'gluegun'
import * as component from './component'
import * as navigator from './navigator'
import * as screen from './screen'
import * as query from './query'
import * as mutation from './mutation'

type Choice = 'Component' | 'Navigator' | 'Screen' | 'Query' | 'Mutation'

const generators: Record<
  Choice,
  | typeof component
  | typeof navigator
  | typeof screen
  | typeof query
  | typeof mutation
> = {
  Component: component,
  Navigator: navigator,
  Screen: screen,
  Query: query,
  Mutation: mutation,
}

export const description = 'List of generators'

export const alias = ['g']

export const run = async (toolbox: GluegunToolbox): Promise<void> => {
  const { prompt } = toolbox

  const { generator } = await prompt.ask<{ generator: Choice }>({
    type: 'select',
    name: 'generator',
    choices: Object.keys(generators),
    message: 'Which generator do you want 🤭',
  })

  generators[generator].run(toolbox)
}
