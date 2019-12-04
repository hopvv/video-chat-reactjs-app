class ImageModel {
  constructor() {
    this.copyRight = '';
    this.date = '';
    this.explanation = '';
    this.hdurl = '';
    this.media_type = '';
    this.service_version = '';
    this.title = '';
    this.url = '';
  }
  
  static mappingObject(_o) {
    return {
      copyRight: _o.copyRight || '',
      date: _o.date || '',
      explanation: _o.explanation || '',
      hdurl: _o.hdurl || '',
      media_type: _o.media_type || '',
      service_version: _o.service_version || '',
      title: _o.title || '',
      url: _o.url || '',
    };
  }
}

export default ImageModel;