import firebase from "firebase/app";
import 'firebase/functions';

/**
 * @class Server
 */
class Server {
  constructor() {
    this.functions = firebase.functions();
  }

  /**
   * Make a POST request.
   * @param {String} path - The URL path to call.
   * @param {Object} data - Data to send with the request.
   */
  async post(path, data) {
    const api = this.functions.httpsCallable(`app/${path}`);
    return await api(data);
  }
}

export default Server;