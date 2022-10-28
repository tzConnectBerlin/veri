import sharp from 'sharp';

export const roundedCorners = async (file) => {
  try {
    const image = sharp(file);
    const metadata = await image.metadata();
    const res = Math.min(metadata.width, metadata.height);
    const radius = res / 2;
    const roundedCornerLayer = await createCompositeLayer(res, res, radius);
    const cornerlayerComposite = await createCompositePipe(roundedCornerLayer);
    return writeImage(image, res, res, cornerlayerComposite);
  } catch (error) {
    console.log(error);
  }
};

export const thumbnail = async (file) => {
  try {
    const image = sharp(file);
    const res = 150;
    const radius = 75;
    const thumbnailLayer = await createCompositeLayer(res, res, radius);
    const thumbnailComposite = await createCompositePipe(thumbnailLayer);
    return writeImage(image, res, res, thumbnailComposite);
  } catch (error) {
    console.log(error);
  }
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
    .png();
};

const writeImage = async (
  image: sharp.Sharp,
  width: number,
  height: number,
  composite: sharp.Sharp
): Promise<sharp.Sharp> => {
  return image
    .resize(width, height)
    .pipe(composite)
    .toFile('filename', (error) => {
      console.log(error);
    });
};

roundedCorners(
  '/Users/nazmussakib/Work/veri/veri-backend/uploads/0bca4d300b3b1c2cf1119161b872d375'
);
