// Survey Form shows a form for a user to add input!
import _ from 'lodash';
import React, {Component} from 'react';
import { reduxForm, Filed, Field } from 'redux-form'; 
import SurveyField from './SurveyField';

const FIELDS = [
    {name:"title", label:"Survey Title"},
    {name:"subject", label:"Subject Line"},
    {name:"body", label:"Email Body"},
    {name:"emails", label:"Recipients List"}
];


class SurveyForm extends Component {

    renderFields() {
       return _.map(FIELDS, ({ label, name }) => {
           return <Field key={name} component={SurveyField} type="text" 
                    label={label} name={name}/>
       })
    }

    render(){
        return (
            <div>
                <form 
                onSubmit={this.props.handleSubmit(value => console.log(value))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>    
            </div> 
        ) 
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);