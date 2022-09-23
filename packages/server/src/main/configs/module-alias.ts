import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@/server', resolve(process.env.APP_ENV !== 'test' ? 'dist/src' : 'src'))
