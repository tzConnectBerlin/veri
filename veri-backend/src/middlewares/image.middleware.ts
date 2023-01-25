import { CustomRequest } from '@/interfaces/request.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

import { createRoundedCorners, createThumbnailImage } from '@/utils/image';
import path from 'path';
import { DATA_PATH } from '@config';

const imageMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // fix this ugly section
    if (req.file) {
      const roundedImage = await createRoundedCorners(req.file);
      const thumbnail = await createThumbnailImage(req.file);

      req.file.buffer = roundedImage;
      req.thumbnail = JSON.parse(JSON.stringify(req.file));
      req.thumbnail.buffer = thumbnail;

      const fullFilename = uuidv4();
      req.file.filename = 'original_' + uuidv4();
      req.file.destination = DATA_PATH;
      req.file.path = fullFilename + path.extname(req.file.originalname);

      const thumbFilename = uuidv4();
      req.thumbnail.filename = 'thumb_' + uuidv4();
      req.thumbnail.destination = DATA_PATH;
      req.thumbnail.path = thumbFilename + path.extname(req.file.originalname);

      fs.writeFileSync(req.file.destination + req.file.path, req.file.buffer);
      fs.writeFileSync(
        req.thumbnail.destination + req.thumbnail.path,
        req.thumbnail.buffer
      );

      req.files = JSON.parse(JSON.stringify(req.file));
      req.thumbnail = JSON.parse(JSON.stringify(req.thumbnail));
    } else {
      delete req.body.artwork_file;
    }
    next();
  } catch (error) {
    next(new HttpException(500, 'Cannot process file, please try again.'));
  }
};

export default imageMiddleware;
