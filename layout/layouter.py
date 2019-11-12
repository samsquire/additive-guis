import collections
from ortools.sat.python import cp_model
from pprint import pprint
import itertools
import json
import sys

filename = sys.argv[1]
data = json.loads(open(filename).read())
widgets = data["widgets"]

# <link href="https://getbootstrap.com/docs/4.0/examples/blog/blog.css" rel="stylesheet">

all_predicates = data["predicates"]

def layout_page(predicates, classes):
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
    size_vars = {}
    end_vars = {}
    intervals = {}
    siblings = {}
    things = collections.defaultdict(list)
    
    for predicate in predicates:
        subject, operand, object = predicate.split(" ")
        if operand == "is":
            things[object].append(subject)
            continue
        if subject == "siblings" and operand == "hasDefaultSize":
            siblings[operand] = object
            continue
        if operand == "inside":
            this_container = containers.get(object, [])
            this_container.append(subject)
            containers[object] = this_container
        if operand == "hasSize":
            sizes[subject] = object
            size_vars[subject] = model.NewIntVar(0, 1000, 'size/' + subject)
            model.Add(size_vars[subject] == int(object))
            
        if subject not in objects:
            objects[subject] = model.NewIntVar(0, 1000, 'x/' + subject)
            heights[subject] = model.NewIntVar(0, 1000, 'y/' + subject)
            end_vars[subject] = model.NewIntVar(0, 1000, 'end/' + subject)
        if operand == "centered":
            centered.append(subject)
            continue
        if object == "screen":
            continue
        if operand == "hasSize":
            continue
        if object not in objects:
            objects[object] = model.NewIntVar(0, 1000, 'x/' + object)
            heights[object] = model.NewIntVar(0, 1000, 'y/' + subject)
            end_vars[object] = model.NewIntVar(0, 1000, 'end/' + subject)
        
    for object in objects.keys():
        if object in size_vars:
            across = model.NewIntervalVar(objects[object], size_vars[object], end_vars[object], 'interval/' + object)
            intervals[object] = across
    
    
    
    parallel_group = collections.defaultdict(list)
    successor_lookup = {}
    for predicate in predicates:
        subject, operand, object = predicate.split(" ")
        if operand == "centered":
            continue
        if operand == "hasDefaultSize":
            continue
        if operand == "hasSize":
            model.Add(end_vars[subject] == objects[subject] + size_vars[subject])
            continue
        if operand == "is":
            continue
        if object == "screen":
            continue
        subject_var = objects[subject]
        object_var = objects[object]
        subject_height_var = heights[subject]
        object_height_var = heights[object]
        if operand == "before":
            model.Add(subject_var <= object_var)
            model.Add(subject_height_var <= object_height_var)
        if operand == "leftOf":
            model.Add(subject_var < object_var)
        if operand == "rightOf":
            model.Add(subject_var > object_var)
        if operand == "above":
            model.Add(subject_height_var < object_height_var )
        if operand == "below":
            model.Add(subject_height_var > object_height_var)
        if operand == "under":
            model.Add(subject_height_var > object_height_var)
            model.Add(subject_var == object_var)
        if operand == "sameRowAs":
            model.Add(subject_height_var == object_height_var)
            model.AddNoOverlap([intervals[subject], intervals[object]])
            
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
        # print(sorted(hoz_positions.items()))
        ## print(sorted(vert_positions.items()))
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
        
        
        grouped = itertools.groupby(sorted(coords.items(), key=lambda item: item[1].y), key=lambda item: item[1].y)
        print("<div class=\"container {}\">".format(classes))
        for row_id, columns in grouped:
            print("<div class=\"row\">")
            cells = sorted(list(columns), key=lambda item: item[1].x)
            last_x = 0
            for key, cell in cells:
            
                print("<div class=\"col col-md-{}\">".format(sizes.get(key,siblings.get("hasDefaultSize"))))
                render_data = widgets.get(key, {})
                if "html" in render_data:
                    print(render_data["html"])
                elif "predicates" in render_data:
                    layout_page(render_data["predicates"], render_data.get("classes", ""))
                else:
                    print(key)
                print("</div>")
                last_x = cell.x + int(sizes.get(key, 0))
            print("</div>")
        print("</div>")
            
print("<head><link href=\"https://getbootstrap.com/docs/4.0/examples/blog/blog.css\" rel=\"stylesheet\"></head>")
for container in all_predicates:
    layout_page(container, "")

