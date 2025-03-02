import { config } from "../../config";
import chalk from "chalk";

const logError = (nameFunction: string, error: any, message?: string) => {
  console.error(
    ` ${chalk.hex("#ffffff")(`${nameFunction}:`)} ${chalk.hex("#af2c0e")(
      `[ERROR] ${chalk.hex("#ffffff")(`${message || ""}`)}
    `
    )}`,
    error
  );
};

const connect = (nameFunction: string) => {
  process.stdout.write(
    ` ${chalk.hex("#ffffff")(`${nameFunction}:`)} ${chalk.hex("#40ac57")(
      `[CONNECTED]`
    )}\n`
  );
};

const logSuccess = (method: string, url: string) => {
  console.log(
    ` ${chalk.hex("#ffffff")(`HTTP::${method} ${url}`)} ${chalk.hex("#40ac57")(
      `[SUCCESS]`
    )}`
  );
};

const initApp = () => {
  process.stdout.write(
    chalk.hex(
      "#16C47F"
    )(`                                                                     
██████╗ ██████╗  ██████╗ ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
██████╔╝██████╔╝██║   ██║█████╗  █████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
██║     ██║  ██║╚██████╔╝██║     ███████╗███████║███████║██║╚██████╔╝██║ ╚████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                                               
      `)
  );
  process.stdout.write(
    chalk.hex("#ffffff")(
      `                         ${config.PROJECT_NAME} ${config.VERSION}: `
    )
  );
  process.stdout.write(chalk.hex("#c0eb34")(`ONLINE`));
  process.stdout.write(
    chalk.hex("#ffffff")(` on port ${config.PORT}


 `)
  );
  process.stdout.write(chalk.hex("#ffffff")(`-----------LOGS-----------\n`));
};

export { logError, initApp, connect, logSuccess };
