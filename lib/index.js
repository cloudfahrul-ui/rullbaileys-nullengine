//=======================================================//

import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

function showOpeningConsole() {
  console.log(chalk.gray("════════════════════════════════════════════════════"));

  const bigText = figlet.textSync("OPENED", {
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default"
  });

  console.log(gradient(["#ff0000", "#00aaff", "#ff00ff"]).multiline(bigText));
  console.log(gradient.rainbow("               WELCOME TO RUL ENGINE"));
  console.log(chalk.whiteBright("• Rull Baileys-Engine"));
  console.log(chalk.cyan("• Whatsapp: ") + chalk.greenBright("https://wa.me/62881010500524"));
  console.log(chalk.gray("════════════════════════════════════════════════════"));
  console.log("");
}

showOpeningConsole();

import makeWASocket from "./Socket/index.js";
//=======================================================//
export * from "./Defaults/index.js";
export * from "./WABinary/index.js";
export * from "../WAProto/index.js";
export * from "./WAUSync/index.js";
export * from "./Store/index.js";
export * from "./Utils/index.js";
export * from "./Types/index.js";
export * from "./WAM/index.js";
//=======================================================//
export { makeWASocket };
export default makeWASocket;
//=======================================================//
