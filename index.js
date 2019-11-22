"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _fsPath = require("fs-path");

var _fsPath2 = _interopRequireDefault(_fsPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getChunks = function getChunks(chunks, publicPath) {
    var mapper = function mapper(arr, ext) {
        return arr.map(function (chunk) {
            return {
                name: chunk.name,
                files: chunk.files.filter(function (file) {
                    return _path2.default.extname(file) === ext;
                }).map(function (file) {
                    return publicPath + file;
                })
            };
        }).filter(function (item) {
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

var sortIt = function sortIt(chunksSortMode, type, assets) {
    if (typeof chunksSortMode === "function") {
        assets[type].sort(chunksSortMode);
    } else if (chunksSortMode[type]) {
        assets[type].sort(chunksSortMode[type]);
    }
};

var SingleSpaAssetWebpackPlugin = function () {
    function SingleSpaAssetWebpackPlugin(config) {
        _classCallCheck(this, SingleSpaAssetWebpackPlugin);

        this.defaultConfig = {
            output: "single.spa.json",
            config: {},
            beforeWrite: function beforeWrite(config, assetObj) {},
            afterWrite: function afterWrite(config, path) {},
            isOverride: false
        };
        this.config = _lodash2.default.extend(this.defaultConfig, config);
    }

    _createClass(SingleSpaAssetWebpackPlugin, [{
        key: "apply",
        value: function apply(compiler) {
            var _this = this;

            compiler.plugin("done", function (_ref) {
                var compilation = _ref.compilation;

                var outPath = _path2.default.join(compilation.outputOptions.path || "", _this.config.output);
                var assetObj = getChunks(compilation.chunks, compilation.outputOptions.publicPath || "");
                var content = _this.config.config;
                if (_this.config.isOverride) {
                    // wirte override
                    content = _this.config.beforeWrite(content, assetObj);
                } else {
                    // wirte not override
                    _this.config.beforeWrite(content, assetObj);
                }
                _fsPath2.default.writeFileSync(outPath, JSON.stringify(content));
                _this.config.afterWrite(content, outPath);
            });
        }
    }]);

    return SingleSpaAssetWebpackPlugin;
}();

exports.default = SingleSpaAssetWebpackPlugin;
module.exports = exports["default"];
