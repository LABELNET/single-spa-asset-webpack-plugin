## Usage

### Npm Install
```
npm install single-spa-asset-webpack-plugin --save-dev
```

### Require into webpack config
```
const SingleSpaAssetWebpackPlugin = require("single-spa-asset-webpack-plugin");
```

### Use Plugin
```
new SingleSpaAssetWebpackPlugin( {config: } )
```

### Configuration

You can custom child module config params, e.g

**Configuration Params**

| Param      | Desc    |    |
| --------   | :-----   | :----: |
| output             | single spa  config path           |       |
| config             | single spa config obj (content)   |      |
| beforeWrite        | function must be return config    |       |
| isOverride         |  if true else override config     |       |
| afterWrite         | config write after                |       |

## Sample Input

```
{
    "main": ""
}
```

## Sample Output

```
{
    "main": "app.a4a96aebc315cd042a48.bundle.js"
}
```