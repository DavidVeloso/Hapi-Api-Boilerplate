'use strict'

const Boom = require('@hapi/boom')
const fs = require('fs-extra')
const path = require('path')

const uuidv1 = require('uuid/v1')

const config = require('../config/fileUpload')

module.exports = {
  store, remove, resolveFileFolder
}

function store (payload, options) {
  return new Promise((resolve, reject) => {
    if (!payload.file) {
      return reject(Boom.badData('Ops! it\'s missing the file...'))
    }

    const file = payload.file
    const originalFileName = file.hapi.filename
    const contentType = file.hapi.headers['content-type']
    const { acceptedMimeTypes, uploadDir } = config

    if (!acceptedMimeTypes.includes(contentType)) {
      return reject(Boom.badData(`'${contentType}' content-type it's not allowed.`))
    }

    const fileExtName = path.extname(originalFileName)

    const fileName = uuidv1() // Generates a random name to avoid duplicate files name
    const fileFolder = resolveFileFolder(options, fileName)
    const filePath = `${fileFolder}${fileName}${fileExtName}`
    const fileFullPath = `${uploadDir}/${filePath}`
    const fileType = (contentType.split('/')[0] === 'image') ? 'image' : 'document'

    // Ensures that the directory exists. If the directory structure does not exist, it is created.
    fs.ensureDirSync(`${uploadDir}/${fileFolder}`)

    const stream = fs.createWriteStream(fileFullPath)

    stream.on('error', function (err) {
      return reject(err)
    })

    file.pipe(stream)

    file.on('end', function (err) {
      if (err) {
        return reject(err)
      }

      const fileData = {
        contentType,
        filePath,
        fileFolder,
        fileName,
        fileExtName,
        fileType,
        originalFileName
      }

      if (process.env.NODE_ENV === 'test') {
        return resolve(fileData)
      }

      resolve(fileData)
    })
  })
}

function remove (options) {
  const path = (options.fileType === 'document')
    ? `${config.uploadDir}${options.filePath}`
    : `${config.uploadDir}${options.fileFolder}`
  fs.removeSync(path)
}

function resolveFileFolder (options, fileName) {
  const { id, folderName } = options
  const tempFolder = '/temp/'

  const folders = {
    userAvatar: `/users/${id}/avatar/`
    // 'someDocument': `/modelName/${id}/files/`,
    // 'someImage': `/modelName/${id}/images/`,
  }

  return folders[folderName] || tempFolder
}
