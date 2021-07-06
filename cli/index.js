const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { preprocess } = require("./preprocess");
const { postprocess } = require("./postprocess");
const { core } = require("@please.dev/lib");

const { cargv, argv } = preprocess(hideBin(process.argv));

const main = {
  command: "$0 <command>",
  describe: "command to run",
  builder: {
    update: {
      describe: "Enable repo updates",
      type: "boolean",
      alias: "u",
    },
    log: {
      describe: "Log level verbosity",
      type: "number",
      alias: "l",
    },
    silent: {
      describe: "Mute all messages",
      type: "boolean",
      alias: "S",
    },
    verbose: {
      describe: "Log all messages",
      type: "boolean",
      alias: "V",
    },
    "silent-run": {
      describe: "Run command silently",
      type: "boolean",
      alias: "s",
    },
    "silent-install": {
      describe: "Silence install logs",
      type: "boolean",
      alias: "I",
    },
    "allow-unsafe": {
      describe: "Allow unsafe installs",
      type: "boolean",
      alias: "a",
    },
  },
  handler(args) {
    const argv = postprocess(args);
    core({ argv, cargv });
  },
};

module.exports.cli = () =>
  yargs(argv).command(main).help().completion(/* TODO */).argv;
