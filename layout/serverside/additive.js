var React = require('react');

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
// Sam Squire
var template = {
    "predicates": [
        "blogSidebar hasSize 4",
        "menu above heroPost",
        "blah rightOf heroPost",
        "featuredPosts above blogs",
        "header above menu",
        "heroPost above featuredPosts",
        "menu hasSize 12",
        "heroPost hasSize 6",
        "menu",
        "featuredPosts",
        "heroPost",
        "header above featuredPosts",
        "header",
        "blogs hasSize 8",
        "blogSidebar rightOf blogs",
        "featuredPosts above blogs",
        "blah2 leftOf blah",
        "blah2 rightOf heroPost"
    ],
    "widgets": {
        "header": {
            "predicates": [
                "logo hasSize 12"
            ],
            "classes": "blog-header py-3 justify-content-between align-items-center text-center"
        },
        "featuredPosts": {
            "predicates": [
                "featuredPostA hasSize 6",
                "featuredPostB hasSize 6",
                "featuredPostB rightOf featuredPostA"
            ]
        },
        "featuredPostB": {
            "predicates": [
                "featuredPostContentB leftOf imageB"
            ],
            "classes": "card flex-md-row mb-4 box-shadow h-md-250"
        },
        "featuredPostA": {
            "predicates": [
                "featuredPostContentA leftOf imageA"
            ],
            "classes": "card flex-md-row mb-4 box-shadow h-md-250"
        },
        "featuredPostContentA": {
            "predicates": [
                "categoryA above featuredPostHeadingA",
                "featuredPostHeadingA above featuredPostDateA",
                "featuredPostDateA above featuredIntroA",
                "featuredPostDateA below categoryA"
            ],
            "classes": "card-body d-flex flex-column align-items-start"
        },
        "featuredPostContentB": {
            "predicates": [
                "categoryB above featuredPostHeadingB",
                "featuredPostHeadingB above featuredPostDateB",
                "featuredPostDateB above featuredIntroB",
                "featuredPostDateB below categoryB"
            ],
            "classes": "card-body d-flex flex-column align-items-start"
        },
        "menu": {
            "predicates": [
                "Technology rightOf World",
                "siblings hasDefaultSize 1"
            ]
        },
        "heroPost": {
            "predicates": [
                "heroText above continueReadingLink"
            ],
            "classes": "jumbotron p-3 p-md-5 text-white rounded bg-dark"
        },
        "blogs": {
            "predicates": [
                "introduction above blogPost"
            ]
        },
        "blogPost": {
            "predicates": [
                "blogHeading above postMetadata",
                "postMetadata above posting"
            ]
        },
        "blogSidebar": {
            "predicates": [
                "aboutSection hasSize 12"
            ],
            "classes": "bg-light"
        },
        "aboutSection": {
            "predicates": [
                "aboutTitle above aboutText",
                "aboutText hasSize 12"
            ]
        },
        "blogHeading": {
            "html": "<h1>Sample blog post</h1>"
        },
        "postMetadata": {
            "html": "<p class=\"blog-post-meta\">January 1, 2014 by <a href=\"author\">Mark</a></p>"
        },
        "posting": {
            "html": "<p>This blog post shows a few different types of content that's supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>\r\n            <hr>\r\n            <p>Cum sociis natoque penatibus et magnis <a href=\\\"#\\\">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>\r\n            <blockquote>\r\n              <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\r\n            </blockquote>\r\n            <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\r\n            <h2>Heading</h2>\r\n            <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\r\n            <h3>Sub-heading</h3>\r\n            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\r\n            <pre><code>Example code block</code></pre>\r\n            <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>\r\n            <h3>Sub-heading</h3>\r\n            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\r\n            <ul>"
        },
        "introduction": {
            "html": "<h3 class=\"pb-3 mb-4 font-italic border-bottom\">From the firehose</h3>",
            "classes": "font-italic"
        },
        "logo": {
            "html": "<h1 class=\"blog-header-logo\">Large</h1>"
        },
        "categoryA": {
            "html": "<strong class=\"d-inline-block mb-2 text-primary\">World</strong>"
        },
        "categoryB": {
            "html": "<strong class=\"d-inline-block mb-2 text-primary\">Technology</strong>"
        },
        "featuredIntroA": {
            "html": "<p class=\"card-text mb-auto\">This is a wider card with supporting text below as a natural lead-in to additional content.</p>"
        },
        "featuredIntroB": {
            "html": "<p class=\"card-text mb-auto\">This is a wider card with supporting text below as a natural lead-in to additional content.</p>"
        },
        "featuredPostHeadingA": {
            "html": "<h3 class=\"mb-0\">\r\n                <a class=\"text-dark\" href=\"#\">Featured post</a>\r\n              </h3>"
        },
        "featuredPostHeadingB": {
            "html": "<h3 class=\"mb-0\">\r\n                <a class=\"text-dark\" href=\"#\">Featured post</a>\r\n              </h3>"
        },
        "featuredPostDateA": {
            "html": "<div class=\"mb-1 text-muted\">Nov 12</div>"
        },
        "featuredPostDateB": {
            "html": "<div class=\"mb-1 text-muted\">Nov 12</div>"
        },
        "imageA": {
            "html": "<img class=\"card-img-right flex-auto d-none d-md-block\" data-src=\"holder.js/200x250?theme=thumb\" alt=\"Thumbnail [200x250]\" style=\"width: 200px; height: 250px;\" src=\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e60efb6c9%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e60efb6c9%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.1953125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\" data-holder-rendered=\"true\">"
        },
        "imageB": {
            "html": "<img class=\"card-img-right flex-auto d-none d-md-block\" data-src=\"holder.js/200x250?theme=thumb\" alt=\"Thumbnail [200x250]\" style=\"width: 200px; height: 250px;\" src=\"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e60efb6c9%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e60efb6c9%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.1953125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\" data-holder-rendered=\"true\">"
        },
        "heroText": {
            "html": "<h2>Title of a longer featured blog post</h2>"
        },
        "continueReadingLink": {
            "html": "<a href=\"featured-post-a\">Continue reading</a>"
        },
        "featureTextA": {
            "html": "<h3>Some interesting article 1</h3>"
        },
        "featureTextB": {
            "html": "<h3>Some interesting article 2</h3>"
        },
        "aboutText": {
            "html": "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur."
        },
        "aboutTitle": {
            "html": "<h4 class=\"font-italic\">About</h4>"
        }
    }
}

function Environment() {
	this.data = {};
	this.properties = {};
}

Environment.prototype.registerData = function (widget, data) {
		this.data[widget] = data;
		console.log("Registering data for ", widget);
}

Environment.prototype.hasProperty = function (widget) {
	return this.properties.hasOwnProperty(widget);
}

Environment.prototype.addProperty = function (property, widget, fn) {
	var properties;
	if (this.properties.hasOwnProperty(widget)) {
		properties = this.properties[widget];
	} else {
		this.properties[widget] = {};
		properties = this.properties[widget];
	}
	properties[property] = fn;

}


function layout_page(environment, values, template, data, classes, keyPostfix) {
	data = shuffle(data);
	console.log("data", JSON.stringify(data));
	var Problem = function() {
		this.variables = [];
		this.lookup = {};
		this.rules = [];
		this.ordering = {
			"x": [],
			"y": []
		}
		this.data = [];
		this.ruleIndex = {};
		this.properties = {};
	}

	var Declaration = function (name) {
		this.name = name;
		this.x = 0;
		this.y = 0;
		this.size = "";
	}

	Problem.prototype.addDeclaration = function (name) {
		if (name == undefined) { debugger ; }
		var createdDeclaration = new Declaration(name)
		this.variables.push(createdDeclaration);
		this.lookup[name] = createdDeclaration;


	};

	var problem = new Problem();


	for (var i = 0 ; i < data.length; i++) {
		var item = data[i];

		var components = item.split(" ");

		if (components.length == 1) {
			// declaration
			if (!problem.lookup.hasOwnProperty(components[0])) {
				problem.addDeclaration(components[0]);
			}

		} else {
			if (components[0] == "siblings") { continue }

			if (!problem.lookup.hasOwnProperty(components[0])) { problem.addDeclaration(components[0]); }
			if (components[1] == "hasSize") { continue }
			if (components[1] == "is") { continue }
			if (components[1] == "key") { continue }
			if (components[1] == "mappedTo") { continue }
			if (components[1] == "backedBy") { continue }
			if (components[1] == "hasClass") { continue }
			if (components[1] == "selects") { continue }
			if (components[1] == "emits") { continue }
			if (components[1] == "hasContent") { continue }

			if (!problem.lookup.hasOwnProperty(components[2])) { problem.addDeclaration(components[2]); }

		}
	}

	for (var i = 0 ; i < data.length; i++) {
		var item = data[i];

		var components = item.split(" ");

		if (components[1] == "hasSize") {
			problem.lookup[components[0]].size = components[2];

		}
	}

	Problem.prototype.hasProperty = function (widget) {
		return this.properties.hasOwnProperty(widget);

	}

	Problem.prototype.addProperty = function (property, widget, fn) {
		var properties;
		if (this.properties.hasOwnProperty(widget)) {
			properties = this.properties[widget];
		} else {
			this.properties[widget] = {};
			properties = this.properties[widget];
		}
		properties[property] = fn;

	}

	Problem.prototype.addRule = function (coordinate, rule, left, right) {
		var needInsertLeft = false;
		if (this.ordering[coordinate].indexOf(left) == -1) {
			needInsertLeft = true;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(left) != -1) {
						needInsertLeft = false;
					}
				}
			}
		}
		var needInsertRight = false;
		if (this.ordering[coordinate].indexOf(right) == -1) {
			needInsertRight = true;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(right) != -1) {
						needInsertRight = false;
					}
				}
			}
		}
		if (needInsertLeft == true && needInsertRight == false) {
			for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
				var current = this.ordering[coordinate][i];
				if (current === right) {
					// we need to insert left before right
					this.ordering[coordinate].splice(i, 0, left);
					break;
				}
			}
		}
		else if (needInsertLeft == false && needInsertRight == true) {
			for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
				var current = this.ordering[coordinate][i];
				if (current == left) {
					// we need to insert left before right
					this.ordering[coordinate].splice(i + 1, 0, right);
					break;
				}
			}
		} else if (needInsertLeft == true && needInsertRight == true) {
			this.ordering[coordinate].push(left);
			this.ordering[coordinate].push(right);
		} else if (needInsertLeft == false && needInsertRight == false) {
			// is left before right
			var rightPos = this.ordering[coordinate].indexOf(right);
			var foundRight = false;
			var isCollection = false;
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(right) != -1) {
						foundRight = true;
						rightPos = i;
						isCollection = true;
						break;
					}
				}
			}
			var leftPos = this.ordering[coordinate].indexOf(left);
			for (var i = 0; i < this.ordering[coordinate].length; i++) {
				if (Array.isArray(this.ordering[coordinate][i])) {
					if (this.ordering[coordinate][i].indexOf(left) != -1) {
						foundLeft = true;
						leftPos = i;
						isCollection = true;
						break;
					}
				}
			}
			console.log("rightPos", rightPos);

			if (! (leftPos < rightPos)) {
				var backup;
				console.log("Swap needed", left, right);
				console.log("swap", rightPos);

				if (isCollection) {
					backup = this.ordering[coordinate][leftPos];
					console.log("backup", backup);
				}
				// delete left
				this.ordering[coordinate].splice(leftPos, 1);
				var rightBackup;
				if (isCollection) {
					rightBackup = this.ordering[coordinate][rightPos];
					this.ordering[coordinate][rightPos] = backup;

				} else {
					rightBackup = this.ordering[coordinate][rightPos];
					this.ordering[coordinate][rightPos] = left;

				}
				console.log("rightbackup", rightBackup);
				console.log("insert", right);
				this.ordering[coordinate].splice(rightPos + 1, 0, rightBackup);


				console.log("swap", this.ordering[coordinate]);

			}
		}
		if (coordinate === "x") {
			if (rule === "leftOf" || rule === "rightOf") {
				console.log("Left", left, "and right", right, "have the same y");
				var found = false;
				for (var i = 0 ; i < this.ordering["y"].length ; i++) {
					var ordering = this.ordering["y"][i];
					var innerMove = false;
					if (ordering == left) {
						console.log("Found on the left");
						this.ordering["y"][i] = [left];
						// look for right in list
						for (var k = 0 ; k < this.ordering["y"].length; k++) {
							var inner = this.ordering["y"][k];
							if (Array.isArray(this.ordering["y"][i]) && Array.isArray(inner)) {
								console.log("Inner is a list");
								console.log("inner", inner);
								for (var m = 0; m < inner.length ; m++) {
									if (inner[m] === right) {
										console.log("We have to move what's here");
										innerMove = true;
										for (var thing of inner) {
											console.log("Moving", this.ordering["y"][i]);
											this.ordering["y"][i].push(thing);
										}
										this.ordering["y"].splice(k, 1);
									}
								}

							}

						}
						if (!innerMove) {
							this.ordering["y"][i].push(right);
						}
						if (this.ordering["y"].indexOf(right) != -1) {
							this.ordering["y"].splice(this.ordering["y"].indexOf(right), 1);
						}


						found = true;
						break;
					} else if (ordering == right) {
						console.log("Found on the right");
						this.ordering["y"][i] = [right];
						// look for right in list
						for (var k = 0 ; k < this.ordering["y"].length; k++) {
							var inner = this.ordering["y"][k];
							if (Array.isArray(this.ordering["y"][i]) && Array.isArray(inner)) {
								console.log("Inner is a list");
								console.log("inner", inner);
								for (var m = 0; m < inner.length ; m++) {
									if (inner[m] === left) {
										console.log("We have to move what's here");
										innerMove = true;
										for (var thing of inner) {
											console.log("Moving", this.ordering["y"][i]);
											this.ordering["y"][i].push(thing);
										}
										this.ordering["y"].splice(k, 1);
									}
								}

							}

						}
						if (!innerMove) {
							this.ordering["y"][i].push(left);
						}
						if (this.ordering["y"].indexOf(left) != -1) {
							this.ordering["y"].splice(this.ordering["y"].indexOf(left), 1);
						}

						found = true;
						break;
					}

					if (Array.isArray(ordering)) {
						console.log("Multiple things in the same Y");
						var size = ordering.length;

						for (var j = 0 ; j < size ; j++) {
							var item = ordering[j];
							if (item == left && ordering.indexOf(right) == -1) {
								found = true;
								ordering.push(right);
								break;
							} else if (item == right && ordering.indexOf(left) == -1) {
								found = true;
								ordering.push(left);
								break; }
						}

					}

				}


				if (!found) {
					console.log(JSON.stringify(this.ordering["y"]));
					console.log("We need to introduce into Y");

				}

			}
		}
		for (var i = 0 ; i < this.ordering[coordinate].length ; i++) {
			var current = this.ordering[coordinate][i];

			if (Array.isArray(current)) {

				for (var item of current) {
					this.lookup[item][coordinate] = i + 1;
				}
			} else {

				this.lookup[current][coordinate] = i + 1;
			}

		}

		console.log("y", JSON.stringify(this.ordering["y"]));
		// console.log("x", this.ordering["x"]);
		var ruleKey = coordinate + rule + left + right;
		if (!this.ruleIndex.hasOwnProperty(ruleKey)) {
			this.rules.push([coordinate, rule, left, right]);
			this.ruleIndex[ruleKey] = true;
		}

	}

	Problem.prototype.solve = function () {
		/* Re-apply rules to catch errors */
		var lastOrderingX = this.ordering.x
		var lastOrderingY = this.ordering.y
		var times = 1;
		do {
			times++;
			for (var i = 0 ; i < this.rules.length; i++) {
				this.addRule.apply(this, this.rules[i]);
			}
			lastorderingX = this.ordering.x;
			lastOrderingY = this.ordering.y;
		} while (lastOrderingX != this.ordering.x || lastOrderingY != this.ordering.y)
		console.log("Solved with", times, "runs");
		return this.variables;
	}




	for (var i = 0 ; i < data.length; i++) {
		var item = data[i];
		console.log(item);
		var components = item.split(" ");
		if (components.length == 3) {
			// rule
			if (components[1] === "below") {
				problem.addRule("y", components[1], components[2], components[0]);
			}
			if (components[1] === "above") {

				problem.addRule("y", components[1], components[0], components[2]);
			}
			if (components[1] === "leftOf") {

				problem.addRule("x", components[1], components[0], components[2]);
			}
			if (components[1] === "rightOf") {

				problem.addRule("x", components[1], components[2], components[0]);
			}
			if (components[1] === "mappedTo") {
				problem.addProperty("mappedTo", components[0],

						template.widgets[components[2]]

				);
			}
			if (components[1] === "backedBy") {
				problem.addProperty("backedBy", components[0],
					function (field) {
						return function (data) {
							if (field.length > 1) {

								return data[field.replace(".", "")];
							}
							return data;
					}
				}(components[2]));
			}
			if (components[1] === "hasContent") {
				problem.addProperty("hasContent", components[0], components[2]);
			}
			if (components[1] === "emits") {
				problem.addProperty("emits", components[0], components[2]);
			}
			if (components[1] === "key") {
				problem.addProperty("key", components[0], components[2]);
			}
			if (components[1] === "selects") {
				environment.addProperty("selects", components[0], components[2]);
				environment.addProperty("receives", components[2]);
			}
			if (components[1] === "hasClass") {
				problem.addProperty("hasClass", components[0], components[2]);
			}
			if (components[1] === "is") {
				problem.addProperty("is", components[0], components[2]);
			}
			if (components[1] === "hasDefaultSize") {
				problem.addProperty("defaultSize", components[0], components[2]);
			}

		}
	}
	var ordered = problem.solve();

	var grouped = groupBy(ordered, 'y');

	var rows = Object.keys(grouped).sort(function (a, b) { return Number(a) < Number(b) ? -1 : 1 }).map(function (item) {

		return {key: item, items: grouped[item]};
	}).map(function (item) {
		var colChildren = item.items.sort(function (a, b)  { return Number(a.x) < Number(b.x) ? -1 : 1 }).map(function (cell) {

			var contents = cell.name;

			var attr = {key: cell.name + keyPostfix, className: "col"}
			var size;
			if (problem.hasProperty("siblings") && problem.properties["siblings"].hasOwnProperty("defaultSize")) {
				size = problem.properties["siblings"].defaultSize;
			}
			if (cell.size) {
				size = cell.size;
			}


			attr["className"] += " col-md-" + size;


			var renderData = {};
			if (template.widgets.hasOwnProperty(cell.name)) {
				renderData = template.widgets[cell.name];
			}
			// dynamic rules
			// console.log(cell.name);
			console.log("cell name", cell.name);
			if (problem.hasProperty(cell.name)) {
				if (problem.properties[cell.name].hasOwnProperty("hasClass")) {

					attr["className"] += " " + problem.properties[cell.name].hasClass;
				}
				// console.log("Dynamic rule", cell.name, problem.properties[cell.name]);
				if (problem.properties[cell.name].hasOwnProperty("mappedTo") && (problem.properties[cell.name].hasOwnProperty("backedBy") ||  (environment.hasProperty(cell.name) && environment.properties[cell.name].hasOwnProperty("receives")))) {
					// console.log("Can map");
					var dataSource;
					if (environment.hasProperty(cell.name) && environment.properties[cell.name].hasOwnProperty("receives")) {
						// console.log("Mapping", cell.name, environment.data);
						// console.log(cell.name);
						dataSource = environment.data[cell.name] || [];
						// console.log(dataSource);
					} else {
						dataSource = problem.properties[cell.name].backedBy(values)
						// console.log(dataSource);
					}
					if (Array.isArray(dataSource)) {
						var screenItems = dataSource.map(function (dataItem) {
							var keyPostfix = dataItem[problem.properties[cell.name].key.replace(".", "")];
							var contents = layout_page(environment, dataItem, template, problem.properties[cell.name]["mappedTo"]["predicates"], classes, keyPostfix);
							return contents;
					});

					// console.log(screenItems);
					attr["key"] = cell.name;
					return React.createElement("div", attr, screenItems);

					} else {
						var dataItem = dataSource;
						var keyPostfix = dataItem[problem.properties[cell.name].key.replace(".", "")];

						var contents = layout_page(environment, dataItem, template, problem.properties[cell.name]["mappedTo"]["predicates"], classes, keyPostfix);
						return React.createElement("div", attr, contents);
					}

				}
				if (problem.properties[cell.name].hasOwnProperty("emits")) {
					// console.log("Creating event handler for", cell.name);
					attr["onClick"] = function (problem, environment, cell) {
						return function () {
							var emits = problem.properties[cell.name].emits;
							console.log("Need to re-render", environment.properties[cell.name].selects, "with", emits);
							if (emits === ".") {
								toRender = values;
							} else {
								toRender = values[emits.replace(".", "")];
							}
							// console.log("Mapping", toRender);
							// console.log("Register data", cell.name);
							environment.registerData(environment.properties[cell.name].selects, toRender);
							rerender();
						}
					}(problem, environment, cell);
				}
				if (problem.properties[cell.name].hasOwnProperty("hasContent")) {
					var contentSpecifier = problem.properties[cell.name]["hasContent"];
					var content;
					if (contentSpecifier.indexOf(".") != -1) {
						content = values[contentSpecifier.replace(".", "")];
					} else {
						content = contentSpecifier;
					}
					attr["key"] = content;
					/* attr["dangerouslySetInnerHTML"] = {
						"__html":
					}*/
					return React.createElement("div", attr, content);

				}

			}

			if (renderData.hasOwnProperty("html")) {
				attr["dangerouslySetInnerHTML"] = {
					"__html": renderData["html"]
				}
				contents = null;
			}
			if (renderData.hasOwnProperty("predicates")) {
				var classes = "";
				if (renderData.hasOwnProperty("classes")) {
					classes = renderData["classes"];

				}
				contents = layout_page(environment, values, template, renderData["predicates"], classes, cell.name);

				return React.createElement("div", attr, contents);

			}

			return React.createElement("div", attr, contents);
		});

		var gridStyles = "";
		gridStyles = "row"


		return React.createElement("div", {key: item.key, className: gridStyles},colChildren);
	})

	var container = React.createElement('div', {key: keyPostfix, className: "container " + classes }, rows);
	return container;
}

module.exports = {
    layout_page: layout_page,
    template: template,
    Environment: Environment
}
