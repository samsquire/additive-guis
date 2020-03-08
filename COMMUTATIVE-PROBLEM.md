
# commutative-problem

Imagine you have a propositional language that looks like this:

```
thingA leftOf thingB
thingC rightOf thingB
thingD above thingA
```

How do you generate X and Y coordinates of this language?
How do you do so commutatively?

You run the inequality algorithm documented here.

Run this algorithm as each rule is encountered, then run it agains before evaluating Xs and Ys.
