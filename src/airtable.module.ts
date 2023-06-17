import { DynamicModule, Global, Module } from '@nestjs/common'
import * as Airtable from 'airtable'
import { AIRTABLE_INJECT_TOKEN, AIRTABLE_OPTIONS_TOKEN } from './airtable.constant'
import { AirtableModuleAsyncOptions, AirtableModuleOptions } from './airtable.interface'

@Global()
@Module({})
export class AirtableModule {
  static forRoot(options: AirtableModuleOptions): DynamicModule {
    const clientProvider = {
      provide: AIRTABLE_INJECT_TOKEN,
      useValue: new Airtable(options),
    }
    return {
      module: AirtableModule,
      exports: [clientProvider],
      providers: [clientProvider],
    }
  }

  static forRootAsync(options: AirtableModuleAsyncOptions): DynamicModule {
    const optionsProvider = {
      provide: AIRTABLE_OPTIONS_TOKEN,
      ...options,
    }
    const clientProvider = {
      provide: AIRTABLE_INJECT_TOKEN,
      inject: [AIRTABLE_OPTIONS_TOKEN],
      useFactory: (opt: AirtableModuleOptions) => new Airtable(opt),
    }
    return {
      module: AirtableModule,
      imports: options.imports,
      exports: [clientProvider],
      providers: [optionsProvider, clientProvider],
    }
  }
}
