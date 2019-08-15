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
    if (window.config && window.config.offline || !bypassCacheCheck) {
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
      throw new Error("API error", exception);
    });

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
   * Consolidate resources from https://apiv2.apkallufalls.com.
   * This function returns consolidated information about a given id from a
   * given resource to return a fully-fledged data object.
   * 
   * @param {string} resource - the name of the directory file.
   * @param {string} subresource - the name of the directory subfolder.
   * @param {number} id - the id of the piece of data to retrieve.
   * 
   * @example
   * // returns {
   * //   ...minions.json entry,
   * //   ...minion/40.json,
   * //   ...patches.json entry
   * // }
   * consolidate('minions', 'minion', 40);
   * 
   * @returns {Promise} Returns the consilidated API responses.
   */
  async consolidate(resource, subresource, id) {      
    // Grab the {resource}.json list (i.e. minions.json).
    const data = await new Promise(
      (resolve, reject) => this.json(resource, false).then(resolve).catch(reject)
    );

    const list = data.data;
    const localisation = data.localisation;
    const tags = resource === 'achievements' || resource === 'titles'
    ? await new Promise(
      (resolve, reject) => this.json('achievement_categories', false, 'v3').then(resolve).catch(reject)
    ) : undefined;
    
    // If the promise was rejected, error.
    if (!(list instanceof Array))
      throw new Error(list);

    // The previous and next items.
    let nextEntry = {};
    let previousEntry = {};
    
    // Filter the list to retrieve the matching value.
    let entry = list.filter((l, index) => {
      if (+l.id !== +id)
        return false;

      if (index !== 0) {
        const previous = list[index - 1];
        previousEntry.id = previous.id;
        previousEntry.name = previous.name[window.lang];
        previousEntry.url = window.config.wikiUrl(subresource, previousEntry.id, previousEntry.name);
      }
      
      if (index !== list.length -1) {
        const next = list[index + 1];
        nextEntry.id = next.id;
        nextEntry.name = next.name[window.lang];
        nextEntry.url = window.config.wikiUrl(subresource, nextEntry.id, nextEntry.name);
      }

      return true;
    });
  
    // If there isn't exactly 1 match, error.
    if (entry.length !== 1)
      return false;
  
    // The entry we need is the 0 index.
    entry = entry[0];
    
    // We can now grab the individual json file for that entry.
    const individual = await new Promise(
      (resolve, reject) => this.json(subresource + '/' + entry.id, false) .then(resolve).catch(reject)
    );
  
    // If no individual json file was found, error.
    if (!individual || typeof individual !== 'object')
      throw new Error(individual);
    
    // Grab the patch list.
    const patches = await new Promise(
      (resolve, reject) => this.json('patches', false, 'v3').then(resolve).catch(reject)
    );
  
    // Get details of the relevant patch.
    let patch = patches.filter(p => p.id === entry.patch);
  
    // If there isn't exactly 1 patch, error.
    if (patch.length !== 1)
      throw new Error(
        "Expected 1 entry for patch '" + entry.patch + "' in 'patches', instead found " + patch.length
      );
  
    // The patch we need is the 0 index.
    patch = patch[0];
  
    // Return the unified data.
    return {
      data: {
        ...individual,
        ...entry,
        patch,
        previousEntry,
        nextEntry
      },
      localisation,
      tags
    }
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
    if (((window.config && window.config.offline) || !bypassCacheCheck) && cachedDb.uid === this.uid) {
      const cachedData = cachedDb[resource];

      // If an entry exists in the cache, return that instead of making a new DB call.
      if (cachedData)
        return cachedData;
    }

    // It shouldn't ever get here. Do nothing just in case.
    if (window.config && window.config.offline)
      return;

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
        "@": +new Date()
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

        window.config.updateUserCounts();

        if (!data)
          return;

        return data[resource];
      })
  }
}

export default API;