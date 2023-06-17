import { ModuleMetadata } from '@nestjs/common'
import * as Airtable from 'airtable'

export type AirtableModuleOptions = Airtable.AirtableOptions

export interface AirtableModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<AirtableModuleOptions> | AirtableModuleOptions
  inject?: any[]
}
