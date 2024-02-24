import {
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs'; 
import { EnvProps } from './environment-interface';
import { CmsAmplify } from './amplify/cms-amplify';
import { UsersAmplify } from './amplify/users-amplify';
import { CmsAmplifyProps } from './amplify/cms-amplify-interface';
import { UsersAmplifyProps } from './amplify/users-amplify-interface';
import { CmsCognito } from './cognito/cms-cognito';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const env = props?.env as EnvProps;

    // The code that defines your stack goes here
    const amplify_env: CmsAmplifyProps = {
      amplifyRepositoryUrl: env.amplifyRepositoryUrl,
      amplifyOauthToken: env.amplifyOauthToken,
      amplifyBranch: env.amplifyBranch,
      userPoolId: env.userPoolId,
      clientId: env.clientId,
      apiEndpoint: env.apiEndpoint,
      userSiteUrl: env.userSiteUrl,
      chatGptApiKey: env.chatGptApiKey,
    };
    new CmsAmplify(
      this, 
      'CmsAmplifyStack', 
      amplify_env,
    );

    const users_amplify_env: UsersAmplifyProps = {
      amplifyUsersRepositoryUrl: env.amplifyUsersRepositoryUrl,
      amplifyOauthToken: env.amplifyOauthToken,
      amplifyBranch: env.amplifyBranch,
      apiEndpoint: env.apiEndpoint,
      googleMapApiKey: env.googleMapApiKey,
    };
    new UsersAmplify(
      this, 
      'UsersAmplifyStack', 
      users_amplify_env,
    );

    new CmsCognito(
      this,
      'CmsCognitoStack',
    );
  }
}
