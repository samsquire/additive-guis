# additive-guis

GUIs could be buildable through declarative tuples where each statement changes the layout of an application. This is an idea inspired by RDF N3 tuples and [Bloom lang](http://bloom-lang.net/).

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

**What you say is what you get** - you make statements about the output of layout engine that you want to be true. The layout engine tries to sastisfy all your rules.
* I want GUIs to be manipulatable by lots of people via predicates.
 * Each predicate changes the tree where rendered HTML will be placed.
 * Widget HTML is produced through mapping and filtering collections as per a React GUI.
 * **Codeless layout** Stating facts about the layout means you do not need to manually position elements into a layout with code.
 * **Predicate join** If someone wants a one piece of data to appear next to another piece of data, from a different collection, there has to be some kind of join on the UI generation code for those two pieces of data. This is because you are generating two child widgets, each from a mapping.
 
 This is an example, you have a form object with fields inside and you have an errors object with errors for each field. To join them together, you could use a predicate like this:
 ```
 predicates = [
    "errors.lastName above form.fields.lastName",  
 ]
 From the errors code you should receive the form.fields.lastName as an input. And from the fields object, you should be able to access the current error. It's cyclical.
 ```
