import { GluegunToolbox } from 'gluegun'

export type PromptBlankParam = (
  toolbox: GluegunToolbox,
  param: string,
  message?: string
) => Promise<string>
