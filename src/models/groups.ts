import { Model, DataTypes } from "sequelize";
import { db } from "../config";
import Users from "./users";

interface GroupTransactions {
    transaction_id: string;
    date_contributed:Date;
    contributors_id: string;
    amount_contributed: number;
}

enum frequency {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly"
}

interface Members {
    member_id: string;
    name: string;
    amount_contributed: number;
    amount_withdrawn: number;
}

export type GroupAttributes = {
    id: string;
    title: string;
    description: string;
    admin_id: string;
    monthly_contribution: number;
    amount_contributed: number;
    group_transactions: GroupTransactions[];
    amount_withdrawn: number;
    members: Members[];
    number_of_participants: number;
    frequency: string;
    startDate: Date;
    endDate: Date;
}

class Groups extends Model<GroupAttributes>{}

Groups.init(
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        field: "Content of the post",
        allowNull: false
      },
      admin_id: {
        type: DataTypes.UUID,
        references: {
          model: Users,
          key: "id",
        },
      },
      group_transactions: {
        type: DataTypes.JSON,
        allowNull: true
      },
      members: {
        type: DataTypes.JSON,
        allowNull: true
      },
      amount_contributed: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      monthly_contribution: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount_withdrawn: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      number_of_participants: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      frequency: {
        type: DataTypes.ENUM(...Object.values(frequency)),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.DATE,
      },
},
{
    sequelize: db,
    tableName: "Groups",
    modelName: "Groups"
}
)

export default Groups