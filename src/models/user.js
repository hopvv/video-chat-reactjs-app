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
  }
  
  static mappingObject(_o) {
    const u = new User();
    if (_o.user) {
      u.displayName = _o.user.displayName || "";
      u.email = _o.user.email || "";
      u.emailVerified = _o.user.emailVerified  || false;
      u.isAnonymous = _o.user.isAnonymous || false;
      u.phoneNumber = _o.user.phoneNumber || "";
      u.photoURL = _o.user.photoURL || "";
      u.uid = _o.user.uid || "";
      u.createdAt = _o.user.metadata ? _o.user.metadata.a : "";
      u.lastLoginAt = _o.user.metadata ? _o.user.metadata.b : "'";
      u.apiKey = _o.user.l || "";
      u.refreshToken = _o.user.refreshToken || "";
      u.accessToken = _o.user.ma || "";
    }
    return u;
  }
  
  static mappingObjects(_objects) {
    return _objects.map(o => {
      return User.mappingObject(0);
    });
  }
}