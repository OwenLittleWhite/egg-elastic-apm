# 本包是为了 egg 项目接入 apm 的工具包

## 安装

```
npm install
```

## 配置

要在项目的根目录下创建配置文件 `config/apmConfig.json`

```JSON
{
    "serviceName": "my-application",
    "secretToken": "",
    "serverUrl": "http://127.0.0.1:8200"
}

```

## 使用

在 `package.json` 文件中修改 `scripts` 中的 `start` 脚本

```JSON
{
    "scripts": {
        "start": "egg-scripts start --require=egg-elastic-apm"
    }
}

```
