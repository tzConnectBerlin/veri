import { RequestWithFiles } from '@/interfaces/veris.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

import {
  createRoundedCorners,
  createThumbnailImage,
} from '@/utils/imageTransform';

const imageMiddleware = async (
  req: RequestWithFiles,
  res: Response,
  next: NextFunction
) => {
  try {
    const roundedImage = await createRoundedCorners(req.file);
    const thumbnail = await createThumbnailImage(req.file);
    // fix this ugly section
    req.file.buffer = roundedImage;
    req.thumbnail = JSON.parse(JSON.stringify(req.file));
    req.thumbnail.buffer = thumbnail;

    const fullFilename = uuidv4();
    req.file.destination = 'uploads/';
    req.file.path = req.file.destination + fullFilename;

    const thumbFilename = uuidv4();
    req.thumbnail.fieldname = 'thumb_' + uuidv4();
    req.thumbnail.destination = 'uploads/';
    req.thumbnail.path = req.thumbnail.destination + thumbFilename;

    fs.writeFileSync(req.file.path, req.file.buffer);
    fs.writeFileSync(req.thumbnail.path, req.thumbnail.buffer);

    delete req.file.buffer;
    delete req.thumbnail.buffer;

    req.files = JSON.parse(JSON.stringify([req.file, req.thumbnail]));

    next();
  } catch (error) {
    next(new HttpException(500, 'Cannot process file, please try again.'));
  }
};

export default imageMiddleware;
