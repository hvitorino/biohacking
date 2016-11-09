'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('LoggedAction', {
        loggedActions: {
            type: DataTypes.BIGINT,
            field: 'logged_actions',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        schemaName: {
            type: DataTypes.TEXT,
            field: 'schema_name',
            allowNull: false
        },
        tableName: {
            type: DataTypes.TEXT,
            field: 'table_name',
            allowNull: false
        },
        primaryKey: {
            type: DataTypes.TEXT,
            field: 'primary_key',
            allowNull: false
        },
        timestamp: {
            type: DataTypes.BIGINT,
            field: 'timestamp',
            allowNull: false
        },
        creation: {
            type: DataTypes.DATE,
            field: 'creation',
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT,
            field: 'user_id',
            allowNull: false
        },
        station: {
            type: DataTypes.STRING(100),
            field: 'station',
            allowNull: true
        },
        stationIp: {
            type: DataTypes.STRING(27),
            field: 'station_ip',
            allowNull: true
        },
        sessionUserName: {
            type: DataTypes.TEXT,
            field: 'session_user_name',
            allowNull: true
        },
        transactionId: {
            type: DataTypes.BIGINT,
            field: 'transaction_id',
            allowNull: true
        },
        applicationName: {
            type: DataTypes.TEXT,
            field: 'application_name',
            allowNull: true
        },
        clientAddr: {
            type: DataTypes.STRING,
            field: 'client_addr',
            allowNull: true
        },
        clientPort: {
            type: DataTypes.INTEGER,
            field: 'client_port',
            allowNull: true
        },
        clientQuery: {
            type: DataTypes.TEXT,
            field: 'client_query',
            allowNull: true
        },
        actionType: {
            type: DataTypes.TEXT,
            field: 'action_type',
            allowNull: false
        },
        rowData: {
            type: DataTypes.HSTORE,
            field: 'row_data',
            allowNull: true
        },
        changedFields: {
            type: DataTypes.HSTORE,
            field: 'changed_fields',
            allowNull: true
        },
        statementOnly: {
            type: DataTypes.BOOLEAN,
            field: 'statement_only',
            allowNull: false
        }
    }, {
        schema: 'audit',
        tableName: 'logged_actions',
        timestamps: false
    });
};

module.exports.initRelations = function() {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    var model = require('../index');
    var LoggedAction = model.LoggedAction;

};
