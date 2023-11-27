import React  from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import fire from "../firebase";

const InviteTile = ({ invitedPatient, deleteInvite }) => {
	const inviteData = invitedPatient;
	const users = useSelector((state) => state.users.users);
	const invitedUser = users.find((user) => user.docId === invitedPatient.receiverID);

	const { t } = useTranslation();
    
	const cancelInvite = async () => {
		try {
			// Remove document from database.
			await fire.firestore().collection("patientInvites")
				.where("receiverID", "==", invitedPatient.receiverID)
				.get()
				.then(querySnapshot => { querySnapshot.docs[0].ref.delete(); });

			// Execute deleteInvite method in InvitePatientScreen script to remove from page.
			deleteInvite(inviteData);

			// Success toast.
			toast.info(t("inviteTile.inviteCancel", { invitedName: invitedUser?.firstName + ' ' + invitedUser?.lastName }), {
				position: 'top-center',
				autoClose: 3000,
			});
		}

		// Error toast.
		catch (err) {
			toast.error(t("inviteTile.cancelError"), {
				position: 'top-center',
				autoClose: 3000,
			});
		}
	};

	return (
		<div id={invitedUser?.docId} className="rounded-lg w-full h-full border shadow-lg p-4 bg-white">
			<div className="flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center">
					<div className="text-xl font-semibold text-gray-800">
						<div className="text-left">
							<h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left">
								{invitedUser?.firstName +" "+ invitedUser?.lastName}
							</h2>
							<h3 className="text-sm text-gray-500 md:text-gray-400">ID: {invitedUser?.docId}</h3>
						</div>
					</div>
				</div>
				<div className="space-x-2">
					<button className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
						onClick={() => { cancelInvite() }}
					>
						<h3 className="text-sm">
							{t("inviteTile.cancel")}
						</h3>
					</button>
				</div>
			</div>
		</div>
	)
}

export default InviteTile