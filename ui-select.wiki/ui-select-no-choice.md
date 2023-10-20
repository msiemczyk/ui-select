### `ui-select-no-choice`

This directive was created in [PR #1011][pr] and included in v. 0.17.1

The `ui-select-no-choice` directive must be an immediate child of the `ui-select` directive. It displays its contents when no matches are found.

This directive work only with bootstrap theme.

Example usage:

```html
<ui-select ng-model="model.selected">
  <ui-select-match placeholder="Pick one...">{{$select.selected.name}}</ui-select-match>
  <ui-select-choices repeat="person in people | filter: $select.search track by person.name">
    <div ng-bind-html="person.name | highlight: $select.search"></div>
  </ui-select-choices>
  <ui-select-no-choice>
    Dang!  We couldn't find any choices...
  </ui-select-no-choice>
</ui-select>
```

[pr]: https://github.com/angular-ui/ui-select/pull/1011