/**
 * @name DiscordNitroScreenShare
 * @author NinjaRacc
 * @version 1.0.0
 * @authorLink https://github.com/mrbigboob
 * @description Unlock 1080p 60fps screen share
 * @source https://github.com/MrBigBoob/DiscordNitroScreenShare
 * @updateUrl https://github.com/MrBigBoob/DiscordNitroScreenShare/blob/main/DNSS.plugin.js
 */
module.exports = (() => {
    const config = {
        info: {
            name: "DiscordNitroScreenShare",
            authors: [{
                name: "NinjaRacc",
                github_username: "mrbigboob"
            }],
            version: "0.0.1",
            description: "Unlock 1080p 60fps screen share",
        },
        changelog: [{
            title: "Update",
            items: ["First release!"]
        }],
        defaultConfig: [],
        main: "index.js"
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }
        getName() {
            return config.info.name;
        }
        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }
        getDescription() {
            return config.info.description;
        }
        getVersion() {
            return config.info.version;
        }
        load() {
            BdApi.showConfirmationModal("Plugin request BD Plugin Library", `Download ?`, {
                confirmText: "Confirm",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            return class ReadIFGay extends Plugin {
                getModule(filter) {
                    const name = typeof filter === 'string' ? filter : null;
                    const modules = Object.values(webpackJsonp.push([
                        [], {
                            ['']: (_, e, r) => {
                                e.cache = r.c
                            }
                        },
                        [
                            ['']
                        ]
                    ]).cache);
                    for (const mdl of modules) {
                        const m = mdl.exports;
                        if (m && m.__esModule && m.default && (name ? m.default[name] : filter(m.default))) return m.default;
                        if (m && (name ? m[name] : filter(m))) return m;
                    }
                    return null;
                }

                onStart() {
                    this._backup = this.getModule('getCurrentUser').getCurrentUser().premiumType;
                    this.getModule('getCurrentUser').getCurrentUser().premiumType = 2;
                }

                onStop() {
                    this.getModule('getCurrentUser').getCurrentUser().premiumType = this._backup;
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
