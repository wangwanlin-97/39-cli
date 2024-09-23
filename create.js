const path = require("path")
const fs = require("fs-extra")
const Inquirer = require("inquirer")
const chalk = require("chalk")
const {loading} = require("./utils")
const Creator = require("./Creator")

module.exports = async function (projectName, options) {
  // get current working directory
  const cwd = process.cwd()
  const targetDirectory = path.join(cwd, projectName)

  // check if target directory exists

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      await fs.remove(targetDirectory)
    } else {
      let {isOverwrite} = await Inquirer.createPromptModule()([
        {
          name: "isOverwrite",
          type: "list",
          message: "Target directory already exists, do you want to overwrite?",
          choices: [
            {
              name: "yes",
              value: true,
            },
            {
              name: "no",
              value: false,
            },
          ],
          default: false,
        },
      ])

      if (!isOverwrite) {
        console.log(chalk.yellow("Aborting installation."))
        return
      } else {
        await loading(
          "Removing target directory...",
          fs.remove,
          targetDirectory,
        )
      }
    }
  }

  const creator = new Creator(projectName, targetDirectory)
  creator.create()
}
