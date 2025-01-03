import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const CharityImage = sequelize.define('charity_image', {
    image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, // New column
        allowNull: true
    }
}, {
    tableName: 'charity_images',
    timestamps: false
});

export default CharityImage;
