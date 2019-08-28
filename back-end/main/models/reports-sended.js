const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const ReportsSended = sequelize.define('reports_sended', {
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
        primaryKey: true
    },
    report_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'reports',
            key: 'id'
        },
        primaryKey: true
    }
});

module.exports = ReportsSended;
