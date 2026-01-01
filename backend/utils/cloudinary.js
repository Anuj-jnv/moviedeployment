
import fs from "fs";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dyqa7ohun', 
  api_key: '355914692581717', 
  api_secret: 'lxkrIxmNU4CXEYqnDpKq7kL-UDM' 
});

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY ,
//     api_secret:process.env.CLOUDINARY_API_SECRET
//   });

const uploadOnCloudinary = async (localFilePath) => {
  try { 
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // FILE HAS BEEN UPLOADED
    console.log("File is uploaded on cloudinary");
    // File Upload ho chuki hai abb use unlink kar denge
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); // Remove the locally saved temporary files
    return null;
  }
};

export { uploadOnCloudinary };
