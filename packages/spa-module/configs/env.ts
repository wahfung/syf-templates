// src/config/env.ts
interface AppConfig {
  NODE_ENV: string
  API_URL: string
  isDevelopment: boolean
  isProduction: boolean
}

// 通过webpack DefinePlugin注入的变量
declare const __NODE_ENV__: string
declare const __API_URL__: string

export const config: AppConfig = {
  NODE_ENV: __NODE_ENV__ ,
  API_URL: __API_URL__ ,
  isDevelopment: __NODE_ENV__ === 'development',
  isProduction: __NODE_ENV__ === 'production',
}