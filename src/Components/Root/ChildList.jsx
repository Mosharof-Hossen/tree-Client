import React, { useState } from 'react'
import "./ChildList.css"

function ChildList(props) {
    const [form, setForm] = useState(false)
    const [delate, setDelate] = useState(false)
    const [deleteItem, setDeleteItem] = useState(null)
    const [local, setLocal] = useState({})
    console.log()


    const { _id, parent } = props.child
    const handleAddFolder = (parent) => {
        console.log(parent)
        setForm(true)
    }
    const Create = (event) => {
        console.log(local)
        fetch("https://immense-peak-72747.herokuapp.com/addFlder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(local)
        })
        setForm(false)
        // window.location.reload();
    }
    const handelData = (e) => {
        console.log(e.target.value)
        const newFolder = {
            _id: e.target.value,
            parent: _id
        }
        setLocal(newFolder)
    }
    const Cancle = () => {
        setForm(false)
        setDelate(false)
    }

    const handleDelate = (p) => {
        setDelate(true)
        setDeleteItem(p)

    }
    const delateHandle = (event) => {
        console.log("ok deleted");
        var parent = [deleteItem]
        var currChild = [deleteItem]
        var Update = []
        function searchTree(currChild, parent) {
            for (let j = 0; j < parent.length; j++) {

                props.folder.map(el => {
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
        fetch(`https://immense-peak-72747.herokuapp.com/delete/${[childNode]}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                console.log("Delete successfully");
            })


        setDelate(false)
        // window.location.reload();
    }
    return (
        <div>
            <h1><span style={{ color: "green" }}>Parent File: <span style={{ color: "red" }}>{parent}</span> ==&gt; </span>{_id} <button onClick={() => handleAddFolder(_id)}>Add Folder</button>
                {
                    `${ parent }` == "head" ? <span></span> : <button style={{margin:"10px"}} onClick={() => handleDelate(_id)}> Delete Folder</button>
                }</h1>
            <div>
                {
                    form &&
                    <div className="container">
                        <form action="">
                            <label >Add Folder in "<span style={{ color: "green" ,fontWeight:"bolder"}}>{_id}</span>"</label>
                            <input onBlur={(e) => handelData(e)} type="text" id="fname" name="firstname" placeholder="Your name.."></input>
                            <input onClick={() => Cancle()} type="submit" value="Cancel"></input>
                            <input onClick={(e) => Create(e)} type="submit" value="Create"></input>

                        </form>
                    </div>
                }
            </div>
            <div>
                {
                    delate &&
                    <div className="container">
                        <form action="">
                            <label >Delete Folder " <span style={{ color: "red" ,fontWeight:"bolder"}}>{_id}</span> " and Its Child Folder</label><br />
                            <input onClick={() => Cancle()} type="submit" value="Cancel"></input>
                            <input onClick={(e) => delateHandle(e)} type="submit" value="Delate"></input>

                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default ChildList
