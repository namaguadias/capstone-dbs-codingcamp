const axios = require("axios");
const FormData = require("form-data");

class DiagnosisService {
  constructor() {
    this.mlServiceUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000";
  }

  async diagnose(imageBuffer) {
    try {
      const formData = new FormData();
      formData.append("image", imageBuffer, {
        filename: "image.jpg",
        contentType: "image/jpeg",
      });

      const response = await axios.post(
        `${this.mlServiceUrl}/predict`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error during diagnosis:", error);
      throw error;
    }
  }
}

module.exports = new DiagnosisService();
