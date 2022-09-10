import execa from 'execa'
import fs from 'fs-extra'
import archiver from 'archiver'

;(async () => {
    console.log('正在构建腾讯云函数资源中，请耐心等待~')
    console.time('共用时')
    await fs.remove('build-tc')
    await execa('babel', ['config', '-d', 'build-tc/config'])
    await execa('babel', ['src', '-d', 'build-tc/src'])
    await execa('babel', ['main.js', '-o', 'build-tc/main.js'])
    await execa('babel', ['main-for-test.js', '-o', 'build-tc/main-for-test.js'])
    await fs.copy('package.json', 'build-tc/package.json')
    await fs.writeFile('build-tc/package.json', (await fs.readFile('build-tc/package.json')).toString().replace(/"type": "module"/, '"type": "commonjs"'))
    await execa('npm', ['i', '--no-save'])
    await fs.copy('node_modules', 'build-tc/node_modules')
    await fs.writeFile('build-tc/index.js', `
const execa = require('execa')

exports.main_handler = async function () {
    await execa('npm', ['run', 'dev'])
}
    `.trim())
    const output = fs.createWriteStream('./build-tc.zip')
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    })
    archive.pipe(output)
    archive.directory('build-tc/', false)
    await archive.finalize()
    // await fs.remove('build-tc')
    console.log('构建完成，请将生成的build-tc.zip上传到腾讯云~')
    console.timeEnd('共用时')
})()
