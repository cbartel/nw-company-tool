const { buildSync } = require("esbuild");
const { dependencies } = require("./server/package.json");
const exec = require("util").promisify(require("child_process").exec);
const fs = require("fs-extra");

const entryPoints = ["server/src/main.ts", "server/src/server.ts"];
const assets = ["LICENSE", "README.md"];

const config = {
  entryPoints,
  outdir: "dist/dist",
  bundle: true,
  platform: "node",
  target: "node12",
  minify: true,
  sourcemap: true,
  external: Object.keys(dependencies),
};

const packageJson = {
  name: "nw-company-tool",
  version: "0.0.0",
  dependencies,
};

async function run(command) {
  const { stdout, stderr } = await exec(command);
  console.log(stdout);
  console.error(stderr);
}

async function build() {
  fs.removeSync("./dist");
  fs.removeSync("./webapp/dist");
  fs.removeSync("./server/dist");

  await run("npm --prefix webapp install");
  await run("npm --prefix webapp run ng build ");

  buildSync(config);

  fs.copySync("./webapp/dist/app", "./dist/dist/app");
  fs.outputJsonSync("./dist/package.json", packageJson, { spaces: 2 });
  assets.forEach((asset) => fs.copySync(`./${asset}`, `./dist/${asset}`));
}

build().then(() => console.log("build complete."));
