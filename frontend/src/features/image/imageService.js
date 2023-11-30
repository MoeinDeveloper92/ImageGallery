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


//get image
const getImage = async (imageId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "download/" + imageId, config)
    return response.data
}


//Export to Excel
const exportToExcel = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Ensure response type is blob for file download
    };

    try {
        const response = await axios.get(API_URL + "download/export-to-excel", config);

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

        // Download the Excel file
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'exported_data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error:', error);

    }
};


///Delete Image
const deleteImage = async (imageId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + imageId, config)
    return response.data
}


const imageService = {
    uploadImage,
    getImages,
    getImage,
    exportToExcel,
    deleteImage
}


export default imageService