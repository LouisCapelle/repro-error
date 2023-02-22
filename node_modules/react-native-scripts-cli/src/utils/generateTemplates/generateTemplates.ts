import { GenerateTemplates } from './generateTemplates.types'

export const generateTemplates: GenerateTemplates = async (
  toolbox,
  templates,
  props
) => {
  const spinner = toolbox.print.spin('Generating files from templates... 🧙‍♂️')

  await Promise.all(
    templates.map((template) =>
      toolbox.template.generate({
        ...template,
        props,
      })
    )
  )

  spinner.succeed('Voila, files generated ! 💫')
}
