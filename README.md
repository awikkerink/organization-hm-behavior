# d2l-organization-hm-behavior

A [Polymer](https://www.polymer-project.org/1.0/)-based web component D2L behavior element.

For further information on this and other D2L UI components, see the docs at [ui.valence.d2l.com](http://ui.valence.d2l.com/).

## Installation

`d2l-organization-hm-behavior` can be installed from Bower:
```shell
bower install git://github.com/Brightspace/organization-hm-behavior.git#v0.0.1
```

## Usage
```js
behaviors: [
	window.D2L.Hypermedia.OrganizationHMBehavior
],
```

## Running tests locally in Windows

Tests in this repo use web-component-tester (WCT). Currently WCT has an issue in Windows with tests taking about a minute to start.  A workaround is to set two environment variables for Launchpad (a library used by WCT).  These help bypass browser searching which is what causes the delay.  For example:
LAUNCHPAD_BROWSERS=CHROME
LAUNCHPAD_CHROME-'C:\Program Files (x86)\Google\Chrome\Application'

## Coding styles

See the [Best Practices & Style Guide](https://github.com/Brightspace/valence-ui-docs/wiki/Best-Practices-&-Style-Guide) for information on naming conventions, plus information about the [EditorConfig](http://editorconfig.org) rules used in this repo.
