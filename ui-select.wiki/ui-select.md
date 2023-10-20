The `ui-select` directive is the main directive of the module.

### Attributes

| option | description | value | default |
|---|---|---|---|
| `close-on-select` | Closes a multi-select upon selection | boolean | true |
| `append-to-body` | Appends the dropdown to the box vs relative | boolean | false |
| `ng-disabled` | Control is disabled | boolean | |
| `ng-model` | Object bound to control | string,number,array |  |
| `search-enabled` | Search is enabled | boolean | true |
| `reset-search-input` | Clears the search box after selecting an option | boolean | true |
| `theme` | Style of control, see themes section | string | 'bootstrap' |
| `tagging` | Enable tagging mode (add new items on the fly). Accepts a string which is a scope function. If your model is an array of objects, this string is **required**. The function will be passed the new item as a string and should return an object which is the transformed value to be pushed to the items array. | string ($scope function)| undefined |
| `tagging-label` | Set a label for tags that appear in the dropdown. Expects a string or `false`.  If `false`, then tagging happens without new items appearing in the dropdown. If empty or undeclared, `tagging-label` defaults to `(new)` | string, boolean | undefined |
| `tagging-tokens` | Specify keyboard keys that will trigger creation of a new tag. Multiple keys can be separated by a pipe `|`, `SPACE` is declaration for literal spacebar. (Defaults to `ENTER` and `,`) | string | ",\|ENTER" |
| `autofocus` | Automatically get focus when loaded. | boolean | false |
| `focus-on` | Define a scope event name to listen (e.g. focus-on='SomeEventName')| string | |
| `skip-focusser` | Set to true to skip the focusser after selecting an item. | boolean | false |
| `paste` | Accepts a string which is a scope function. The function will be passed the pasted text as a string.  | string ($scope function)| undefined |
| [`limit`](https://github.com/angular-ui/ui-select/pull/1110) | Limits the number of selected items in multiple select mode | integer | undefined |
| `spinner-enabled` | Sets the spinner enabled when using the refresh function | boolean| false |
| `spinner-class` | Sets the spinner css class. Default it will have its own style but can be overridden using this. | string | `glyphicon-refresh ui-select-spin` |
| `input-id` | Sets the input `id` so it can be `<label>led` | string | undefined


### Events

| event name | description | example |
|---|---|---|
| `on-remove` | Occurs when an item was removed | `on-remove="someFunction($item, $model)"` |
| `on-select` | Occurs when an item was selected | `on-select="someFunction($item, $model)"` |

### Global Config Options

You can set some options at the global level using the `uiSelectConfig` constant like:

```JavaScript
app.config(['uiSelectConfig', function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;
  uiSelectConfig.appendToBody = true;
}]);
```

### Themes

ui-select has the following themes:

- `bootstrap` inspired from the popular [bootstrap framework](http://getbootstrap.com/).
- `select2` inspired from [select2](http://ivaynberg.github.io/select2/) jQuery widget
- `selectize` inspired from [selectize](http://brianreavis.github.io/selectize.js/) jQuery widget

Themes can be set at a global level using a provider:

```JavaScript
var app = angular.module('app', ['ui.select']);

app.config(['uiSelectConfig', function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
}]);
```
    
or as a property on the select element like:

    <ui-select ng-model="animal.id" theme="bootstrap">
        ...
    </ui-select>

#### Themes: Bootstrap

If you already use Bootstrap, this theme will save you a lot of CSS code compared to the Select2 and Selectize themes.

Bower:
- `bower install bootstrap`
- `<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">`
- Or the [LESS](http://lesscss.org/) version: `@import "bower_components/bootstrap/less/bootstrap.less";`

[Bootstrap CDN](http://www.bootstrapcdn.com/):
- `<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.css">`

Configuration:
```JavaScript
app.config(['uiSelectConfig', function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
}]);
```

#### Themes: Select2

Bower:
- `bower install select2#~3.4.5`
- `<link rel="stylesheet" href="bower_components/select2/select2.css">`

[cdnjs](http://cdnjs.com/):
- `<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.5/select2.css">`

Configuration:
```JavaScript
app.config(['uiSelectConfig', function(uiSelectConfig) {
  uiSelectConfig.theme = 'select2';
}]);
```

#### Themes: Selectize

Bower:
- `bower install selectize#~0.8.5`
- `<link rel="stylesheet" href="bower_components/selectize/dist/css/selectize.default.css">`
- Or the [LESS](http://lesscss.org/) version: `@import "bower_components/selectize/dist/less/selectize.default.less";`

[cdnjs](http://cdnjs.com/):
- `<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.8.5/css/selectize.default.css">`

Configuration:
```JavaScript
app.config(['uiSelectConfig', function(uiSelectConfig) {
  uiSelectConfig.theme = 'selectize';
}]);
```
    
### Examples: Multiple Selection

Multi selection allows the user to select multiple values.  To enable it add the the `multiple` attribute to your select element; example:

     <ui-select multiple ng-model="animal.id">
        ...
     </ui-select>
     
in the `ui-select-match` element you need to change your naming to match your selected item like:

    <ui-select-match placeholder="Select person...">
        {{$item.name}} &lt;{{$item.email}}&gt;
    </ui-select-match>

note the `$item` usage instead of `$select.selected.name` like in a our single item implementation.

###### Multi-select with complex objects

If you wish to do multi-selection with complex object types, you can use the `track-by` expression to define the primary key.  Example:

```JavaScript
model.selected = { 
  name: 'Samantha',  
  email: 'something different than array source',  
  group: 'bar', 
  age: 30 
};
```

with the following ui-select markup:

	<ui-select ng-model="model.selected">
		<ui-select-match placeholder="Pick one...">{{$select.selected.name}}</ui-select-match>
		<ui-select-choices repeat="person in people | filter: $select.search track by person.name">
			<div ng-bind-html="person.name | highlight: $select.search"></div>
			<div ng-bind-html="person.email | highlight: $select.search"></div>
		</ui-select-choices>
	</ui-select>'

For more information, see [the PR](https://github.com/angular-ui/ui-select/pull/256).


### Examples: Limits on Multiple Selection

You can specify a limit on the number of tags allowed in a multiple selection tagging list using the `limit` attribute.

###### No more than 3 tags allowed to be chosen

    <ui-select multiple limit="3" tagging ng-model="LimitedResult.selectedItems">
        <ui-select-match placeholder="Select up to 3 items">{{$item}}</ui-select-match>
        <ui-select-choices repeat="thisItem in listOfItems | filter:$select.search">
            {{thisItem}}
        </ui-select-choices>
    </ui-select>


### Examples: Disabling Instead of Removing Selected Items in Multiple Selection

By default, a multiple selection list will remove items from the dropdown when they are
selected. Available in version v0.17.2 or greater, setting the attribute `remove-selected="false"`
on multiple selection will _disable_ these items rather than remove them:

<img width="239" alt="remove-selected example screen shot" src="https://cloud.githubusercontent.com/assets/382242/14624543/8759f38a-0590-11e6-9a02-a87e15263f44.png">

In the image above, `id` would have been removed from the dropdown with the default behavior.
With `remove-selected="false"`, it is still in the dropdown, but disabled because it is already
selected.


### Examples: Tagging

###### Simple String Tags with Custom Tag Label

    <ui-select multiple tagging tagging-label="(custom 'new' label)" ng-model="multipleDemo.colors">
	<ui-select-match placeholder="Select colors...">{{$item}}</ui-select-match>
	<ui-select-choices repeat="color in availableColors | filter:$select.search">
	    {{color}}
	</ui-select-choices>
    </ui-select>

Feel free to refer to this example on Plnkr for more options: http://plnkr.co/edit/m1SQXUxftBLQtitng1f0

### Examples: Async

    <ui-select-choices repeat="address in addresses track by $index"
             refresh="refreshAddresses($select.search)"
             refresh-delay="0">
    </ui-select-choices>

```JavaScript
function MyCtrl(){
  $scope.addresses = [];
  $scope.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
      .then(function(response) {
        $scope.addresses = response.data.results
      });
  };
}
```

**Note**: The `$select.search` is the search input value.

### Examples: Set focus

    <ui-select focus-on='SetFocus'>
	...
	</ui-select>
	
	<button ng-click="setInputFocus()">Set Focus</button>
	
```JavaScript
function MyCtrl(){
  $scope.setInputFocus = function(){
	$scope.$broadcast('SetFocus');
  }
} 
```