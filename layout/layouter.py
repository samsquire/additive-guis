import collections
from ortools.sat.python import cp_model
from pprint import pprint

predicates = [
    "LoginButton hasSize 2",
    "pagebody hasSize 8",
    "UsernameBox hasSize 2",
    "PasswordBox hasSize 2",
    "UsernameBox below UserArea",
	"PasswordBox rightOf UsernameBox",
    "PasswordBox sameRowAs UsernameBox",
    "UsernameBox withinSpace:1 PasswordBox",
    "UsernameBox leftOf UserArea",
    "UsernameBox withinSpace:1 UserArea",
    "LoginButton below PasswordBox",
    "bottomLinks below pagebody",
    "pagebody centered screen",
    "HeroText centered screen", 
    "sidemenu leftOf HeroText",
    "HeroText leftOf UsernameBox",
    "HeroText below LoginButton",
    "PasswordBox under UserArea",
    "UserArea above UsernameBox",
    "LoginButton under PasswordBox",
    "pagebody below HeroText",
    "pagebody under HeroText"
]

def layout_page(predicates):
    """Schedule elements on a page"""
    model = cp_model.CpModel()
    
    predicate_vars = {}
    placed_item = collections.namedtuple('task_run', 'start')
    
    objects = {}
    heights = {}
    centered = []
    containers = {}
    sizes = {}
    
    for predicate in predicates:
        subject, operand, object = predicate.split(" ")
        
        if operand == "inside":
            this_container = containers.get(object, [])
            this_container.append(subject)
            containers[object] = this_container
        if operand == "hasSize":
            sizes[subject] = object
            continue
        if subject not in objects:
            objects[subject] = model.NewIntVar(0, 1000, 'start/' + subject)
            heights[subject] = model.NewIntVar(0, 1000, 'start/' + subject)
        if operand == "centered":
            centered.append(subject)
            continue
        if object not in objects:
            objects[object] = model.NewIntVar(0, 1000, 'start/' + object)
            heights[object] = model.NewIntVar(0, 1000, 'start/' + subject)

        
    parallel_group = collections.defaultdict(list)
    successor_lookup = {}
    for predicate in predicates:
        subject, operand, object = predicate.split(" ")
        if operand == "centered":
            continue
        if operand == "hasSize":
            continue
        subject_var = objects[subject]
        object_var = objects[object]
        subject_height_var = heights[subject]
        object_height_var = heights[object]
        
        if operand == "leftOf":
            model.Add(subject_var < object_var)
        if operand == "rightOf":
            model.Add(subject_var > object_var)
        if operand == "above":
            model.Add(subject_height_var < object_height_var )
        if operand == "below":
            model.Add(subject_height_var > object_height_var)
        if operand == "under":
            model.Add(object_var == subject_var)
        if operand == "sameRowAs":
            model.Add(subject_height_var == object_height_var)
        if operand.startswith("withinSpace"):
            originalOperand, spaces = operand.split(":")
            model.Add((subject_var - object_var) < int(spaces))
            
    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    orderings = collections.defaultdict(list)
    hoz_positions = {}
    vert_positions = {}
    roots = []
    threads = []
    thread_list = []
    if status == cp_model.FEASIBLE or status == cp_model.OPTIMAL:
        ordered = {}
        hoz_positions = {}
        for name, value in objects.items():
            new_position = solver.Value(value)
            item_list = hoz_positions.get(new_position, [])
            hoz_positions[new_position] = item_list
            item_list.append(name)
            
        for name, value in heights.items():
            new_position = solver.Value(value)
            item_list = vert_positions.get(new_position, [])
            vert_positions[new_position] = item_list
            item_list.append(name)
       
        xpositions = iter(sorted(hoz_positions.items()))
     
        positions = []
        print(sorted(hoz_positions.items()))
        print(sorted(vert_positions.items()))
        
        def find_column_position(yvalue, xitems):
            for xposition, xvalues in xitems:
                for xvalue in xvalues:
                    if yvalue == xvalue:
                        return xposition
        
        print("<div class=\"container\">")
        for yposition, yvalues in (sorted(vert_positions.items())):
            centered_class = ""
            for yvalue in yvalues:
                if yvalue in centered:
                    centered_class = "justify-content-center"
            print("<div class=\"row d-flex {}\">".format(centered_class))
            columns = []
            for yvalue in yvalues:
                xposition = find_column_position(yvalue, sorted(hoz_positions.items()))
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


page_flow = layout_page(predicates)

