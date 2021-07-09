const { renameSync, rmSync, readdirSync } = require("fs");
const { execSync } = require("child_process");
const { version } = require("../package.json");

readdirSync("./dist").forEach((file) => {
  const oldName = `./dist/${file}`;
  const newName = "./dist/" + "please-" + version + file.slice(3);
  renameSync(oldName, newName);
  if (!file.endsWith(".exe")) {
    execSync(`gzexe ${newName}`, { stdio: "ignore" });
    rmSync(newName + "~");
  }
});
