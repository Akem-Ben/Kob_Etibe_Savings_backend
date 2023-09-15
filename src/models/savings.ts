import { Model, DataTypes } from "sequelize";
import { db } from "../config";
import Users from "./users";

export enum Frequency {
    DAILY = "Daily",
    WEEKLY = "Weekly",
    MONTHLY = "Monthly",
    ANNUALLY = "Annually"
  }
  
  export type SavingAttributes = {
    id: string;
    user_id: string;
    name: string;
    target: string;
    target_amount: number;
    amount_saved: number;
    frequency: Frequency;
    startDate: Date;
    endDate: Date;
  };

  class Savings extends Model<SavingAttributes> {}

Savings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(Frequency)),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    target_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount_saved: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    tableName: "Savings",
    modelName: "Savings",
  }
);


export default Savings