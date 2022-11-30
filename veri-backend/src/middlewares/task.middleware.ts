import multer from 'multer';
import { RequestWithFile } from '@/interfaces/veris.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import UUID from 'uuid-int';
import { getRandomInt } from '@/utils/util';
import { createTokenDetails, createImageAsset } from '@/utils/token';
import fetch from 'node-fetch';

const fileMiddleware = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
  if (req.body.status == 'created') {
    const request_id = UUID(getRandomInt(0, 511));
    const body = {
      token_details: createTokenDetails(req.body),
      image_asset: createImageAsset(req.file),
      recipients: req.body.recipients,
    };
    // const result = await fetch(`http://localhost:5005/${request_id}`, {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    next();
  } else if (req.body.status == 'minting') {
    //send create task to peppermintery
    //send mint to pppermint
    next();
  } else {
    next(new HttpException(400, 'Not correct status'));
  }
};

export default fileMiddleware;
