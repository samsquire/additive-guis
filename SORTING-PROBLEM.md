This is how I sort widget Xs and Ys to solve an equation like:

widgetA.x < widgetB.x < widgetC.x

I've got a list of items that I want to keep sorted according to a few rules.

addRule(itemA, itemB)

creates a list in the following order:

itemA, itemB

addRule(itemA, itemM)

should add the itemM to the middle of the list, because itemA is already at the beginning

itemA, itemM, itemB

addRule(itemC, itemA)

itemC, itemA, itemM, itemB

addRule(itemB, itemM)

itemC, itemA, itemB, itemM
