export default class User {
  constructor() {
    this.displayName = "";
    this.email = "";
    this.emailVerified = false;
    this.isAnonymous = false;
    this.phoneNumber = "";
    this.photoURL = "";
    this.uid = ""
    this.createdAt = "";
    this.lastLoginAt = "";
    this.isAnonymous = false; //user.isAnonymous
    this.apiKey = ""; //user.l
    this.refreshToken = ""; //user.refreshToken
    this.accessToken = ""; //user.ma
    this.des = "";
  }
  
  static mappingObject(_o) {
    const u = new User();
    if (_o) {
      u.displayName = _o.displayName || _o.email;
      u.email = _o.email || "";
      u.emailVerified = _o.emailVerified  || false;
      u.isAnonymous = _o.isAnonymous || false;
      u.phoneNumber = _o.phoneNumber || "";
      u.photoURL = _o.photoURL || "";
      u.uid = _o.uid || "";
      u.createdAt = _o.metadata ? _o.metadata.a : "";
      u.lastLoginAt = _o.metadata ? _o.metadata.b : "'";
      u.apiKey = _o.l || "";
      u.refreshToken = _o.refreshToken || "";
      u.accessToken = _o.ma || "";
    }
    return u;
  }
  
  static mappingObjects(_objects) {
    return _objects.map(o => {
      return User.mappingObject(0);
    });
  }
}