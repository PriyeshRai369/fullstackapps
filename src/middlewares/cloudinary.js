import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
  cloud_name: "cloudinery_username", 
  api_key: "cloudinery_api_key",
  api_secret: 'cloudinery_secret',
});

const fileUpload = async (filePath)=>{
    // console.log("the file path of file",filePath);
    try {
        if(!filePath) return null
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:'auto',
        })
        console.log("file has been uploaded",response.url);
        fs.unlinkSync(filePath)
        return response;

    } catch (error) {
        fs.unlinkSync(filePath)
        return null;
    }
}
export {fileUpload}