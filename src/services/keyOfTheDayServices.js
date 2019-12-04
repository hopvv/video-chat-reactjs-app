import keyOfTheDayApis from "../apis/keyOfTheDayApis";
import imageModel from "../models/imageModel";
// IMPORT MODELS....

class KeyOfTheDayServices {
  constructor() {
  
  }
  
  astronomyPictureOfTheDay(date) {
    return keyOfTheDayApis.astronomyPictureOfTheDay(date)
      .then(res => {
        if (res.status === 200) {
          return {success: true, data: imageModel.mappingObject(res.data)}
        }
        // Should mapping res data to models
        return {...res, success: false};
      })
      .catch(error => {
        console.error("Error: KeyOfTheDayServices/astronomyPictureOfTheDay", error);
      });
  }
};

export default new KeyOfTheDayServices();