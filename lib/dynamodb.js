"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeDynamoDb = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cloudwatch = __importStar(require("aws-cdk-lib/aws-cloudwatch"));
class BridgeDynamoDb extends aws_cdk_lib_1.aws_dynamodb.Table {
    constructor(scope, id, props) {
        super(scope, id, Object.assign({ pointInTimeRecovery: true }, props));
        this.addCloudwatchConsumedReadCapacityUnitsAlarm(props);
    }
    addCloudwatchConsumedReadCapacityUnitsAlarm(props) {
        const metric = this.metricConsumedReadCapacityUnits();
        new cloudwatch.Alarm(this, `${props.tableName}-ReadCapacityUnitsAlarm`, {
            alarmName: `${props.tableName}-ReadCapacityUnitsAlarm`,
            metric: metric,
            threshold: 10,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 10 read capacity',
            actionsEnabled: true,
        });
    }
    addCloudwatchConsumedWriteCapacityUnitsAlarm(props) {
        const metric = this.metricConsumedWriteCapacityUnits();
        new cloudwatch.Alarm(this, `${props.tableName}-WriteCapacityUnitsAlarm`, {
            alarmName: `${props.tableName}-WriteCapacityUnitsAlarm`,
            metric: metric,
            threshold: 10,
            evaluationPeriods: 1,
            comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
            alarmDescription: 'Alarm when age of oldest message exceeds the threshold of 10 write capacity',
            actionsEnabled: true,
        });
    }
}
exports.BridgeDynamoDb = BridgeDynamoDb;
