import collections
from ortools.sat.python import cp_model
from pprint import pprint
import itertools

predicates = [
    "sidemenu hasSize 4",
    "LoginButton hasSize 2",
    "pagebody hasSize 8",
    "UsernameBox hasSize 2",
    "PasswordBox hasSize 2",
    "HeroText hasSize 8",
    "UserArea hasSize 3",
    "UsernameBox below UserArea",
	"PasswordBox rightOf UsernameBox",
    "PasswordBox sameRowAs UsernameBox",
    "UsernameBox withinSpace:2 PasswordBox",
    "PasswordBox under UserArea",
    "UsernameBox withinSpace:3 UserArea",
    "LoginButton below PasswordBox",
    "bottomLinks below pagebody",
    "pagebody centered screen",
    "HeroText centered screen", 
    "sidemenu leftOf HeroText",
    "HeroText leftOf UsernameBox",
    "HeroText below LoginButton",
    "PasswordBox below UserArea",
    "UserArea above UsernameBox",
    "LoginButton below PasswordBox",
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
    actual_start_pos = {}
    containers = {}
    sizes = {}
    things = collections.defaultdict(list)
    
    for predicate in predicates:
        subject, operand, object = predicate.split(" ")
        if operand == "is":
            things[object].append(subject)
            continue
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
        if operand == "is":
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
     
        positions = []
        print(sorted(hoz_positions.items()))
        print(sorted(vert_positions.items()))
        y_coords = {}
        x_coords = {}
        coords = {}
        placed_item = collections.namedtuple('Point', 'x y')
        for position, items in sorted(vert_positions.items()):
            for item in items:
                y_coords[item] = position
        for position, items in sorted(hoz_positions.items()):
            for item in items:
                x_coords[item] = position
        
        for item in x_coords.keys():
            coords[item] = placed_item(x_coords[item], y_coords[item])
        
        pprint(coords)
        
        grouped = itertools.groupby(sorted(coords.items(), key=lambda item: item[1].y), key=lambda item: item[1].y)
        print("<div class=\"container\">")
        for row_id, columns in grouped:
            print("<div class=\"row\">")
            cells = sorted(list(columns), key=lambda item: item[1].x)
            last_x = 0
            for key, cell in cells:
                offset = ""
                offset = "offset-md-{}".format(cell.x - last_x)
                print("<div class=\"col col-md-{} {}\">".format(sizes.get(key), offset))
                print(key, cell)
                print("</div>")
                last_x = cell.x + int(sizes.get(key, 0)) - 1
            print("</div>")
        print("</div>")
            

page_flow = layout_page(predicates)

