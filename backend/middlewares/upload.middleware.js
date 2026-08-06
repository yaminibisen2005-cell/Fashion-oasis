import multer from 'multer';
import AppError from '../utils/AppError.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const allowedExtensions = /\.(jpg|jpeg|png)$/i;

  const isMimeValid = allowedMimeTypes.includes(file.mimetype);
  const isExtValid = allowedExtensions.test(file.originalname);

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(new AppError('Only image files (jpg, jpeg, png) are allowed!', 400), false);
  }
};

const uploadMulter = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadAvatarMiddleware = (req, res, next) => {
  uploadMulter.single('avatar')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new AppError('File size cannot exceed 5MB', 400));
        }
        return next(new AppError(err.message, 400));
      }
      return next(err);
    }
    next();
  });
};
