const fs = require("fs-extra")
const {getTemplates, cloneTemplate} = require("./utils")
const Inquirer = require("inquirer")
const chalk = require("chalk")
class Creator {
  constructor(projectName, targetDirectory) {
    this.name = projectName
    this.target = targetDirectory
  }

  async create() {
    console.log(chalk.greenBright(`Creating ${this.name}`))

    const templates = await getTemplates()

    let {template} = await Inquirer.createPromptModule()([
      {
        name: "template",
        type: "list",
        message: "Select the template you prefer to use",
        choices: templates.map(item => {
          return {
            name: item.name,
            value: item.url,
          }
        }),
      },
    ])

    cloneTemplate(template, this.name)
  }
}

module.exports = Creator
