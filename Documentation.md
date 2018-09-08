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
<dt><a href="#module_[AFComponent]">[AFComponent]</a> : <code>js</code></dt>
<dd><p>The <code>&lt;AFComponent /&gt;</code> utility component wraps other components with themeing and localisation support.</p>
</dd>
<dt><a href="#module_[Language]">[Language]</a> : <code>js/components</code></dt>
<dd><p>The <code>&lt;Language /&gt;</code> component displays language selection controls.</p>
</dd>
<dt><a href="#module_[Panel]">[Panel]</a> : <code>js/components</code></dt>
<dd><p>The <code>&lt;Panel /&gt;</code> component displays a panel (box) on the page for content to sit within.</p>
</dd>
<dt><a href="#module_[Progress]">[Progress]</a> : <code>js/components</code></dt>
<dd><p>The <code>&lt;Progress /&gt;</code> component displays a progress bar with caption, value, total and percentage.</p>
</dd>
<dt><a href="#module_[Container]">[Container]</a> : <code>js/layout</code></dt>
<dd><p>The <code>&lt;Container /&gt;</code> layout component wraps each page.</p>
</dd>
<dt><a href="#module_[Navigation]">[Navigation]</a> : <code>js/layout</code></dt>
<dd><p>The <code>&lt;Navigation /&gt;</code> layout component wraps the sidebar.</p>
</dd>
<dt><a href="#module_[Home]">[Home]</a> : <code>js/pages</code></dt>
<dd><p>The <code>&lt;Home /&gt;</code> page component controls <a href="https://apkallufalls.com">https://apkallufalls.com</a> (route: <code>&#39;/&#39;</code>).</p>
</dd>
</dl>

<a name="module_[character]"></a>

## [character] : <code>contexts</code>
The character context controls the actively tracked character.

**Default**: <code>character.none</code>  
**Example**  
```js
import { CharacterContext, character } from "context/theme";
```

* [[character]](#module_[character]) : <code>contexts</code>
    * [.character](#module_[character].character)
    * [.CharacterContext](#module_[character].CharacterContext)

<a name="module_[character].character"></a>

### [character].character
The `character` object contains the currently-tracked character information.

**Kind**: static constant of [<code>[character]</code>](#module_[character])  
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
import { LocalisationContext, localisation } from "context/theme";
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
<a name="module_[AFComponent]"></a>

## [AFComponent] : <code>js</code>
The `<AFComponent />` utility component wraps other components with themeing and localisation support.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.style | <code>Object</code> | Style rules to apply on the wrapped component. |

<a name="module_[Language]"></a>

## [Language] : <code>js/components</code>
The `<Language />` component displays language selection controls.

**Example**  
```js
<Language />
```
<a name="module_[Panel]"></a>

## [Panel] : <code>js/components</code>
The `<Panel />` component displays a panel (box) on the page for content to sit within.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.children | <code>Component</code> | Content to be rendered within the panel. |

**Example**  
```js
<Panel>Foobar</Panel>
```
<a name="module_[Progress]"></a>

## [Progress] : <code>js/components</code>
The `<Progress />` component displays a progress bar with caption, value, total and percentage.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.caption | <code>string</code> | Text to display within the `figcaption` element and `aria-valuetext` arribute. |
| props.total | <code>Number</code> | The maximum value for the progress bar, also used within `aria-valuemax`. |
| props.value | <code>Number</code> | The current value for the progress bar, also used within `aria-valuenow`. |

**Example**  
```js
<Progress caption="Minions" value="5" total="220" />
```
<a name="module_[Container]"></a>

## [Container] : <code>js/layout</code>
The `<Container />` layout component wraps each page.

<a name="module_[Navigation]"></a>

## [Navigation] : <code>js/layout</code>
The `<Navigation />` layout component wraps the sidebar.

<a name="module_[Home]"></a>

## [Home] : <code>js/pages</code>
The `<Home />` page component controls https://apkallufalls.com (route: `'/'`).

