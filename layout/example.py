xs = dict([(0, ['usernameSpace', 'sidemenu', 'bottomLinks']), (1, ['HeroText', 'pagebody']), (2, ['UsernameBox']), (3, ['PasswordBox', 'UserArea', 'LoginButton'])])
ys = dict([(0, ['UserArea', 'sidemenu']), (1, ['PasswordBox', 'UsernameBox', 'usernameSpace']), (2, ['LoginButton']), (3, ['HeroText']), (4, ['pagebody']), (5, ['bottomLinks'])])

centered = [
    "HeroText", "pagebody"
]

sizes = {
    "pagebody": 8,
    "LoginBox": 2,
    "PasswordBox": 2
}

def find_column_position(yvalue, xitems):
	for xposition, xvalues in xitems:
		for xvalue in xvalues:
			if yvalue == xvalue:
				return xposition

print("<div class=\"container\">")
for yposition, yvalues in (sorted(ys.items())):
	centered_class = ""
	for yvalue in yvalues:
		if yvalue in centered:
			centered_class = "justify-content-center"
	print("<div class=\"row d-flex {}\">".format(centered_class))
	columns = []
	for yvalue in yvalues:
		xposition = find_column_position(yvalue, sorted(xs.items()))
		columns.append((xposition, yvalue))
	columns = sorted(columns, key=lambda x: x[0])
	last = 0
	for xposition, item in columns:
		for empties in range(last, xposition - 1):
		  
				print("<div class=\"col filler col-md-{}\">".format(xposition - 1))
				print("</div>")
		last = last + xposition
	
		print("<div class=\"col col-md-{}\">".format(sizes.get(item)))
		print(item)
		print("</div>")
		last = last + int(sizes.get(item, 1))
		
	print("</div>")
	
print("</div>")