import { GluegunToolbox } from 'gluegun'
import { promptBlankParam, runPrettier } from '../../utils'

export const description = 'Replace font icon with new one by fontello'

export const run = async (toolbox: GluegunToolbox): Promise<void> => {
  const { filesystem, parameters, print, patching } = toolbox

  const fontelloDir = await promptBlankParam(
    toolbox,
    parameters.first,
    'Where is the fontello directory containing new icons'
  )

  // Validate Fontello project
  const spinner = print.spin('Checking fontello project... 🧑‍🍳')
  const configPath = filesystem.resolve(fontelloDir, 'config.json')
  const fontPath = filesystem.resolve(fontelloDir, 'font')
  const fontList = await filesystem.listAsync(fontPath)
  const ttfName = fontList && fontList.find((file) => file.endsWith('.ttf'))
  const ttfPath = ttfName && filesystem.resolve(fontPath, ttfName)
  if (!filesystem.exists(configPath) || !ttfPath) {
    spinner.fail('Fontello project is not valid (config or font is missing)')
    return
  }
  spinner.succeed('Fontello project is valid 🧖‍♂️')

  spinner.start('Patching files...')
  await filesystem.copyAsync(fontPath, 'app/assets/fonts', {
    overwrite: true,
    matching: '*.ttf',
  })
  await filesystem.copyAsync(
    configPath,
    'app/components/Icon/Icon.config.json',
    { overwrite: true }
  )

  await filesystem.copyAsync(configPath, 'app/components/Icon/Icon.config.ts', {
    overwrite: true,
  })
  await patching.prepend('app/components/Icon/Icon.config.ts', 'export default')
  await patching.append('app/components/Icon/Icon.config.ts', 'as const')
  spinner.succeed('Files patched, parfait 💥')

  await runPrettier(toolbox, ['app/components/Icon/Icon.config.ts'])
}
