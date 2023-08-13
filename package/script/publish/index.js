import { spawn } from 'child_process'
import pkg from 'gulp'
import { distPath } from '../utils/path.js'
const { series } = pkg

const run = (command) => {
  const [cmd, ...args] = command.split(' ')
  return new Promise((resolve) => {
    const app = spawn(cmd, args, {
      cwd: distPath,
      stdio: 'inherit',
      shell: true
    })
    app.on('close', resolve)
  })
}
/*
为了方便用户更改版本号，npm有npm version这个命令来自动更改版本号，同时帮忙commit。
*/
const publish = async () => {
  await run('git add .')
  await run('git commit -m "publish to npm" ')
  await run('npm version patch')
  await run('npm publish')
}

export default series(
  () => publish()
)