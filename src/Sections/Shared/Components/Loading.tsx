import { CircularProgress } from "@material-ui/core"
import React from "react"

const Loading = () => {
    return (
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    )
}

export default Loading