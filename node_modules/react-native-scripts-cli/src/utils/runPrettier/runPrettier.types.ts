import { GluegunToolbox } from 'gluegun'

export type RunPrettier = (
  toolbox: GluegunToolbox,
  files: string[]
) => Promise<void>
