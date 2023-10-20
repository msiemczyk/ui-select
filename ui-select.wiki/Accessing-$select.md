Many requests for custom features can be satisfied by accessing the `uiSelectController` in your own custom directive. 

To do this, create a directive of your own which `require`s the `uiSelect` directive, as shown below:

```js
myModule.directive('myUiSelect', function() {
  return {
    require: 'uiSelect',
    link: function(scope, element, attrs, $select) {
      
    }
  };
});
```

Using it as illustrated below:
```
<ui-select my-ui-select ng-model="person.selected">
  <ui-select-match> ... </ui-select-match>
  <ui-select-choices> ... </ui-select-choices>
</ui-select>
```

Refer to the source code of [`uiSelectController`](https://github.com/angular-ui/ui-select/blob/master/src/uiSelectController.js) to see what is functionality is available through this API. 

If you feel your directive may be useful to others, feel free to submit it is as a Pull Request for consideration for inclusion in the library.

### Examples
1. [Select active item on Blur](https://github.com/angular-ui/ui-select/issues/1544#issuecomment-204028310)
2. [Placeholder Always Visible](https://github.com/angular-ui/ui-select/pull/1433#issuecomment-225011882)