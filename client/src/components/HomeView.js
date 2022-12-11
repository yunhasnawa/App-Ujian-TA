import React from "react";
import Util from "../lib/Util"
import {Link} from "react-router-dom";

export default class HomeView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            headers: []
        }
        this.handleDeleteLinkClick = this.handleDeleteLinkClick.bind(this)
    }

    setRecords(records) {
        this.setState({
            records: records,
            headers: this.extractHeaders(records)
        })
    }

    extractHeaders(records) {
        let headers = [];
        if(records.length > 0) {
            for (const [key, value] of Object.entries(records[0])) {
                headers.push(key);
            }
        }
        return headers;
    }

    componentDidMount() {
        this.retrieveRecords().then(records => this.setRecords(records))
    }

    componentWillUnmount() {
    }

    // Ambil data dari database
    async retrieveRecords() {
        const response = await fetch(`http://localhost:8989/record/`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        return await response.json();
    }

    // Hapus record
    async deleteRecord(id) {
        await fetch(`http://localhost:8989/${id}`, {
            method: "DELETE"
        });

        const newRecords = this.state.records.filter((el) => el._id !== id);
        this.setRecords(newRecords);
    }

    handleDeleteLinkClick(id) {
        this.deleteRecord(id).then(records => this.setRecords(records));
    }

    render() {
        let self = this;
        return (
            <div>
                <h3>Record List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        {this.state.headers.map(function (header, index) {
                            return <th>{Util.prettifyFieldName(header)}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.records.map(function (record, index) {
                        return <TableRowView record={record} deleteAction={() => {self.handleDeleteLinkClick(record._id)}}/>
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class TableRowView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: this.extractFields(this.props.record)
        }
    }

    extractFields(record) {
        let fields = []
        for (const [key, value] of Object.entries(record)) {
            fields.push(key);
        }
        return fields
    }

    render() {
        let record = this.props.record;
        return (
            <tr>
                {this.state.fields.map(function (field, index) {
                    return <td>{record[field]}</td>
                })}
                <td>
                    <Link className="btn btn-link" to={`/edit/${this.props.record._id}`}>Edit</Link> |
                    <button className="btn btn-link"
                            onClick={() => {
                                this.props.deleteAction(this.props.record._id);
                            }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}