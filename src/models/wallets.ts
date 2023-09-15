import {Model, DataTypes} from 'sequelize';
import {db} from '../config';
import Users from './users'

export enum WalletType {
    GLOBAL = "Global",
    SAVINGS = "Savings",
    GROUP_WALLET = "Group Wallet"
}

export type WalletAttributes = {
    id: string;
    user_id: string;
    balance: number;
    type: WalletType;
    created_at: Date;
    updated_at: Date;
    total_group_savings: number;
    total_personal_savings: number;
};

class Wallets extends Model<WalletAttributes>{}

Wallets.init (
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: Users,
                key: "id"
            }
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM(...Object.values(WalletType)),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        total_group_savings: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total_personal_savings: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: db,
        tableName: "Wallets",
        modelName: "Wallets"
    }
)

export default Wallets