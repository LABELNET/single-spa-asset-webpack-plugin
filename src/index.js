import fs from "fs";
import path from "path";
import _ from "lodash";
import fsPath from "fs-path";

let getChunks = (chunks, publicPath) => {
    let mapper = (arr, ext) => {
        return arr
            .map((chunk) => {
                return {
                    name: chunk.name,
                    files: chunk.files
                        .filter((file) => {
                            return path.extname(file) === ext;
                        })
                        .map((file) => {
                            return publicPath + file;
                        })
                };
            })
            .filter((item) => {
                return item.files.length;
            });
    };
    return {
        assets: {
            js: mapper(chunks, ".js"),
            map: mapper(chunks, ".map"),
            css: mapper(chunks, ".css")
        }
    };
};

let sortIt = (chunksSortMode, type, assets) => {
    if (typeof chunksSortMode === "function") {
        assets[type].sort(chunksSortMode);
    } else if (chunksSortMode[type]) {
        assets[type].sort(chunksSortMode[type]);
    }
};

export default class SingleSpaAssetWebpackPlugin {
    constructor(config) {
        this.defaultConfig = {
            output: "single.spa.json",
            config: {},
            beforeWrite: (config, assetObj) => {},
            afterWrite: (config, path) => {},
            isOverride: false
        };
        this.config = _.extend(this.defaultConfig, config);
    }

    apply(compiler) {
        compiler.plugin("done", ({ compilation }) => {
            let outPath = path.join(
                compilation.outputOptions.path || "",
                this.config.output
            );
            let assetObj = getChunks(
                compilation.chunks,
                compilation.outputOptions.publicPath || ""
            );
            var content = this.config.config;
            if (this.config.isOverride) {
                // wirte override
                content = this.config.beforeWrite(content, assetObj);
            } else {
                // wirte not override
                this.config.beforeWrite(content, assetObj);
            }
            fsPath.writeFileSync(outPath, JSON.stringify(content));
            this.config.afterWrite(content, outPath);
        });
    }
}
