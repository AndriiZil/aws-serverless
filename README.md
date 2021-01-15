### Install Serverless framework globally
```
    npm install -g serverless
```

### Configure AWS CLI
```
    aws configure
```
### Enter credentials
```
    AWS Access Key ID [****************OPN7]: *****
    AWS Secret Access Key [****************Vd0E]: *****
    Default region name [eu-central-1]: eu-central-1
    Default output format [json]: yaml
```
### Create project from starter template
```
    sls create --name YOUR_PROJECT_NAME --template-url https://github.com/codingly-io/sls-base
    cd YOUR_PROJECT_NAME
```
### Application deploy
```
    serverless deploy
    sls deploy
```
### To destroy resource
```
    serverless remove -v
    sls remove -v
```