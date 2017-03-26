//this application only has one component: todo
var m = require('mithril');

var tasks = {};

//for simplicity, we use this component to namespace the model classes

//the Todo class has two properties
tasks.Task = function(data) {
    this.description = m.prop(data.description);
    this.time_start = m.prop(data.time_start);
    this.time_end = m.prop(data.time_end);
    this.farm = m.prop(data.farm);
    this.done = m.prop(false);
};

//the TodoList class is a list of Todo's
tasks.TaskList = Array;

//the view-model tracks a running list of todos,
//stores a description for new todos before they are created
//and takes care of the logic surrounding when adding is permitted
//and clearing the input after adding a todo to the list
tasks.vm = (function() {
    var vm = {}
    vm.init = function() {
        //a running list of todos
        vm.list = new tasks.TaskList();

        //a slot to store the name of a new todo before it is created
        vm.description = m.prop("");
        vm.time_start = m.prop("");
        vm.time_end = m.prop("");
        vm.farm = m.prop("");

        //adds a todo to the list, and clears the description field for user convenience
        vm.add = function() {
            if (vm.description()) {
                vm.list.push(new tasks.Task({description: vm.description()}));
                vm.description("");
            }
        };
    }
    return vm
}())

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
tasks.controller = function() {
    tasks.vm.init()
}

//here's the view
tasks.view = function() {
    return [
        m("input", {onchange: m.withAttr("value", tasks.vm.description), value: tasks.vm.description()}),
        m("button", {onclick: tasks.vm.add}, "Add"),
        m("table", [
            tasks.vm.list.map(function(task, index) {
                return m("tr", [
                    m("td", [
                        m("input[type=checkbox]", {onclick: m.withAttr("checked", task.done), checked: task.done()})
                    ]),
                    m("td", {style: {textDecoration: task.done() ? "line-through" : "none"}}, task.description()),
                ])
            })
        ])
    ]
};

module.exports = tasks;
