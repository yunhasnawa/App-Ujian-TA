import React from "react";
import Util from "../lib/Util"
import {withParamsNavigate} from "../lib/core-functions"
import RecordForm from "./RecordForm";

class EditView extends React.Component {

    constructor(props) {
        super(props);

        this.params = this.props.params;
        this.navigate = this.props.navigate;

        // State
        this.state = {
            record: {},
            formFields: []
        }

        // Binds
        this.onFormSubmit.bind(this);
        this.onFormFieldChange.bind(this);
    }

    setRecord(record) {
        if(record === undefined || record == null)
            return;
        this.setState({
            record: record,
            formFields: EditView.retrieveFormFields(record)
        })
    }

    componentDidMount() {
        this.fetchData().then(record => this.setRecord(record));
    }

    componentWillUnmount() {
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.editData(this.state.record).then(() => {
            alert("Data berhasil diubah.");
            this.navigate("/")
        });
    }

    onFormFieldChange(formField, newValue) {
        let record = this.state.record;
        record[formField] = newValue;

        this.setState({
            record: record
        });
    }

    static retrieveFormFields(record) {
        if (record == null)
            return []
        return Util.getShallowKeys(record);
    }

    async editData(updatedRecord) {
        let updatedId = updatedRecord._id;
        await fetch(`http://localhost:8989/update/${updatedId}`, {
            method: "POST",
            body: JSON.stringify(updatedRecord),
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    async fetchData() {
        const id = this.params.id.toString();
        const response = await fetch(`http://localhost:8989/record/${this.params.id.toString()}`);

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const record = await response.json();

        if (!record) {
            window.alert(`Record with id ${id} not found`);
            this.navigate("/");
        }

        return record;
    }

    render() {
        let self = this; // Untuk menjaga scope callback
        return (
            <div>
                <h3>Update Record</h3>
                <RecordForm
                    record={this.state.record}
                    formFields={this.state.formFields}
                    onFormSubmit={(e) => this.onFormSubmit(e)}
                    onFormFieldChange={(field, value) => self.onFormFieldChange(field, value)} />
            </div>
        );
    }
}

export default withParamsNavigate(EditView);