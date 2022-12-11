import React, {useState} from "react";
import {withParamsNavigate} from "../lib/core-functions";
import RecordForm from "./RecordForm";

class AddView extends React.Component {

    constructor(props) {
        super(props);

        this.navigate = this.props.navigate;

        // State
        this.state = {
            record: AddView.createEmptyRecord(),
            formFields: []
        }

        // Binds
        this.onFormSubmit.bind(this);
        this.onFormFieldChange.bind(this);
    }

    setFormFields(fields) {
        if(fields === undefined || fields == null)
            return;
        this.setState({
            formFields: fields
        });
    }

    setRecord(record) {
        if(record === undefined || record == null)
            return;
        this.setState({
            record: record
        });
    }

    componentDidMount() {
        let fields = [
            'nomor_ujian',
            'kode_prodi',
            'id_event',
            'jenis_ujian',
            'periode_proposal',
            'tahap',
            'id_proposal',
            'judul_proposal',
            'nim_pengusul',
            'nama_pengusul',
            'nim_anggota',
            'nama_anggota',
            'id_dosen_moderator',
            'nama_dosen_moderator',
            'id_dosen_penguji_1',
            'nama_dosen_penguji_1',
            'id_dosen_penguji_2',
            'nama_dosen_penguji_2',
            'id_sesi',
            'waktu_mulai',
            'waktu_selesai',
            'tanggal',
            'id_ruang',
            'kode_ruang',
            'nama_ruang',
            'keterangan_ruang'
        ];

        this.setFormFields(fields);
    }

    static createEmptyRecord() {
        let obj = {
            nomor_ujian: "",
            kode_prodi: "",
            id_event: "",
            jenis_ujian: "",
            periode_proposal: "",
            tahap: "",
            id_proposal: "",
            judul_proposal: "",
            nim_pengusul: "",
            nama_pengusul: "",
            nim_anggota: "",
            nama_anggota: "",
            id_dosen_moderator: "",
            nama_dosen_moderator: "",
            id_dosen_penguji_1: "",
            nama_dosen_penguji_1: "",
            id_dosen_penguji_2: "",
            nama_dosen_penguji_2: "",
            id_sesi: "",
            waktu_mulai: "",
            waktu_selesai: "",
            tanggal: "",
            id_ruang: "",
            kode_ruang: "",
            nama_ruang: "",
            keterangan_ruang: "",
        };
        return obj;
    }

    componentWillUnmount() {
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.addData(this.state.record).then(() => {
            alert("Data berhasil disimpan.");
            this.setRecord(AddView.createEmptyRecord());
            this.navigate("/");
        });
    }

    onFormFieldChange(formField, newValue) {
        let record = this.state.record;
        record[formField] = newValue;

        this.setState({
            record: record
        });
    }

    async addData(newRecord) {
        await fetch("http://localhost:8989/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecord),
        }).catch(error => {
            window.alert(error);
            return;
        });
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

export default withParamsNavigate(AddView);