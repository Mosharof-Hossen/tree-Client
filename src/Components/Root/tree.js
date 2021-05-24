let data = [
    { _id: "Root", parent: null },
    { _id: "folder_1", parent: "Root" },
    { _id: "folder_2", parent: "Root" },
    { _id: "folder_3", parent: "Root" },
    { _id: "folder_4", parent: "Root" },
    { _id: "folder_5", parent: "folder_4" },
    { _id: "folder_6", parent: "folder_4" },
    { _id: "folder_7", parent: "folder_6" },
]

let p = "Root"
var parent = [p]
var currChild = [p]
var Update = []
function searchTree(currChild, parent) {
        console.log(parent, "jdj")
        // parent = upDate
        for (let j = 0; j < parent.length; j++) {
            console.log(j)

            data.map(el => {
                console.log(el.parent, parent[j])
                if (el.parent === parent[j]) {
                    currChild.push(el._id)
                    Update.push(el._id)
                }
            })
        }
        parent = Update
        Update = []
        if (parent.length == 0) {
            return currChild
        }
        searchTree(currChild, parent)
    return currChild
}
let childNode = searchTree(currChild, parent)
console.log(childNode)

