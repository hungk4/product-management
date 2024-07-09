const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');


 // Configuration
 cloudinary.config({ 
  cloud_name: 'dcvve7584', 
  api_key: '948796653954397', 
  api_secret: 'PesytZeiM5XTT6cuMfluu64Z_24' 
});

module.exports.uploadSingle = (req, res, next) => {
  if(req.file){
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const uploadCloudinary = async (buffer) => {
      const result = await streamUpload(buffer);
      req.body[req.file.fieldname] = result.url;
      next();
    }
    
    uploadCloudinary(req.file.buffer);

  } else{
    next();
  }
  
}