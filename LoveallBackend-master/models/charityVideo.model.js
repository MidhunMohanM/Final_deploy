import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const CharityVideo = sequelize.define('charity_video', {
    video_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    video: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT, // New column
        allowNull: true
    }
}, {
    tableName: 'charity_videos',
    timestamps: false
});

export default CharityVideo;
