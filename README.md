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
new SingleSpaAssetWebpackPlugin(
	{
                        output:"config.json",
                        config: {
                            "main": ""
                        },
                        beforeWrite: (config,assetObj)=>{
                            // asseet obj asset files
                            return config
                        },
						afterWrite: (config,path)=>{

						}
    }
)
```

### Configuration

You can custom child module config params, e.g

**Configuration Params**

| Param      | Desc    |  default  |
| --------   | :-----   | :----: |
| output             | single spa  config path           |   single.spa.json    |
| config             | single spa config obj (content)   |   config   |
| beforeWrite        | function must be return config    |   empty function    |
| isOverride         |  if true else override config     |   true    |
| afterWrite         | config write after                |   empty function    |

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