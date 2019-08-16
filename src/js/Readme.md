## Modules

<dl>
<dt><a href="#module_[routes]">[routes]</a> : <code>js</code></dt>
<dd><p>This contains page routes for the entire application.</p>
</dd>
<dt><a href="#module_[pages]">[pages]</a> : <code>js/routes</code></dt>
<dd><p>This maps routes to a given page component for use within the <code>&lt;Container /&gt;</code> component.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#API">API</a></dt>
<dd></dd>
<dt><a href="#API">API</a></dt>
<dd></dd>
<dt><a href="#Character">Character</a></dt>
<dd></dd>
<dt><a href="#Character">Character</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#cache">cache</a> ⇒ <code>Object</code></dt>
<dd><p>Get cached character data.
This returns data stored for the character within the user&#39;s browser
localStorage.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#info">info()</a> ⇒ <code>Object</code></dt>
<dd><p>Get the character&#39;s basic info.
This function returns the character&#39;s avatar, name, server and title.</p>
</dd>
<dt><a href="#isPrivate">isPrivate()</a> ⇒ <code>boolean</code></dt>
<dd><p>Get the character&#39;s Lodestone privacy state.
This function returns whether the character&#39;s data can be synchronised through XIVAPI.</p>
</dd>
<dt><a href="#achievements">achievements()</a> ⇒ <code>Array</code></dt>
<dd><p>Get the character&#39;s obtained achievement data.
This function returns the character&#39;s obtained achievements.</p>
</dd>
<dt><a href="#minions">minions()</a> ⇒ <code>Array</code></dt>
<dd><p>Get the character&#39;s obtained minion data.
This function returns the character&#39;s obtained minions.</p>
</dd>
<dt><a href="#mounts">mounts()</a> ⇒ <code>Array</code></dt>
<dd><p>Get the character&#39;s obtained mount data.
This function returns the character&#39;s obtained mounts.</p>
</dd>
<dt><a href="#barding">barding()</a> ⇒ <code>Array</code></dt>
<dd><p>PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.</p>
</dd>
<dt><a href="#emotes">emotes()</a> ⇒ <code>Array</code></dt>
<dd><p>PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.</p>
</dd>
<dt><a href="#orchestrionRolls">orchestrionRolls()</a> ⇒ <code>Array</code></dt>
<dd><p>PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.</p>
</dd>
<dt><a href="#counts">counts()</a> ⇒ <code>Object</code></dt>
<dd><p>Get the character&#39;s total obtained counts.
This function returns the character&#39;s obtained totals.</p>
</dd>
<dt><a href="#achievementStats">achievementStats()</a> ⇒ <code>Object</code></dt>
<dd><p>Get the character&#39;s achievement statistics.</p>
</dd>
<dt><a href="#isTracked">isTracked()</a> ⇒ <code>boolean</code></dt>
<dd><p>Get the character&#39;s Tracked state on Apkallu Falls.
This function returns whether the character is being tracked.</p>
</dd>
<dt><a href="#track">track()</a> ⇒ <code>boolean</code></dt>
<dd><p>Add this character to the tracked characters list.
This stores the character ID in the tracked characters object within localStorage.</p>
</dd>
<dt><a href="#fetchData">fetchData()</a></dt>
<dd><p>Get character data from the XIVAPI API.
This function checks XIVAPI&#39;s cache, then either returns a fresh set of data
from XIVAPI&#39;s API or returns the cached data from localStorage.</p>
</dd>
<dt><a href="#getAchievements">getAchievements()</a></dt>
<dd><p>Get Character achievement data from XIVAPI or returned cached data.
This function caches retrieved data within session storage with an expiry of 24 hours.</p>
</dd>
<dt><a href="#getData">getData()</a></dt>
<dd><p>Get Character data from XIVAPI or returned cached data.
This function caches retrieved data within session storage with an expiry of 24 hours.</p>
</dd>
<dt><a href="#parseRawCharacterData">parseRawCharacterData(character)</a></dt>
<dd><p>Normalise the raw Character object returned by XIVAPI.</p>
</dd>
<dt><a href="#search">search()</a></dt>
<dd><p>Search for a Character using XIVAPI.</p>
</dd>
</dl>

<a name="module_[routes]"></a>

## [routes] : <code>js</code>
This contains page routes for the entire application.

<a name="module_[pages]"></a>

## [pages] : <code>js/routes</code>
This maps routes to a given page component for use within the `<Container />` component.

<a name="API"></a>

## API
**Kind**: global class  

* [API](#API)
    * [new API([dir], [uid])](#new_API_new)
    * [.json(resource, bypassCacheCheck)](#API+json) ⇒ <code>Promise</code>
    * [.consolidate(resource, subresource, id)](#API+consolidate) ⇒ <code>Promise</code>
    * [.db(resource, data, bypassCacheCheck, saveAll)](#API+db) ⇒ <code>Object</code>

<a name="new_API_new"></a>

### new API([dir], [uid])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dir] | <code>String</code> | <code>misc</code> | The directory to pull data from (e.g. `"icons"`) |
| [uid] | <code>String</code> |  | The signed in user's UID. |

<a name="API+json"></a>

### apI.json(resource, bypassCacheCheck) ⇒ <code>Promise</code>
Get data from https://apiv2.apkallufalls.com.
This function either fetches new data or grabs cached data from the user's
browser localStorage.

**Kind**: instance method of [<code>API</code>](#API)  
**Returns**: <code>Promise</code> - Returns the parsed API response.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the filepath of the resource to fetch. |
| bypassCacheCheck | <code>bool</code> | don't try to fetch a cached version. |

**Example**  
```js
// returns data from https://apiv2.apkallufalls.com/minion/40.json OR
// localStorage.getItem('api')['minion/40'] if that exists already.
json('minion/40');
```
**Example**  
```js
// returns data from https://apiv2.apkallufalls.com/version.json.
json('version', true);
```
<a name="API+consolidate"></a>

### apI.consolidate(resource, subresource, id) ⇒ <code>Promise</code>
Consolidate resources from https://apiv2.apkallufalls.com.
This function returns consolidated information about a given id from a
given resource to return a fully-fledged data object.

**Kind**: instance method of [<code>API</code>](#API)  
**Returns**: <code>Promise</code> - Returns the consilidated API responses.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the name of the directory file. |
| subresource | <code>string</code> | the name of the directory subfolder. |
| id | <code>number</code> | the id of the piece of data to retrieve. |

**Example**  
```js
// returns {
//   ...minions.json entry,
//   ...minion/40.json,
//   ...patches.json entry
// }
consolidate('minions', 'minion', 40);
```
<a name="API+db"></a>

### apI.db(resource, data, bypassCacheCheck, saveAll) ⇒ <code>Object</code>
Fetch data from and store data to the Firebase database.

**Kind**: instance method of [<code>API</code>](#API)  
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
<a name="API"></a>

## API
**Kind**: global class  

* [API](#API)
    * [new API([dir], [uid])](#new_API_new)
    * [.json(resource, bypassCacheCheck)](#API+json) ⇒ <code>Promise</code>
    * [.consolidate(resource, subresource, id)](#API+consolidate) ⇒ <code>Promise</code>
    * [.db(resource, data, bypassCacheCheck, saveAll)](#API+db) ⇒ <code>Object</code>

<a name="new_API_new"></a>

### new API([dir], [uid])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dir] | <code>String</code> | <code>misc</code> | The directory to pull data from (e.g. `"icons"`) |
| [uid] | <code>String</code> |  | The signed in user's UID. |

<a name="API+json"></a>

### apI.json(resource, bypassCacheCheck) ⇒ <code>Promise</code>
Get data from https://apiv2.apkallufalls.com.
This function either fetches new data or grabs cached data from the user's
browser localStorage.

**Kind**: instance method of [<code>API</code>](#API)  
**Returns**: <code>Promise</code> - Returns the parsed API response.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the filepath of the resource to fetch. |
| bypassCacheCheck | <code>bool</code> | don't try to fetch a cached version. |

**Example**  
```js
// returns data from https://apiv2.apkallufalls.com/minion/40.json OR
// localStorage.getItem('api')['minion/40'] if that exists already.
json('minion/40');
```
**Example**  
```js
// returns data from https://apiv2.apkallufalls.com/version.json.
json('version', true);
```
<a name="API+consolidate"></a>

### apI.consolidate(resource, subresource, id) ⇒ <code>Promise</code>
Consolidate resources from https://apiv2.apkallufalls.com.
This function returns consolidated information about a given id from a
given resource to return a fully-fledged data object.

**Kind**: instance method of [<code>API</code>](#API)  
**Returns**: <code>Promise</code> - Returns the consilidated API responses.  

| Param | Type | Description |
| --- | --- | --- |
| resource | <code>string</code> | the name of the directory file. |
| subresource | <code>string</code> | the name of the directory subfolder. |
| id | <code>number</code> | the id of the piece of data to retrieve. |

**Example**  
```js
// returns {
//   ...minions.json entry,
//   ...minion/40.json,
//   ...patches.json entry
// }
consolidate('minions', 'minion', 40);
```
<a name="API+db"></a>

### apI.db(resource, data, bypassCacheCheck, saveAll) ⇒ <code>Object</code>
Fetch data from and store data to the Firebase database.

**Kind**: instance method of [<code>API</code>](#API)  
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
<a name="Character"></a>

## Character
**Kind**: global class  
<a name="Character"></a>

## Character
**Kind**: global class  
<a name="cache"></a>

## cache ⇒ <code>Object</code>
Get cached character data.
This returns data stored for the character within the user's browser
localStorage.

**Kind**: global variable  
**Returns**: <code>Object</code> - - Character data stored in cache.  
<a name="info"></a>

## info() ⇒ <code>Object</code>
Get the character's basic info.
This function returns the character's avatar, name, server and title.

**Kind**: global function  
**Returns**: <code>Object</code> - - Returns the character's basic info.  
<a name="isPrivate"></a>

## isPrivate() ⇒ <code>boolean</code>
Get the character's Lodestone privacy state.
This function returns whether the character's data can be synchronised through XIVAPI.

**Kind**: global function  
**Returns**: <code>boolean</code> - - Returns the character's achievement privacy state.  
<a name="achievements"></a>

## achievements() ⇒ <code>Array</code>
Get the character's obtained achievement data.
This function returns the character's obtained achievements.

**Kind**: global function  
**Returns**: <code>Array</code> - Returns the character's obtained achievements.  
<a name="minions"></a>

## minions() ⇒ <code>Array</code>
Get the character's obtained minion data.
This function returns the character's obtained minions.

**Kind**: global function  
**Returns**: <code>Array</code> - - Returns the character's obtained minions.  
<a name="mounts"></a>

## mounts() ⇒ <code>Array</code>
Get the character's obtained mount data.
This function returns the character's obtained mounts.

**Kind**: global function  
**Returns**: <code>Array</code> - - Returns the character's obtained mounts.  
<a name="barding"></a>

## barding() ⇒ <code>Array</code>
PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.

**Kind**: global function  
**Returns**: <code>Array</code> - - PLACEHOLDER.  
<a name="emotes"></a>

## emotes() ⇒ <code>Array</code>
PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.

**Kind**: global function  
**Returns**: <code>Array</code> - - PLACEHOLDER.  
<a name="orchestrionRolls"></a>

## orchestrionRolls() ⇒ <code>Array</code>
PLACEHOLDER.
This function is in place for future use. Without it, list page breaks.

**Kind**: global function  
**Returns**: <code>Array</code> - - PLACEHOLDER.  
<a name="counts"></a>

## counts() ⇒ <code>Object</code>
Get the character's total obtained counts.
This function returns the character's obtained totals.

**Kind**: global function  
**Returns**: <code>Object</code> - - Returns the character's obtained totals.  
<a name="achievementStats"></a>

## achievementStats() ⇒ <code>Object</code>
Get the character's achievement statistics.

**Kind**: global function  
**Returns**: <code>Object</code> - - Returns the character's achievement statistics.  
<a name="isTracked"></a>

## isTracked() ⇒ <code>boolean</code>
Get the character's Tracked state on Apkallu Falls.
This function returns whether the character is being tracked.

**Kind**: global function  
**Returns**: <code>boolean</code> - - Returns the character's tracked state.  
<a name="track"></a>

## track() ⇒ <code>boolean</code>
Add this character to the tracked characters list.
This stores the character ID in the tracked characters object within localStorage.

**Kind**: global function  
**Returns**: <code>boolean</code> - - Always returns true when complete.  
<a name="fetchData"></a>

## fetchData()
Get character data from the XIVAPI API.
This function checks XIVAPI's cache, then either returns a fresh set of data
from XIVAPI's API or returns the cached data from localStorage.

**Kind**: global function  
<a name="getAchievements"></a>

## getAchievements()
Get Character achievement data from XIVAPI or returned cached data.
This function caches retrieved data within session storage with an expiry of 24 hours.

**Kind**: global function  
<a name="getData"></a>

## getData()
Get Character data from XIVAPI or returned cached data.
This function caches retrieved data within session storage with an expiry of 24 hours.

**Kind**: global function  
<a name="parseRawCharacterData"></a>

## parseRawCharacterData(character)
Normalise the raw Character object returned by XIVAPI.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| character | <code>Object</code> | A Character object as returned by XIVAPI. |

<a name="search"></a>

## search()
Search for a Character using XIVAPI.

**Kind**: global function  
