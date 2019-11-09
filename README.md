# additive-guis

GUIs could be buildable through declarative tuples where each statement changes the layout of an application.

# Example

You have this set of predicates - a bit like N3 tuples.

```
predicates = [
    "LoginButton centered screen",
    "bottomLinks below pagebody",
    "pagebody centered screen",
    "HeroText centered screen",
    "sidemenu leftOf HeroText",
    "HeroText leftOf LoginBox",
    "HeroText below LoginButton",
    "Something rightOf LoginBox",
    "Something above LoginBox",
    "LoginBox leftOf LoginButton",
    "LoginButton rightOf LoginBox",
    "LoginBox above LoginButton",
    "pagebody below HeroText",
    "pagebody under HeroText"
]
```

This should produce a layout a bit like this. The centered predicate doesn't quite work just yet.

![example-layout](additive-gui-1.png)

This prototype example (layout/layouter.py) uses constraint programming library ORTools to try place things into a Bootstrap grid. It's not very good just yet.

# The dream - Twitter for building GUIs

I want GUIs to be manipulatable by lots of people via predicates.
 * Each predicate changes the group ownership of each widget on the screen.
 * GUIs are produced through mapping and filtering collections. (Like react GUIs)
 * If someone weants a piece of data to appear next to another piece of data, from a different collection, there has to be some kind of join on the UI generation for those two pieces of data.
