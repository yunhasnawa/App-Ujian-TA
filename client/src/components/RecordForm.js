import React from "react";
import Util from "../lib/Util";

export default class RecordForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let self = this;
        return (<form onSubmit={(e) => self.props.onFormSubmit(e)}>
            {self.props.formFields.map(function (field, index) {
                return (
                    <div className="form-group">
                        <label htmlFor="name">{Util.prettifyFieldName(field) + ":"}</label>
                        <input
                            type="text"
                            className="form-control"
                            id={field.toString()}
                            value={self.props.record == null ? "" : self.props.record[field]}
                            onChange={(e) => self.props.onFormFieldChange(field, e.target.value)}
                        />
                    </div>
                );
            })}
            <br />
            <div className="form-group">
                <input
                    type="submit"
                    value="Simpan"
                    className="btn btn-primary"
                />
            </div>
        </form>)
    }
}