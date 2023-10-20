### IMPORTANT: This is currently NOT merged into master 

***


Use `ui-select-header` to add a header to the top of the dropdown list.

Use `ui-select-footer` to add a footer to the bottom of the dropdown list.

Add one, or both as a child of `ui-select`.

### Example: Basic Usage

```html
<ui-select>
  <ui-select-match></ui-select-match>
  <ui-select-header>Top of the list!</ui-select-header>
  <ui-select-choices><ui-select-choices>
  <ui-select-footer>Bottom of the list.</ui-select-footer>
</ui-select>
```