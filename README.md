# CDK Custom AWS Resource Constructor

## Overview

This npm package provides a custom AWS Cloud Development Kit (CDK) resource constructor designed for creating AWS resources with an emphasis on compliance with SOC 2 (System and Organization Controls 2) standards. Some of the requirements by SOC2 are cloudwatch error alarm for lambda function, cloudwatch read and write capacity unit alarm and point in time recovery for dynamodb table, latency response time for aplication load balancer, etc

## Features

Enables developers to easily integrate SOC 2 compliant resources into their AWS infrastructure.

## Installation

You can install this package via npm:

```bash
npm i bridge-aws-resources
```

If you run into peer dependency error (the `aws-cdk-lib` version might differe between your project and this package), you can install with `--force` flag

```bash
npm i bridge-aws-resources --force
```

## Usage

To use this package in your CDK project, import the custom resource constructor and utilize it to create your AWS resources. Here's a basic example of how to use it:

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { BridgeLambda } from 'bridge-aws-resources/lib';

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creating a SOC 2 compliant AWS resource

    const myLambda = new BridgeLambda(this, 'MyLambdaHandler', {
        functionName: "my-lambda-hanlder",
        runtime: lambda.Runtime.PROVIDED_AL2,
        code: lambda.Code.fromAsset("pkg/lambda/bin"),
        handler: "bootstrap",
        memorySize: 2000,
        timeout: cdk.Duration.seconds(30),
        retryAttempts: 1,
      // Specify other resource configuration here
    });


    // sepecify any alarm actions

    mylambda.lambdaErrorAlarm.addAlarmAction();
  }
}

```

## Requirements
- Node.js
- AWS CDK


## Contributing

Contributions to this package are welcome. If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/kajiarbind/bridge-aws-resources).

## License

This project is licensed under the Internet Systems Consortium (ISC) License.


## Disclaimer
This package is provided as-is without any warranties or guarantees. Use at your own risk.

Note: Ensure proper permissions and security measures are in place when deploying resources in production environments.
