const ora = require("ora")
const axios = require("axios")
const {execSync} = require("child_process")

async function loading(message, fn, ...args) {
  const spinner = ora(message).start()
  try {
    const res = await Promise.resolve(fn(...args))
    spinner.succeed(message)
    return res
  } catch (error) {
    spinner.fail("error")
    throw error
  }
}

async function getTemplates() {
  try {
    const res = await loading(
      "Fetching templates ...",
      axios.get,
      encodeURI(
        "https://api.github.com/search/repositories?q=user:wangwanlin-97+is:template",
      ),
    )
    const templates = (res.data.items || [])
      .filter(item => item.is_template)
      .map(item => {
        return {
          name: item.name,
          description: item.description,
          url: item.html_url,
        }
      })
    return templates
  } catch (error) {
    console.log(error)
  }
}

async function cloneTemplate(templateUrl, projectName) {
  await loading(
    `Cloning ${projectName} ...`,
    execSync,
    `git clone ${templateUrl} ${projectName} --quiet`,
  )
}
module.exports = {loading, getTemplates, cloneTemplate}
