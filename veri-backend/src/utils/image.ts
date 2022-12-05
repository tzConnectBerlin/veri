import { HttpException } from '@/exceptions/HttpException';
import sharp from 'sharp';

export const createRoundedCorners = async (file: Express.Multer.File) => {
  const image = sharp(file.buffer);
  const metadata = await image.metadata();
  const res = Math.min(metadata.width, metadata.height);
  const radius = res / 2;
  const roundedCornerLayer = await createCompositeLayer(res, res, radius);
  const roundedlayerComposite = await createCompositePipe(roundedCornerLayer);
  const ws = await writeStream(image, res, res, roundedlayerComposite);
  return ws;
};

export const createThumbnailImage = async (file: Express.Multer.File) => {
  const image = sharp(file.buffer);
  const res = 150;
  const radius = 75;
  const thumbnailLayer = await createCompositeLayer(res, res, radius);
  const thumbnailComposite = await createCompositePipe(thumbnailLayer);
  const ws = await writeStream(image, res, res, thumbnailComposite);
  return ws;
};

const createCompositeLayer = async (
  width: number,
  height: number,
  radius: number
): Promise<Buffer> => {
  return Buffer.from(
    `<svg>
        <rect 
        x="0" 
        y="0" 
        width="${width}" 
        height="${height}" 
        rx="${radius}" 
        ry="${radius}"/>
      </svg>`
  );
};

const createCompositePipe = async (layer: Buffer): Promise<sharp.Sharp> => {
  return sharp()
    .composite([
      {
        input: layer,
        blend: 'dest-in',
      },
    ])
    .png()
    .on(
      'error',
      () => new HttpException(500, 'Cannot process file, please try again.')
    );
};

const writeStream = async (
  image: sharp.Sharp,
  width: number,
  height: number,
  composite: sharp.Sharp
): Promise<Buffer> => {
  const writeStream = image
    .resize(width, height)
    .pipe(composite)
    .on(
      'error',
      () => new HttpException(500, 'Cannot process file, please try again.')
    )
    .toBuffer();

  return writeStream;
};

// roundedCorners(
//   '/Users/nazmussakib/Work/veri/veri-backend/uploads/0bca4d300b3b1c2cf1119161b872d375'
// );
// thumbnail(
//   '/Users/nazmussakib/Work/veri/veri-backend/uploads/0bca4d300b3b1c2cf1119161b872d375'
// );
