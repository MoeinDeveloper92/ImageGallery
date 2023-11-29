import axios from "axios"

const API_URL = "/api/images/"



//uploadImage
const uploadImage = async (imageData, token) => {
    const formData = new FormData();

    // Append image, label, and description to FormData
    formData.append('image', imageData.image); // Assuming imageData.image contains the image file
    formData.append('label', imageData.label);
    formData.append('description', imageData.description);

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = await axios.post(API_URL + 'upload', formData, config);
        return response.data;
    } catch (error) {
        // Handle error
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
};


//get images
const getImages = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "download", config)
    return response.data
}



const imageService = {
    uploadImage,
    getImages
}


export default imageService