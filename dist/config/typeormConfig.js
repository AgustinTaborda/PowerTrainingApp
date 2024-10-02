"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
if (process.env.NODE_ENV !== 'production') {
    (0, dotenv_1.config)({
        path: './.env',
    });
}
const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: true,
    logging: process.env.NODE_ENV !== 'production',
    dropSchema: false,
};
exports.connectionSource = new typeorm_1.DataSource(config);
exports.default = (0, config_1.registerAs)('typeorm', () => config);
//# sourceMappingURL=typeormConfig.js.map