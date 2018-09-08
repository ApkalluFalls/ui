## Modules

<dl>
<dt><a href="#module_[AFComponent]">[AFComponent]</a> : <code>js</code></dt>
<dd><p>The <code>&lt;AFComponent /&gt;</code> utility component wraps other components with themeing and localisation support.</p>
</dd>
<dt><a href="#module_[Language]">[Language]</a> : <code>components/common</code></dt>
<dd><p>The <code>&lt;Language /&gt;</code> component displays language selection controls.</p>
</dd>
<dt><a href="#module_[Panel]">[Panel]</a> : <code>components/common</code></dt>
<dd><p>The <code>&lt;Panel /&gt;</code> component displays a panel (box) on the page for content to sit within.</p>
</dd>
<dt><a href="#module_[Popup]">[Popup]</a> : <code>components/common</code></dt>
<dd><p>The <code>&lt;Popup /&gt;</code> component displays a control to open a popup, which when clicked reveals the popup on the page.</p>
</dd>
<dt><a href="#module_[Progress]">[Progress]</a> : <code>components/common</code></dt>
<dd><p>The <code>&lt;Progress /&gt;</code> component displays a progress bar with caption, value, total and percentage.</p>
</dd>
<dt><a href="#module_[Container]">[Container]</a> : <code>components/layout</code></dt>
<dd><p>The <code>&lt;Container /&gt;</code> layout component wraps each page.</p>
</dd>
<dt><a href="#module_[Navigation]">[Navigation]</a> : <code>components/layout</code></dt>
<dd><p>The <code>&lt;Navigation /&gt;</code> layout component wraps the sidebar.</p>
</dd>
<dt><a href="#module_[Home]">[Home]</a> : <code>components/pages</code></dt>
<dd><p>The <code>&lt;Home /&gt;</code> page component controls <a href="https://apkallufalls.com">https://apkallufalls.com</a> (route: <code>&#39;/&#39;</code>).</p>
</dd>
</dl>

<a name="module_[AFComponent]"></a>

## [AFComponent] : <code>js</code>
The `<AFComponent />` utility component wraps other components with themeing and localisation support.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.style | <code>Object</code> | Style rules to apply on the wrapped component. |

<a name="module_[Language]"></a>

## [Language] : <code>components/common</code>
The `<Language />` component displays language selection controls.

**Example**  
```js
<Language />
```
<a name="module_[Panel]"></a>

## [Panel] : <code>components/common</code>
The `<Panel />` component displays a panel (box) on the page for content to sit within.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.children | <code>Component</code> | Content to be rendered within the panel. |

**Example**  
```js
<Panel>Foobar</Panel>
```
<a name="module_[Popup]"></a>

## [Popup] : <code>components/common</code>
The `<Popup />` component displays a control to open a popup, which when clicked reveals the popup on the page.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| props.children | <code>Component</code> | Content to be rendered within the popup. |
| props.openerCaption | <code>string</code> | Clickable text to be displayed for opening the popup. This is also used within accessibility attribute `aria-labelledby`. |
| props.openerDescription | <code>string</code> | Title text to be displayed when hovering over the opener. This is also used within accessibility attribute `aria-describedby`. |

**Example**  
```js
<Popup openerCaption="Open" openerDescription="Opens a popup">Foobar</Popup>
```
<a name="module_[Progress]"></a>

## [Progress] : <code>components/common</code>
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

## [Container] : <code>components/layout</code>
The `<Container />` layout component wraps each page.

<a name="module_[Navigation]"></a>

## [Navigation] : <code>components/layout</code>
The `<Navigation />` layout component wraps the sidebar.

<a name="module_[Home]"></a>

## [Home] : <code>components/pages</code>
The `<Home />` page component controls https://apkallufalls.com (route: `'/'`).

