import { RunPrettier } from './runPrettier.types'

export const runPrettier: RunPrettier = async (toolbox, files) => {
  const { print, system } = toolbox
  const spinner = print.spin('Run prettier')
  await system.exec('yarn prettier --write ' + files.filter(Boolean).join(' '))
  spinner.succeed('Pretty 💅')
}
