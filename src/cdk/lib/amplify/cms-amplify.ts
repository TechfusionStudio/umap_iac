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
import { CmsAmplifyProps } from './cms-amplify-interface';

export class CmsAmplify extends Construct {
  constructor(scope: Construct, id: string, props: CmsAmplifyProps) {
    super(scope, id);

    // Create Amplify App
    const amplifyApp = new CfnApp(this, 'UMapCmsApp', {
      name: 'UMapCmsApp',
      repository: props.amplifyRepositoryUrl ?? '',
      oauthToken: props.amplifyOauthToken,
      environmentVariables: [
        {
          name: 'USER_POOL_ID',
          value: props.userPoolId,
        },
        {
          name: 'CLIENT_ID',
          value: props.clientId,
        },
        {
          name: 'API_ENDPOINT',
          value: props.apiEndpoint,
        },
        {
          name: 'USER_SITE_URL',
          value: props.userSiteUrl,
        },
        {
          name: 'CHAT_GPT_API_KEY',
          value: props.chatGptApiKey,
        }
      ],
    });

    new CfnBranch(this, 'UMapCmsAppBranch', {
      appId: amplifyApp.attrAppId,
      branchName: props.amplifyBranch,
      enableAutoBuild: true,
    });
  }
}
