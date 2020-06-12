import React from "react";

const Upload = props => {
    //console.log(props.value);
    return (
        <div class="file-field">
            <div class="btn btn-primary btn-sm float-left">
                <span>Choose file</span>
                <input type="file"></input>
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="Upload your file">
                </input>
            </div>
        </div>
    );
};

export default Upload;
