# additive-guis

## declarative layouts

GUIs could be buildable through declarative tuples where each statement changes the layout of an application. This is an idea inspired by RDF N3 tuples and [Bloom lang](http://bloom-lang.net/). I call these additive Guis because the  code that generates the UI is a monotonically increasing set of statements that can arrive in any order and still produce a sensible, valid output.

Each rule is relative to every other rule. The rules together produce an emergent layout.

# Example

You have this set of predicates - a bit like N3 tuples - of how your page should be put together and behave. This is a port of the [Bootstrap's Blog example](https://getbootstrap.com/docs/4.0/examples/blog/) as an additive GUI.

blog_post.json
```

```

This prototype example (layout/layouter.py) uses constraint programming library ORTools to try place things into a Bootstrap grid.

```
python layouter.py blog_post.json
```

And we can produce the following HTML page from the above predicates.

![additive-gui-1.png](additive-gui-1.png)

# The dream - Build GUIs with microblogging (or twitter tweets)

**What you say is what you get** - you make statements about the output of layout engine that you want to be true. The layout engine tries to sastisfy all your rules.
* I want GUIs to be manipulatable by lots of people via predicates.
 * Each predicate changes the tree where rendered HTML will be placed.
 * Widget HTML is produced through mapping and filtering collections as per a React GUI.
 * **Codeless layout** Stating facts about the layout means you do not need to manually position elements into a layout with code.
 * **Predicate join** If someone wants a one piece of data to appear next to another piece of data, from a different collection, there has to be some kind of join on the UI generation code for those two pieces of data. This is because you are generating two child widgets, each from their respect a mapping of a collection.
 * **Modifying running GUIs and creating new features with statements** It should be possible to add an expression to a running GUI to extend it in ways that the author did not anticipate. This can be done with an interactive predicate join. 
 
 # Interactive predicate join
 
 
 
 # Example of a predicate join
 
 This is an example, you have a form object with fields inside and you have an errors object with errors for each field. To join them together, you could use a predicate like this:
 

 ```
 predicates = [
    "errors.lastName above form.fields.lastName",
    "errors.lastName on:click my.form.fields.lastName.focus()
 ]
 ```
From the errors predicates you have available the form.fields.lastName context from errors.lastName predicates due to the above predicate. And from the fields object, you should be able to access the current error. It's cyclical. How errors.lastName and form.fields.lastName renders is dependent on that react widget.



# Predicate join

You have two independent collections that you are mapping over to produce HTML with JSX, as you do in a React render method. Now I want to introduce a new element into the JSX output. If you have a predicate that states it must appear within the output of an existing mapped collection. How do you implement this?


# What I want to see in the future with additive guis

## Customizing your desktop

Adding an icon to your desktop operating system tray should be really simple.

```
predicates = [
    "icon inside systemTray",
    "icon on:click menu.show()",
    "menu is hidden",
    "openGithub inside menu"
]
```

## Adding icon overlays to icons in file manager

```
predicates = [
   "overlayDirtyIcon is image(unchecked_changes.png)"
   "overlayDirtyIcon over file{dirty==true}"	
]
```

## Extending context menus

```
{
	"predicates": [
		"outsource is menuItem",
		"outsource inside fileContextMenu",
		"outsource on:click exec(\"outsource\", this)"
	]
}
```
