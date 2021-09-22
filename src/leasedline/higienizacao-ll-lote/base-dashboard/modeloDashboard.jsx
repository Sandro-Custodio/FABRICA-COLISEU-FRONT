import React, { useState, useEffect } from 'react'
import axios from "axios";
import { toastr } from "react-redux-toastr";

function ModeloDashboard({classifications}) {
    //const [classifications, setClassifications] = useState([]);

    function copy(text, copied) {
        if (copied) {
            setTimeout(() => {
                toastr.info("Copiado!");
            }, 600);
        }
        var textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        textField.focus();
        document.execCommand('copy');
        textField.remove();
    }

   /* useEffect(() => {
        axios
            .get("demand_classifications/get_all_demand_classifications")
            .then(res => {
                setClassifications(res.data.map((el) => el.description));
            })
            .catch(e => {
                console.log("erro", e)
            })
    }, []); */
    return (
        <div>
            {
                classifications?.map((result) => (
                    <p>
                        <div style={{ flexDirection: "column", fontSize: 16, padding: 5 }}>
                            {result}
                        </div>
                    </p>
                ))
            }

        </div>
    )
}

export default ModeloDashboard
