import React, { useState } from 'react';
import StatSubbar from './PatientOverviewPartials/StatSubbar';
import DetailForm from './PatientOverviewPartials/DetailForm';
const PatientOverviewPage = ({ patient }) => {

    return (
        <div>
        <StatSubbar patient={patient} />
        <DetailForm patient={patient} />
        </div>
    )
}

export default PatientOverviewPage