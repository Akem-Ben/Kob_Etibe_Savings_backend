import {Model, DataTypes} from 'sequelize';
import {db} from '../config';

export enum Role {
    ADMIN = "Admin",
    CONTRIBUTOR = "Contributor"
}

export type UserAttributes = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string;
    password: string;
    role: Role;
    phone: string;
    otp: number;
    verified: boolean;
}

class Users extends Model<UserAttributes>{}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...Object.values(Role)),
            allowNull: true
        },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        sequelize: db,
        tableName: "Users",
        modelName: "Users"
    }
)

export default Users