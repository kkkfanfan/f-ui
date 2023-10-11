import path from 'path'
import { fileURLToPath } from 'url'
const filename = fileURLToPath(import.meta.url)
// 这里不能声明__filename,因为已经有内部的__filename了，重复声明会报错
const _dirname = path.dirname(filename)
export const distPath = path.resolve(_dirname, '../../../')