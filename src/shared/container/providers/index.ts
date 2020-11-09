import {container} from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/etherealMailProvider'


import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import HandleBarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandleBarsMailTemplateProvider'


container.registerSingleton<IStorageProvider>('StorageProvider',DiskStorageProvider)

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider',HandleBarsMailTemplateProvider)

container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherealMailProvider))