The `ui-select-choices` is what the `option` tag is to a html `select` element.

### Attributes
| option | description | value |
|---|---|---|
| `group-by` | Group by expression | expression |
| `group-filter` | Filter or sort groups by expression | expression |
| `ui-disable-choice` | Disable a choice in the menu | expression |
| `refresh` | Define the source of data as an $http request. ui-select will call this function as dictated by the `refresh-delay` setting | string ($scope function) |
| `refresh-delay` | If the `refresh` attribute is present, the default delay is set to `1000`.  Override this by setting a millisecond value via `refresh-delay` | integer |
| `minimum-input-length` | Minimum characters required before `refresh` function is triggered | integer (or interpolated expression: `{{ 1 + 1 }}`) | 
| `position` | Define where the dropdown should open. 'up', 'down' or 'auto'. | string |
| `repeat` | Specify the list of items to provide as choices. Syntax is similar to `ngRepeat`. | expression
| `ui-select-header-group-selectable` | Allow user to select header with group-by. The expression is used to disable or enable this feature | expression |

### Events
| event name | description | example |
|---|---|---|
| `on-highlight` | Occurs when an item was hovered on | `on-highlight="showPreview(myValue)"` |

### Example: Disable Choices

In case that you need to disable certain options so that they can't be selected by the interface, you can use `ui-disable-choice` attribute to pass an expression to check.  For example:

```html
    <ui-select ng-model="model.people">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices ui-disable-choice="value.status == 'inactive'" repeat="value.id as value in options | filter: $select.search">
            <div ng-bind-html="value.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

### Example: Grouping

On the `ui-select-choices` define the `group-by` property with a string or a function; example: `group-by="someGroupFn"` or `group-by="'countries'"`. A variable attribute is not valid here, e.g. `group-by="myType"`.

The function usage might look something like:

```js
    $scope.someGroupFn = function (item){
        if (item.name[0] >= 'A' && item.name[0] <= 'M')
                return 'From A - M';
        
        if (item.name[0] >= 'N' && item.name[0] <= 'Z')
            return 'From N - Z';
    };
```

The function is automatically invoked with the item you are iterating over. Items could be in the same group twice if the function matches them twice.

To sort the groups, the items must already be in order with each type in the proper index given their sort attribute.

If you have 2 groups that are represented in 2 different lists you must merge the lists in order to group them.  For example: I have a list of cities and countries that are seperated by the list type.  You would have to merge the 2 lists and then use the group by option to filter them.

```js
    $scope.displayValues = function() {
        return cities.concat(countries);
    }();
    
    $scope.groupFind = function(item){
        return cities.indexOf(item) > -1 ? "City" : "Country";
    };
```

```html
    <ui-select ng-model="animal.names">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices group-by="groupFind" repeat="value.id as value in animals | filter: $select.search">
            <div ng-bind-html="value.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

If you want some options to have groups and other not, return `undefined` as the group in the callback and those will be inserted without a group.  For example:

```js
    $scope.groupFind = function(item){
        return cities.indexOf(item) > -1 ? "City" : undefined;
    };
```

If you want to allow user to select a group, you can add the ui-select-header-group-selectable directive. For example:

```html
    <ui-select ng-model="animal.names">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices ui-select-header-group-selectable group-by="groupFind" repeat="value.id as value in animals | filter: $select.search">
            <div ng-bind-html="value.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

### Example: Binding Single Property

In the `repeat` of the `ui-select-choices` identify the property you are wanting to bind to; `repeat="item.id as item in cards">`.  

Example usage:
```html
    <ui-select ng-model="card.id">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices repeat="item.id as item in reports | filter: $select.search">
            <div ng-bind-html="item.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

### Example: Repeat Filters

If you are using the `ui-select-match` search feature, its important to realize that most examples do generic property matching on the object you're iterating.  So given an example like:

```html
    <ui-select ng-model="card.id">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices repeat="item.id as item in users | filter: $select.search">
            <div ng-bind-html="item.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

and the `users` object looks like:

```js
    [{ name: 'Dan', description: 'Dan is a winner', id: 1234 }]
```

if you type 'winner' it will pull up 'Dan' but NOT highlight anything since we highlight the display name.  You can easily restrict the filter by adding a property name to the filter like:

```html
    <ui-select ng-model="card.id">
        <ui-select-match>{{$select.selected.name}}</ui-select-match>
        <ui-select-choices repeat="item.id as item in users | filter: { name: $select.search }">
            <div ng-bind-html="item.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>
```

The [demo page](http://plnkr.co/edit/5pWPKGSQfGejuEflDNuF?p=preview) has a good example for OR filters or check out the [Angular Documentation](https://docs.angularjs.org/api/ng/filter/filter) for more info on filters.

## Example: Iterating over objects

Use objects for iterating instead of Arrays.  [Demo here](http://plnkr.co/edit/9DsLidTZR7RJDEq6PW0H?p=preview)

```html
    <ui-select ng-model="person.selectedValue" title="Choose a person">
      <ui-select-match placeholder="Select a person in the list or search his name/age...">{{$select.selected.value.name}}</ui-select-match>
      <ui-select-choices repeat="person.value as (key, person) in peopleObj | filter: {'value':$select.search}">
        <div ng-bind-html="person.value.name | highlight: $select.search"></div>
        <small>
          email: {{person.value.email}}
          age: <span ng-bind-html="''+person.value.age | highlight: $select.search"></span>
        </small>
      </ui-select-choices>
    </ui-select>
```

### Using single property for binding

```html
    <ui-select ng-model="person.selectedSingle" title="Choose a person">
      <ui-select-match placeholder="Select a person in the list or search his name/age...">{{$select.selected.value.name}}</ui-select-match>
      <ui-select-choices repeat="person.value.name as (key, person) in peopleObj | filter: {'value':$select.search}">
        <div ng-bind-html="person.value.name | highlight: $select.search"></div>
        <small>
          email: {{person.value.email}}
          age: <span ng-bind-html="''+person.value.age | highlight: $select.search"></span>
        </small>
      </ui-select-choices>
    </ui-select>
```

### Using key for binding

```html
    <ui-select ng-model="person.selectedSingleKey" title="Choose a person">
      <ui-select-match placeholder="Select a person in the list or search his name/age...">{{$select.selected.value.name}}</ui-select-match>
      <ui-select-choices repeat="person.key as (key, person) in peopleObj | filter: {'value':$select.search}">
        <div ng-bind-html="person.value.name | highlight: $select.search"></div>
        <small>
          email: {{person.value.email}}
          age: <span ng-bind-html="''+person.value.age | highlight: $select.search"></span>
        </small>
      </ui-select-choices>
    </ui-select>
```

### WARNING: `select as` and `track by`

Note that using `select as` and `track by` may result in a broken `ui-select`. Only one or other should be used. 

The following is copied from angular's ngOptions documentation and applies to `ui-select-choices` `repeat` attrbute.
>###`select` **`as`** and **`track by`**

>  Be careful when using `select` **`as`** and **`track by`** in the same expression.
>  
>  Given this array of items on the $scope:
>  
>  ```js
>  $scope.items = [{
>    id: 1,
>    label: 'aLabel',
>    subItem: { name: 'aSubItem' }
>  }, {
>    id: 2,
>    label: 'bLabel',
>    subItem: { name: 'bSubItem' }
>  }];
>   ```
>  
>  This will work:
>  
>  ```html
>  <select ng-options="item as item.label for item in items track by item.id" ng-model="selected"></select>
>  ```
>  ```js
>  $scope.selected = $scope.items[0];
>  ```
>  
>  but this will not work:
>  
>  ```html
>  <select ng-options="item.subItem as item.label for item in items track by item.id" ng-model="selected"></select>
>  ```
>  ```js
>  $scope.selected = $scope.items[0].subItem;
>  ```
>  
>  In both examples, the **`track by`** expression is applied successfully to each `item` in the
>  `items` array. Because the selected option has been set programmatically in the controller, the
>  **`track by`** expression is also applied to the `ngModel` value. In the first example, the
>  `ngModel` value is `items[0]` and the **`track by`** expression evaluates to `items[0].id` with
>  no issue. In the second example, the `ngModel` value is `items[0].subItem` and the **`track by`**
>  expression evaluates to `items[0].subItem.id` (which is undefined). As a result, the model value
>  is not matched against any `<option>` and the `<select>` appears as having no selected value.