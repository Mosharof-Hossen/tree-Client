import React, { useEffect, useState } from 'react'
import ChildList from './ChildList'

function Folder() {
    const [folder, setData] = useState([])

    useEffect(() => {
        fetch("https://immense-peak-72747.herokuapp.com/folder")
            .then(Response => Response.json())
            .then(dt => setData(dt))
    }, [])

    const parent = folder.map(obj => obj.parent)

    let uniqueChars = [...new Set(parent)];

    const child = uniqueChars.map(p => folder.filter(ch => (ch.parent == p)))

    return (
        <div>
            <div>
                <h1 style={{ color: "red",margin:"50px",textAlign:"center" }}> Please refresh the page after inserting or deleting.</h1>
            </div>
            <div>
                {
                    child?.map(childList => childList.map((cld, index) => <ChildList folder={folder} key={index} child={cld}></ChildList>))
                }
            </div>
        </div>
    )
}

export default Folder
