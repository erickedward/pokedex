export const EnvConfiguration = () => ({
    enviroment: process.env.NODE || 'dev',
    mongodb: process.env.MONGODB,
    port: +process.env.MONGODB || 3000,
    default_limit: +process.env.DEFAULT_LIMIT || 10,
})