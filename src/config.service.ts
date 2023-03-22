import {registerAs} from "@nestjs/config";

export default registerAs('database', () => {
    return {
        type: process.env.DB_TYPE,
        logging: true,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        // synchronize: process.env.MODE === "dev",
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['src/migrations/*{.ts,.js}'],
        cli: {
            migrationsDir: 'src/migrations'
        },
    }
})