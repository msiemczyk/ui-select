## Common Issues

### ng-model not working with a simple variable on $scope

You cannot write:
```HTML
<ui-select ng-model="item"> <!-- Wrong -->
  [...]
</ui-select>
```

You need to write:
```HTML
<ui-select ng-model="item.selected"> <!-- Correct -->
  [...]
</ui-select>
```

Or:
```HTML
<ui-select ng-model="$parent.item"> <!-- Hack -->
  [...]
</ui-select>
```

For more explanations, check [ui-select #18](https://github.com/angular-ui/ui-select/issues/18) and [angular.js #6199](https://github.com/angular/angular.js/issues/6199).

### ng-bind-html gives me "Error: [$sce:unsafe] Attempting to use an unsafe value in a safe context"

You need to use module [ngSanitize](http://docs.angularjs.org/api/ngSanitize) (recommended) or [$sce](http://docs.angularjs.org/api/ng/service/$sce):

```JavaScript
$scope.trustAsHtml = function(value) {
  return $sce.trustAsHtml(value);
};
```

```HTML
<div ng-bind-html="trustAsHtml((item | highlight: $select.search))"></div>
```

### I get "TypeError: Object [...] has no method 'indexOf' at htmlParser"

You are using ng-bind-html with a number:
```HTML
<div ng-bind-html="person.age | highlight: $select.search"></div>
```

You should write instead:
```HTML
<div ng-bind-html="''+person.age | highlight: $select.search"></div>
```

Or:
```HTML
<div ng-bind-html="person.age.toString() | highlight: $select.search"></div>
```

Or:
```HTML
<div ng-bind-html="String(person.age) | highlight: $select.search"></div>
```

### How do I stop the drop-down from getting cut off by the bottom of my Bootstrap modal / container with `overflow: hidden`?

Add `append-to-body="true"` to the `ui-select` tag. See the [`ui-select` directive wiki page](https://github.com/angular-ui/ui-select/wiki/ui-select).

### Filter highlighter ruin words in some languages such as Persian and arabic

You can use zwjHighlighter from following url: https://github.com/deadmann/AngularJSComponent
It provided for persian language, and you may need to add your own language letters (only those who should stick to next letter) to the list of regex.
```JavaScript
function isZeroWidthJoiner(first, second){
    //Get First Character and match Whitespaces
    if(second.substr(0,1).match(/\s+/))
      return false;

    //TODO: MODIFY HERE
    return !!first.substr(first.length>0?first.length-1:0).match(/[يئبپتجچحخسشصضطظعغفقکگلمنهی]/);
  }
```

### Highlight filter doesn't support special characters (like accents)

Here is a gist with a highlight filter with accent support: https://gist.github.com/juannorris/fa32fb015acd1496c6dfd55b5359a1f9

Which you can then use as:

```HTML
<div ng-bind-html="(name | customHighlight: $select.search) | trustAsHTML"></div>
```

The filter should be able to support any special characters you need, by updating the `normalize` function accordingly.