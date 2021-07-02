import chart from "./../dist/esm/index.js";
var root = document.getElementById("app");
if (root) {
    chart(root, {
        valuesSteps: 3,
        labels: ["A", "B", "C"],
        values: [300, 200, 100],
        width: 700,
        style: "border: 1px solid black",
    });
}
