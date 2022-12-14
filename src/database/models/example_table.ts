'use strict';

import { Model, Optional } from 'sequelize';

interface example_tableAttributes {
  id: number,
  name: string
};

interface example_tableCreationAttributes
  extends Optional<example_tableAttributes, 'id'> {}

interface example_tableInstance
extends Model<example_tableAttributes, example_tableCreationAttributes>,
example_tableAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class example_table extends Model<example_tableAttributes> 
    implements example_tableAttributes{
    id!: number;
    name!: string;

    static associate(models: any) {
      // define association here
    }
  };
  example_table.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'example_table',
  });
  return example_table;
};
