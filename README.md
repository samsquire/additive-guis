# additive-guis

GUIs could be buildable through declarative tuples where each statement changes the layout of an application.

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

![example-layout](additive-gui-1.png)

