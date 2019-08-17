import firebase from 'firebase/app';

/**
 * @class API
 */
class API {
  static spritesheet(source) {
    const cachedApi = (localStorage && JSON.parse(localStorage.getItem('api'))) || { misc: { version: 0 }};
    return `https://apiv2.apkallufalls.com/icons/${source}.png?v=${cachedApi.misc.version}`;
  }

  /**
   * @param {String} [dir] - The directory to pull data from (e.g. `"icons"`)
   * @param {String} [uid] - The signed in user's UID.
   */
  constructor(dir = 'misc', uid = '') {
    this.dir = dir;
    this.uid = uid;
  }

  async fromCache(resource) {
    const cachedApi = (localStorage && JSON.parse(localStorage.getItem('api')));

    if (!cachedApi || typeof cachedApi !== 'object') {
      return;
    }

    const cachedData = cachedApi[this.dir] && cachedApi[this.dir][resource];

    if (!cachedData) {
      return;
    }

    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(cachedData)
      }, 1);
    });
  }

  /**
   * Get data from https://apiv2.apkallufalls.com.
   * This function either fetches new data or grabs cached data from the user's
   * browser localStorage.
   * 
   * @param {string} resource - the filepath of the resource to fetch.
   * @param {bool} bypassCacheCheck - don't try to fetch a cached version.
   * 
   * @example
   * // returns data from https://apiv2.apkallufalls.com/minion/40.json OR
   * // localStorage.getItem('api')['minion/40'] if that exists already.
   * json('minion/40');
   * 
   * @example
   * // returns data from https://apiv2.apkallufalls.com/version.json.
   * json('version', true);
   * 
   * @returns {Promise} Returns the parsed API response.
   */
  async json(resource, bypassCacheCheck) {
    // If we're not ignoring the cache, attempt to return cached data.
    if (!bypassCacheCheck) {
      const cachedData = await this.fromCache(resource);

      // If an entry exists in the cache, return that instead of making a new
      // API call.
      if (cachedData) {
        return cachedData;
      }
    }

    // Grab cached entry from API (if it exists).
    const cachedApi = (localStorage && JSON.parse(localStorage.getItem('api'))) || {};

    // Appends a cache-friendly (or cache-busting) query parameter to the URL.
    const version = resource !== 'version' && cachedApi.misc && cachedApi.misc.version || ('new-' + +new Date());

    // Fetch the data.
    const data = await fetch(
      `https://apiv2.apkallufalls.com/${this.dir === 'misc' ? '' : `${this.dir}/`}${resource}.json?c=${version}`
    ).then(
      response => response.json()
    ).catch(exception => {
      console.error(exception);
      return { error: true };
    });

    if (data.error) {
      return data;
    }

    // Update cache.
    if (localStorage) {
      // Re-fetch the cached API to ensure no collsions.
      const reFetchedCachedApi = JSON.parse(localStorage.getItem('api')) || {};
      if (!reFetchedCachedApi[this.dir]) {
        reFetchedCachedApi[this.dir] = {};
      }
      reFetchedCachedApi[this.dir][resource] = data;
      localStorage.setItem('api', JSON.stringify(reFetchedCachedApi));
    }
    
    return data;
  }

  /**
   * Fetch data from and store data to the Firebase database.
   * 
   * @param {string} resource - the name of the directory file.
   * @param {Object} data - the data to send.
   * @param {boolean} bypassCacheCheck - should get requests ignore the cache?
   * @param {boolean} saveAll - does this need to save the entire data set?
   * 
   * @example
   * // returns {
   * //   ...minions.json entry,
   * //   ...minion/40.json,
   * //   ...patches.json entry
   * // }
   * db('minions', { ... }, false, true);
   * 
   * @returns {Object} Returns the data requested or stored.
   */
  async db(resource, data, bypassCacheCheck, saveAll) {
    // If the user is not logged in, do nothing.
    if (!this.uid)
      return;

    // Grab cached entry from API (if it exists).
    let cachedDb = (localStorage && JSON.parse(localStorage.getItem('store'))) || {};

    // If we're not ignoring the cache, attempt to return cached data.
    if (!data && !bypassCacheCheck && cachedDb.uid === this.uid) {
      const cachedData = cachedDb[resource];

      // If an entry exists in the cache, return that instead of making a new DB call.
      if (cachedData)
        return cachedData;
    }

    // Wipe the currently-stored data (if any).
    cachedDb = {
      uid: this.uid
    };

    // Get a reference to the Firebase store.
    const document = firebase.firestore().doc('data/' + this.uid);

    // If there's data, it's a set request.
    if (data) {
      // Generate the request object, updating the updated timestamp.
      let requestObj = {
        "@": Number(new Date())
      }

      if (saveAll)
        requestObj = {
          ...data,
          ...requestObj
        };
      else
        // Set the passed-in data, using the resource argument as the key.
        requestObj[resource] = data;

      // Make the request.
      return document
        .set(requestObj, { merge: true })
        .then(response => {
          // Update the cached data.
          localStorage.setItem('store', JSON.stringify({
            ...cachedDb,
            ...requestObj
          }));

          return response;
        });
    }

    // If there's no data, it's a get request.
    return document
      .get()
      .then(response => {
        const data = response.data();

        // Update the cached data.
        localStorage.setItem('store', JSON.stringify({
          ...cachedDb,
          ...data
        }));

        if (!data)
          return;

        return data[resource];
      })
  }
}

export default API;