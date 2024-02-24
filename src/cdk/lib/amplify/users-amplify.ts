import { 
  App, 
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { aws_amplify as amplify } from 'aws-cdk-lib';
import {
  CfnApp,
  CfnBranch,
} from 'aws-cdk-lib/aws-amplify';
import { UsersAmplifyProps } from './users-amplify-interface';

export class UsersAmplify extends Construct {
  constructor(scope: Construct, id: string, props: UsersAmplifyProps) {
    super(scope, id);

    // Create Amplify App
    const amplifyApp = new CfnApp(this, 'UMapUsersApp', {
      name: 'UMapUsersApp',
      repository: props.amplifyUsersRepositoryUrl ?? '',
      oauthToken: props.amplifyOauthToken,
      environmentVariables: [
        {
          name: 'API_ENDPOINT',
          value: props.apiEndpoint,
        },
        {
          name: 'GOOGLE_MAP_API_KEY',
          value: props.googleMapApiKey,
        },
      ],
    });

    new CfnBranch(this, 'UMapUsersAppBranch', {
      appId: amplifyApp.attrAppId,
      branchName: props.amplifyBranch,
      enableAutoBuild: true,
    });
  }
}
