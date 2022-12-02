import multer from 'multer';
import { RequestWithFile } from '@/interfaces/veris.interface';
import { Response, NextFunction } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import UUID from 'uuid-int';
import { getRandomInt } from '@/utils/util';
import {
  createTokenDetails,
  createImageAsset,
  createRecipientList,
} from '@/utils/token';
import axios from 'axios';

const fileMiddleware = async (
  req: RequestWithFile,
  res: Response,
  next: NextFunction
) => {
  if (req.body.status == 'created') {
    const generator = UUID(getRandomInt(0, 511));
    const token_id = generator.uuid();
    try {
      const response = await axios.put(
        `http://localhost:5005/tokens/1669597219`,
        {
          token_details: createTokenDetails(req.body),
          image_asset: createImageAsset(req.file),
          recipients: req.body.recipients,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response');
    } catch (error) {
      // console.error(error);
    }
    next();
    // console.log(result);
  } else if (req.body.status == 'minting') {
    //send create task to peppermintery
    //send mint to pppermint
    next();
  } else {
    next(new HttpException(400, 'Not correct status'));
  }
};

export default fileMiddleware;
