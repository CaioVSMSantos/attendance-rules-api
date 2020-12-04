import fs from 'fs'

function saveJSONFile (data, path, fileName) {
    try {
        const buffer = JSON.stringify(data)
        const filePath = path + fileName.split('.')[0] + '.json'
        if (fs.existsSync(path)) {
            fs.writeFileSync(filePath, buffer)
        } else {
            fs.mkdirSync(path, {recursive: true})
            fs.writeFileSync(filePath, buffer)
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

function readJSONFile (path, fileName) {
    try {
        const filePath = path + fileName.split('.')[0] + '.json'
        let file = undefined
        if (fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath)
            file = JSON.parse(buffer)
        }
        return file
    } catch (error) {
        console.log(error)
        return undefined
    }
}

const fileUtils = {
    saveJSONFile,
    readJSONFile
}

export default fileUtils