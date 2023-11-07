import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IndividualPatientView from './IndividualPatientView';

const IndividualPatientScreen = () => {
    const [activeTab, setActiveTab] = useState('risk');
    const navigate = useNavigate();
    const params = useParams();

    const patient = useSelector((state) =>
        state.users.users.find((user) => user.docId === params.patientId)
    );

    return (
        <IndividualPatientView activeTab={activeTab} setActiveTab={setActiveTab} patient={patient} params={params} navigate={navigate} />
    );
};

export default IndividualPatientScreen;
