```
export AMPLIFY_OAUTH_TOKEN="TMP_TOKEN"
export API_ENDPOINT="API_ENDPOINT"
jq --arg AMPLIFY_OAUTH_TOKEN "$AMPLIFY_OAUTH_TOKEN" '.context.prod.env.amplifyOauthToken = $AMPLIFY_OAUTH_TOKEN' .cdk.json > cdk.json
mv cdk.json tmp.json
jq --arg API_ENDPOINT "$API_ENDPOINT" '.context.prod.env.apiEndpoint = $API_ENDPOINT' tmp.json > cdk.json
```