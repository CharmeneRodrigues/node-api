import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../instances/pg';

export interface FotoInstance extends Model {
    id:number;
    nome: string; 
    imagem: ArrayBuffer; 
}

export const Foto = sequelize.define<FotoInstance>('Foto', {
    id: {
        primaryKey: true,
        autoIncrement: true, 
        type: DataTypes.INTEGER 
    },
    nome: {
        type: DataTypes.STRING   
    }, 
    imagem: {
        type:  DataTypes.BLOB
    }
},  {
    tableName: 'fotos',
    timestamps:false
});