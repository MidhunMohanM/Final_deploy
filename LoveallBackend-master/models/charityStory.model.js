import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const CharityStory = sequelize.define('charity_story', {
    story_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    story: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'charity_stories',
    timestamps: false
});

export default CharityStory;
