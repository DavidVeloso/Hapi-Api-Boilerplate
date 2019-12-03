'use strict'

const path = require('path')

module.exports = {
  maxFileSize: 20000000, // 20MB
  uploadDir: path.join(__dirname, '../../../uploads'), // save on root by default
  imageResizeSizes: [ // used to resize general images
    {
      name: '150x150',
      width: 150,
      heigth: 150
    },
    {
      name: '570x370',
      width: 570,
      heigth: 370
    }
  ],
  avatarResizeSizes: [ // used only to resize users avatars
    {
      name: '150x150',
      width: 150,
      heigth: 150
    },
    {
      name: '240x260',
      width: 240,
      heigth: 260
    }
  ],
  acceptedMimeTypes: [
    // Images
    'image/x-png', 'image/png', 'image/gif', 'image/jpeg',
    // Documents
    'application/pdf', 'text/plain', 'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/excel', 'application/vnd.ms-excel', 'application/msexcel',
    'application/powerpoint', 'application/vnd.ms-powerpoint', 'application/octet-stream',
    'text/x-comma-separated-values', 'text/comma-separated-values',
    'application/vnd.oasis.opendocument.text', 'text/csv',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
}
