## Modules

<dl>
<dt><a href="#module_[character]">[character]</a> : <code>contexts</code></dt>
<dd><p>The character context controls the actively tracked character.</p>
</dd>
<dt><a href="#module_[localisation]">[localisation]</a> : <code>contexts</code></dt>
<dd><p>The localisation context controls the text language throughout the site.</p>
</dd>
<dt><a href="#module_[theme]">[theme]</a> : <code>contexts</code></dt>
<dd><p>The theme context controls which style theme to apply to the site (light or dark).</p>
</dd>
<dt><a href="#module_[user]">[user]</a> : <code>contexts</code></dt>
<dd><p>The character context controls the actively logged-in user.</p>
</dd>
</dl>

<a name="module_[character]"></a>

## [character] : <code>contexts</code>
The character context controls the actively tracked character.

**Example**  
```js
import { CharacterContext } from "context/character";
```
<a name="module_[character].CharacterContext"></a>

### [character].CharacterContext
`CharacterContext` is the context API for characters.

**Kind**: static constant of [<code>[character]</code>](#module_[character])  
<a name="module_[localisation]"></a>

## [localisation] : <code>contexts</code>
The localisation context controls the text language throughout the site.

**Default**: <code>localisation.en</code>  
**Example**  
```js
import { LocalisationContext, localisation } from 'context/localisation';
```

* [[localisation]](#module_[localisation]) : <code>contexts</code>
    * [.localisation](#module_[localisation].localisation)
    * [.localeInject](#module_[localisation].localeInject)
    * [.LocalisationContext](#module_[localisation].LocalisationContext)

<a name="module_[localisation].localisation"></a>

### [localisation].localisation
The `localisation` object contains localised strings.

**Kind**: static constant of [<code>[localisation]</code>](#module_[localisation])  
<a name="module_[localisation].localeInject"></a>

### [localisation].localeInject
`localeInject` injects arguments into a given string.

**Kind**: static constant of [<code>[localisation]</code>](#module_[localisation])  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The base string to apply injection to. |
| ...args | <code>any</code> | The content to inject into the base string. |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| \{0\} | <code>string</code> | Zero-indexed argument replacement position within string. |
| \{a0\} | <code>string</code> | Converts match to a hyperlink, provided passed-in arg is an object containing usual hyperlink properties. |
| \{i0\} | <code>string</code> | Wraps match in `<strong>` tags. |
| \{n0\} | <code>string</code> | Converts match to number and executes `toLocaleString` on it. |

**Example**  
```js
localeInject('The {0} is {1}', 'minion ID', 40)
```
<a name="module_[localisation].LocalisationContext"></a>

### [localisation].LocalisationContext
`LocalisationContext` is the context API for localisation.

**Kind**: static constant of [<code>[localisation]</code>](#module_[localisation])  
<a name="module_[theme]"></a>

## [theme] : <code>contexts</code>
The theme context controls which style theme to apply to the site (light or dark).

**Default**: <code>theme.light</code>  
**Example**  
```js
import { ThemeContext, themes } from "context/theme";
```

* [[theme]](#module_[theme]) : <code>contexts</code>
    * [.themes](#module_[theme].themes)
    * [.ThemeContext](#module_[theme].ThemeContext)

<a name="module_[theme].themes"></a>

### [theme].themes
The `themes` object contains style variables for each given theme.

**Kind**: static constant of [<code>[theme]</code>](#module_[theme])  
<a name="module_[theme].ThemeContext"></a>

### [theme].ThemeContext
`ThemeContext` is the context API for themes.

**Kind**: static constant of [<code>[theme]</code>](#module_[theme])  
<a name="module_[user]"></a>

## [user] : <code>contexts</code>
The character context controls the actively logged-in user.

**Default**: <code>{}</code>  
**Example**  
```js
import { UserContext } from "context/user";
```
<a name="module_[user].UserContext"></a>

### [user].UserContext
`UserContext` is the context API for users.

**Kind**: static constant of [<code>[user]</code>](#module_[user])  
