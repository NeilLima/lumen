/* eslint-disable prettier/prettier */
// Módulos
export * from './core.module.js';
export * from './storage/storage.module.js';

// Interfaces Base
export * from './base/interfaces/entity.interface.js';
export * from './base/interfaces/repository.interface.js';
export * from './base/interfaces/crud.interface.js';
export * from './base/interfaces/query-options.interface.js';

// Implementações Base
export * from './base/implementations/base.repository.js';
export * from './base/implementations/base.service.js';
export * from './base/implementations/base.controller.js';

// Decoradores
export * from './base/decorators/crud.decorator.js';
export * from './storage/decorators/upload.decorator.js';

// Utilitários
export * from './base/utils/query.builder.js';
export * from './base/utils/response.builder.js';
export * from '../config/id-formatter.config.js';

// Serviços de Armazenamento
export * from './storage/interfaces/storage.interface.js';
export * from './storage/implementations/local.storage.js'; 