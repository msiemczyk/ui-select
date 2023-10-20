### `uis-open-close`
> available in 0.19.0

The `uis-open-close` directive allows a callback to be defined that is called whenever the dropdown is opened or closed.

Callback is passed an `isOpen` parameter which is set to `true` if the dropdown has been opened, otherwise `false`.

### Attribute

| option | description | example |
|---|---|---|
| `uis-open-close` | called whenever the dropdown is opened or closed | `uis-open-close="onOpenClose(isOpen)"` |
