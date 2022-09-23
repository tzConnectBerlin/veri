import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize/types';
import { Tasks } from '../model/task.model';

export const connect = () => {

    const hostName = 'localhost' //process.env.HOST;
    const userName = 'veri' //process.env.USER;
    const password = 'veri' //process.env.PASSWORD;
    const database = 'veri' //process.env.DB;
    const dialect: Dialect = 'postgres' //process.env.DIALECT;

    console.log('dialect  ', dialect)

    const operatorsAliases: any = false;

    const sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        operatorsAliases,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    });

    sequelize.addModels([Tasks]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    
    return db;

}