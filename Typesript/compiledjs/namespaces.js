"use strict";
var TodoApp;
(function (TodoApp) {
    var Model;
    (function (Model) {
        let TodoState;
        (function (TodoState) {
            TodoState[TodoState["New"] = 1] = "New";
            TodoState[TodoState["InProgress"] = 2] = "InProgress";
            TodoState[TodoState["Completed"] = 3] = "Completed";
            TodoState[TodoState["Deleted"] = 4] = "Deleted";
        })(TodoState = Model.TodoState || (Model.TodoState = {}));
    })(Model = TodoApp.Model || (TodoApp.Model = {}));
})(TodoApp || (TodoApp = {}));
//# sourceMappingURL=namespaces.js.map