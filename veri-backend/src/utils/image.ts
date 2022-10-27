// import sharp from 'sharp';

// const chunks =
//   '/Users/nazmussakib/Work/veri/veri-backend/uploads/0bca4d300b3b1c2cf1119161b872d375';

// export const roundedCorners = async (readStream) => {
//   const image = sharp(readStream);
//   const metadata = await image.metadata();
//   const res = Math.min(metadata.width, metadata.height);
//   const radius = res / 2;

//   const roundedCorners = Buffer.from(
//     `<svg>
//         <rect 
//         x="0" 
//         y="0" 
//         width="${res}" 
//         height="${res}" 
//         rx="${radius}" 
//         ry="${radius}"/>
//     </svg>`
//   );

//   const roundedCornerResizer = sharp()
//     .composite([
//       {
//         input: roundedCorners,
//         blend: 'dest-in',
//       },
//     ])
//     .png();

//   const writeStream = async () =>
//     sharp(readStream)
//       .resize(res, res)
//       .pipe(roundedCornerResizer)
//       .toFile('rc', function (err1, info) {
//         if (err1) {
//           console.log(err1);
//           console.log(info);
//         }
//       });

//   return writeStream;
// };

// export const thumbnail = async (readStream) => {
//   const roundedCorners = Buffer.from(
//     `<svg><rect x="0" y="0" width="150" height="150" rx="75" ry="75"/></svg>`
//   );

//   sharp(readStream)
//     .resize(150, 150)
//     .composite([
//       {
//         input: roundedCorners,
//         blend: 'dest-in',
//       },
//     ])
//     .toFile('thumbnail', function (err1, info) {
//       if (err1) {
//         console.log(err1);
//         console.log(info);
//       }
//     });
// };

// roundedCorners(chunks));
// // thumbnail(Buffer.from(chunks));
