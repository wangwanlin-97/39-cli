const program = require("commander")
const figlet = require("figlet")

console.log(
  "\r\n" +
    figlet.textSync(" 39  CLI ", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 1000,
      whitespaceBreak: true,
      colors: ["blue", "red", "yellow"],
    }),
)

program.name("my-cli").usage("<command> [options]").version("1.0.0")

program
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it already exists")
  .action(async (projectName, cmd) => {
    require("./create")(projectName, cmd)
  })

program.parse(process.argv)
