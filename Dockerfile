FROM node:18.17.1

WORKDIR /usr/src
COPY ./src /usr/src

# General packages
RUN apt-get update

RUN npm install -g aws-cdk
RUN npm install @aws-cdk/core
RUN npm install @aws-cdk/aws-cognito
RUN npm install @aws-cdk/aws-rds
RUN npm install @aws-cdk/aws-dynamodb
# RUN npm install  @aws-cdk/aws-lambda
RUN npm install @aws-cdk/aws-amplify

# aws cli v2 install
# https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2-linux.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

# RUN cd ~/
# RUN mkdir .aws
COPY ./.aws ~/

# COPY package.json ./

# RUN npm install

# CMD ["npm", "start"]
