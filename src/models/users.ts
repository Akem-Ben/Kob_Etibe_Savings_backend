import {Model, DataTypes} from 'sequelize';
import {db} from '../config';

enum role {
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
    role: string;
    created_at: Date;
    updated_at: Date;
    otp: number;
}

class Users extends Model<UserAttributes>{}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
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
            type: DataTypes.ENUM(...Object.values(role)),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize: db,
        tableName: "Users",
        modelName: "Users"
    }
)

export default Users