import { spawn } from 'child_process'
import pkg from 'gulp'
import { distPath } from '../utils/path.js'
console.log('path', distPath);
const { series } = pkg

const run = (command) => {
  //cmd表示命令，args表示参数，例如 rd /s /q 中rd是指令， /s /q 是参数
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

const buildComponent = async () => {
  await run(`cd ${distPath}`)
  run('npm run build')
}
export default series(
  () => run(`rd /s /q ${distPath}\\dist`),
  () => buildComponent()
)