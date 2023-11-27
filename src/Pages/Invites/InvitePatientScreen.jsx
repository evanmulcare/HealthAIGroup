import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Contexts/actionCreators/ userActionCreator';
import { doc, addDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from 'react-i18next';
import InviteTile from '../../Components/InviteTile';
import fire from "../../firebase";

const InvitePatientScreen = () => {

    const currentUser = useSelector((state) => state.auth.currentUser);

    //const [senderID, setSenderID] = useState('');
    const [receiverID, setReceiverID] = useState('');
    const [message, setMessage] = useState('');
    const [outgoingInvites, setOutgoingInvites] = useState([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getUsers());
    
        const fetchOutgoingInvites = async () => {
            const invitesArray = await getOutgoingInvites();

            setOutgoingInvites(invitesArray);
        };
    
        fetchOutgoingInvites();
    }, [dispatch, currentUser]);

    const getOutgoingInvites = async () => {
        try {
            const invitesData = [];

            const invites = await fire.firestore().collection("patientInvites")
                .where('senderID', '==', currentUser.uid)
                .get();
    
            invites.forEach((invite) => {
                const inviteData = invite.data();
                const inviteId = invite.id;
                const inviteWithId = { ...inviteData, docId: inviteId };
                invitesData.push(inviteWithId);
            });
    
            return invitesData;
        }
        
        catch (error) {
            console.error("Error fetching invites: ", error);
            return [];
        }
    };
    
    const handleInvite = async (e) => {
        e.preventDefault();

        try {
            const userDoc = await getDoc(doc(db, "users", receiverID));
            
            // Limit of 1 because we only need evidence of 1 invite.
            const userInvitesToReceiver = await fire.firestore().collection("patientInvites")
                .where("senderID", "==", currentUser.uid)
                .where("receiverID", "==", receiverID)
                .limit(1)
                .get();

            // Check if user hasn't already sent an invite to this patient.
            if (userInvitesToReceiver.size === 0) {
                // Check if receiver is a patient.
                if (userDoc.data().role === "patient") {
                    if (userDoc.data().doctor !== currentUser.uid) {
                        const newInviteRef = await addDoc(collection(db, "patientInvites"), {
                            senderID: currentUser.uid,
                            receiverID: receiverID,
                            message: message
                        });
                        
                        // Get the newly sent invite.
                        const newInviteDoc = await getDoc(newInviteRef);

                        // Display newly sent invite in the outgoing invites list.
                        setOutgoingInvites([...outgoingInvites, {...newInviteDoc.data(), docId: newInviteDoc.id}]);

                        // Success toast.
                        toast.success(t("inviteScreen.inviteSuccess"), {
                            position: 'top-center',
                            autoClose: 3000,
                        });

                        // Clear input fields.
                        setReceiverID("");
                        setMessage("");
                    }

                    // In case this patient is already on this doctor's patient list.
                    else {
                        toast.warning(t("inviteScreen.alreadyOnList"), {
                            position: 'top-center',
                            autoClose: 3000,
                        });
                    }
                }

                // If role isn't patient, show toast that patient ID doesn't exist.
                else {
                    toast.error(t("inviteScreen.invalidID"), {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                }
            }

            // If user already invited this patient, show a toast.
            else {
                toast.warning(t("inviteScreen.alreadyInvited"), {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }
        }

        catch (error) {
            console.error('Error:', error);

            // If there's an error, it's probably because the user gave an invalid ID. Show a toast.
            toast.error(t("inviteScreen.invalidID"), {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };

    // Delete passed invite from outgoingInvites array.
    const deleteInvite = (invite) => {
        setOutgoingInvites(outgoingInvites.filter(item => item !== invite));
    }
    
    return (
        <div>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">
                <div className="flex flex-col justify-between mt-4 md:mt-0">
                    <div className='space-y-2'>
                        <h3 className='font-medium text-gray-500 text-lg'>
                            {t("inviteScreen.invitePatient")}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='id'>
                                {t("inviteScreen.patientID")}
                            </label>
                            <input
                                id='id'
                                type='id'
                                className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                placeholder='ID...'
                                value={receiverID}
                                onChange={(e) => setReceiverID(e.target.value.replace(" ", ""))}
                            />

                            <label className='text-gray-600 font-medium text-sm uppercase' htmlFor='message'>
                                {t("inviteScreen.optionalMessage")}
                            </label>
                            <textarea
                                id='message'
                                type={'message'}
                                className='border rounded-md px-2 py-1 text-gray-800 col-span-2'
                                placeholder={t("inviteScreen.messagePlaceholder")}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300'
                        onClick={handleInvite}
                    >
                        {t("inviteScreen.sendInvite")}
                    </button>
                </div>
            </div>

            {outgoingInvites.length > 0 &&
                <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
                    <div className='w-full h-full'>
                        <h3 className='font-medium text-gray-500 text-lg mb-4'>
                            {t("inviteScreen.outgoingInvites")}
                        </h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {outgoingInvites.map((invite) => (
                                <div key={invite.docId}>
                                    <InviteTile invitedPatient={invite} deleteInvite={deleteInvite} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default InvitePatientScreen