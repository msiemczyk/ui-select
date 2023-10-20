The `ui-select-match` is the select value(s) directive.

| option | description | value |
|---|---|---|
| `placeholder` | Default text when no selection active | string |
| `allow-clear` | Allows you to clear the current value | boolean |
| `ui-lock-choice ` | Lock a choice in the multi-select selected options | expression |

### Example: Lock Selected Choices

In case that you need to lock certain option that is selected in a multiselect so that they can't be removed by the interface, you can use `ui-lock-choice` attribute to pass an expression to check.  For example:

    <ui-select ng-model="model.people">
        <ui-select-match ui-lock-choice="$item.status == 'inactive'">{{$item.name}}</ui-select-match>
        <ui-select-choices  repeat="value.id as value in options | filter: $select.search">
            <div ng-bind-html="value.name | highlight: $select.search"></div>
        </ui-select-choices>
    </ui-select>

### Example: Placeholder

On the `ui-select-match` element define a placeholder attribute like:

    <ui-select-match placeholder="Select a report">
        {{$select.selected.name}}
    </ui-select-match>
    