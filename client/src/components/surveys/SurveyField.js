// SurveyField containt logiic to render  
// a single lable and text input
import React from 'react';


export default ({ input, label }) => {
    return(
        <div>
            <label>{label}</label>
            <input  {...input}/>
            {/* onChange={input.onChange} */}
        </div>
    );
};