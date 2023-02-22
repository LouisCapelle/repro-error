import { PromptBlankParam } from './promptBlankParam.types'

export const promptBlankParam: PromptBlankParam = async (
  toolbox,
  param,
  message = "What's the name"
) => {
  const { strings, prompt, print } = toolbox

  if (strings.isBlank(param)) {
    const promptResult = await prompt.ask<{ name: string }>({
      type: 'input',
      name: 'name',
      message: message + ' 🧐',
    })

    if (strings.isBlank(promptResult.name)) {
      print.error('You entered nothing 🙅‍♀️')
      return await promptBlankParam(toolbox, param)
    }

    return promptResult.name
  }

  return param
}
