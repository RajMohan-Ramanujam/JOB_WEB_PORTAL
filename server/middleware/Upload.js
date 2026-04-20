const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png']
  const ext = path.extname(file.originalname).toLowerCase()

  if (!allowedTypes.includes(ext)) {
    return cb(new Error('Invalid file type'), false)
  }

  cb(null, true)
}

const upload = multer({
  storage,
  fileFilter
})

module.exports = upload