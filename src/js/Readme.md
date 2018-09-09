## Modules

<dl>
<dt><a href="#module_[api]">[api]</a> : <code>js</code></dt>
<dd><p>This allows for API calls to be executed whilst also caching the responses where necessary.</p>
</dd>
<dt><a href="#module_[routes]">[routes]</a> : <code>js</code></dt>
<dd><p>This contains page routes for the entire application.</p>
</dd>
<dt><a href="#module_[pages]">[pages]</a> : <code>js/routes</code></dt>
<dd><p>This maps routes to a given page component for use within the <code>&lt;Container /&gt;</code> component.</p>
</dd>
</dl>

<a name="module_[api]"></a>

## [api] : <code>js</code>
This allows for API calls to be executed whilst also caching the responses where necessary.


* [[api]](#module_[api]) : <code>js</code>
    * [~Api](#module_[api]..Api)
        * [.json(resource, bypassCacheCheck, xivdbApiVersion)](#module_[api]..Api+json) ⇒ <code>Promise</code>
        * [.consolidate(resource, subresource, id, xivdbApiVersion)](#module_[api]..Api+consolidate) ⇒ <code>Promise</code>
        * [.db(resource, data, bypassCacheCheck, saveAll)](#module_[api]..Api+db) ⇒ <code>Object</code>
        * [.getRefInfo(ref)](#module_[api]..Api+getRefInfo) ⇒ <code>Object</code>

<a name="module_[api]..Api"></a>

### [api]~Api
**Kind**: inner class of [<code>[api]</code>](#module_[api])  

* [~Api](#module_[api]..Api)
    * [.json(resource, bypassCacheCheck, xivdbApiVersion)](#module_[api]..Api+json) ⇒ <code>Promise</code>
    * [.consolidate(resource, subresource, id, xivdbApiVersion)](#module_[api]..Api+consolidate) ⇒ <code>Promise</code>
    * [.db(resource, data, bypassCacheCheck, saveAll)](#module_[api]..Api+db) ⇒ <code>Object</code>
    * [.getRefInfo(ref)](#module_[api]..Api+getRefInfo) ⇒ <code>Object</code>

<a name="module_[api]..Api+json"></a>

#### api.json(resource, bypassCacheCheck, xivdbApiVersion) ⇒ <code>Promise</code>
Get data from https://api.apkallufalls.com.
This function either fetches new data or grabs cached data from the user's
browser localStorage.

**Kind**: instance method of [<code>Api</code>](#module_[api]..Api)  
**Returns**: <code>Promise</code> - Returns the parsed API response.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the filepath of the resource to fetch. |
| bypassCacheCheck | <code>bool</code> | don't try to fetch a cached version. |
| xivdbApiVersion | <code>string</code> | the version of the API to use (null = v2). |

**Example**  
```js
// returns data from https://api.apkallufalls.com/minion/40.json OR
// localStorage.getItem('api')['minion/40'] if that exists already.
json('minion/40');
```
**Example**  
```js
// returns data from https://api.apkallufalls.com/version.json.
json('version', true);
```
<a name="module_[api]..Api+consolidate"></a>

#### api.consolidate(resource, subresource, id, xivdbApiVersion) ⇒ <code>Promise</code>
Consolidate resources from https://api.apkallufalls.com.
This function returns consolidated information about a given id from a
given resource to return a fully-fledged data object.

**Kind**: instance method of [<code>Api</code>](#module_[api]..Api)  
**Returns**: <code>Promise</code> - Returns the consilidated API responses.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the name of the directory file. |
| subresource | <code>string</code> | the name of the directory subfolder. |
| id | <code>number</code> | the id of the piece of data to retrieve. |
| xivdbApiVersion | <code>string</code> | the version of the API to use (null = v2). |

**Example**  
```js
// returns {
//   ...minions.json entry,
//   ...minion/40.json,
//   ...patches.json entry
// }
consolidate('minions', 'minion', 40);
```
<a name="module_[api]..Api+db"></a>

#### api.db(resource, data, bypassCacheCheck, saveAll) ⇒ <code>Object</code>
Fetch data from and store data to the Firebase database.

**Kind**: instance method of [<code>Api</code>](#module_[api]..Api)  
**Returns**: <code>Object</code> - Returns the data requested or stored.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the name of the directory file. |
| data | <code>Object</code> | the data to send. |
| bypassCacheCheck | <code>boolean</code> | should get requests ignore the cache? |
| saveAll | <code>boolean</code> | does this need to save the entire data set? |

**Example**  
```js
// returns {
//   ...minions.json entry,
//   ...minion/40.json,
//   ...patches.json entry
// }
db('minions', { ... }, false, true);
```
<a name="module_[api]..Api+getRefInfo"></a>

#### api.getRefInfo(ref) ⇒ <code>Object</code>
This function normalises ref objects contained in data returned from the API.
The cases here represent keys contained within the localisation objects from both
http://api.apkallufalls.com/minions.json and http://api.apkallufalls.com/mounts.json.

**Kind**: instance method of [<code>Api</code>](#module_[api]..Api)  
**Returns**: <code>Object</code> - - The normalised representation.  

| Param | Type | Description |
| --- | --- | --- |
| ref | <code>Object</code> | The ref object. |

<a name="module_[routes]"></a>

## [routes] : <code>js</code>
This contains page routes for the entire application.

<a name="module_[pages]"></a>

## [pages] : <code>js/routes</code>
This maps routes to a given page component for use within the `<Container />` component.

