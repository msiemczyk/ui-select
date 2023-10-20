### Requirements

- Angular >=1.2.18
- ngSanitize module
- jQuery ( optional for older browser support )
- Bootstrap (v3)/Select2/Selectize CSS as appropriate

Browser compatibility starting at Internet Explorer 8 and Firefox 3.6.


### Installing

There are multiple ways of adding the required files:

1) Clone, build the repository, and include the files

2) Link to a [CDN](https://cdnjs.com/libraries/angular-ui-select)

3) Install via Bower and include files

    bower install angular-ui-select
    
reference the scripts 

- `bower_components/angular-ui-select/dist/select.js`
- `bower_components/angular-ui-select/dist/select.css` 

---

For IE8 / FF3.6 support you must include:

      <!--
        IE8 support, see AngularJS Internet Explorer Compatibility http://docs.angularjs.org/guide/ie
        For Firefox 3.6, you will also need to include jQuery and ECMAScript 5 shim
      -->
      <!--[if lt IE 9]>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
        <script>
          document.createElement('ui-select');
          document.createElement('ui-select-match');
          document.createElement('ui-select-choices');
        </script>
      <![endif]-->

For RequireJS, your setup might look like:

    require.config({
        paths: {
            'angular': 'bower_components/angular/angular',
            'angular-ui-select': 'bower_components/angular-ui-select/dist/select'
        },
        shim: {
            'angular-ui-select': ['angular']
        }
    });


Include the ui.select and ngSanitize modules in your application

    var module = angular.module('myapp', ['ui.select', 'ngSanitize']);

### Basic example
The most basic use of the directive in html ([plunker](http://plnkr.co/edit/K9alAMAzvUqCY7Or8RwY?p=preview))
```html
<ui-select ng-model="selected.value">
    <ui-select-match>
        <span ng-bind="$select.selected.name"></span>
    </ui-select-match>
    <ui-select-choices repeat="item in (itemArray | filter: $select.search) track by item.id">
        <span ng-bind="item.name"></span>
    </ui-select-choices>
</ui-select>
```
With a related angular controller:
```javascript
angular.module('app')
.controller('ctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };
}]);
```

_Note: Including additional stylesheets is required, depending on which theme is used, in order to have ui-select render as a dropdown box. The examples show which resources to use._