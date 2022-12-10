import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.nomor_ujian}</td>
        <td>{props.record.kode_prodi}</td>
        <td>{props.record.id_event}</td>
        <td>{props.record.jenis_ujian}</td>
        <td>{props.record.periode_proposal}</td>
        <td>{props.record.tahap}</td>
        <td>{props.record.id_proposal}</td>
        <td>{props.record.judul_proposal}</td>
        <td>{props.record.nim_pengusul}</td>
        <td>{props.record.nama_pengusul}</td>
        <td>{props.record.id_dosen_moderator}</td>
        <td>{props.record.nama_dosen_moderator}</td>
        <td>{props.record.id_dosen_penguji_1}</td>
        <td>{props.record.nama_dosen_penguji_1}</td>
        <td>{props.record.id_dosen_penguji_2}</td>
        <td>{props.record.nama_dosen_penguji_2}</td>
        <td>{props.record.id_ruang}</td>
        <td>{props.record.kode_ruang}</td>
        <td>{props.record.nama_ruang}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
            <button className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    // useEffect sama seperti componentDidMount()
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8989/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            console.log(records)
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    // This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:8989/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    // This method will map out the records on the table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                <tr>
                    <th>nomor_ujian</th>
                    <th>kode_prodi</th>
                    <th>id_event</th>
                    <th>jenis_ujian</th>
                    <th>periode_proposal</th>
                    <th>tahap</th>
                    <th>id_proposal</th>
                    <th>judul_proposal</th>
                    <th>nim_pengusul</th>
                    <th>nama_pengusul</th>
                    <th>id_dosen_moderator</th>
                    <th>nama_dosen_moderator</th>
                    <th>id_dosen_penguji_1</th>
                    <th>nama_dosen_penguji_1</th>
                    <th>id_dosen_penguji_2</th>
                    <th>nama_dosen_penguji_2</th>
                    <th>id_ruang</th>
                    <th>kode_ruang</th>
                    <th>nama_ruang</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}