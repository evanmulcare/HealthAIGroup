import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePageView = ({
  fileURL,
  currentUserData,
  editMode,
  editedEmail,
  editedPassword,
  handleLogoFileChange,
  handleEditSave,
  setEditMode,
  setEditedEmail,
  setEditedPassword,
  users
}) => {

  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl grid md:grid-cols-2 gap-4 shadow-lg">
          <div className="flex flex-col items-left mb-6">
            <div className="h-48 w-48 rounded-full overflow-hidden">
              <img
                src={fileURL || currentUserData?.profileimg}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

            {editMode && (
              <input
                type="file"
                id="file"
                onChange={handleLogoFileChange}
                accept=".png, .jpg, .jpeg, .gif"
                className="border text-gray-800 rounded-md text-xs py-2 px-2 w-2/5"
                required
              />
            )}

            <div className="mt-3">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left ml-6">
                {currentUserData?.firstname} {currentUserData?.lastname}
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-between mt-4 md:mt-0 md:ml-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-500 text-lg">
                {t('profileScreen.accountInformation')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className="text-gray-600 font-medium text-sm uppercase"
                  htmlFor="email"
                >
                  {t('profileScreen.accountEmail')}
                </label>

                <input
                  id="email"
                  type="email"
                  className="border rounded-md px-2 py-1 text-gray-800 col-span-2"
                  value={editMode ? editedEmail : currentUserData?.email}
                  placeholder={editMode ? currentUserData?.email : ''}
                  readOnly={!editMode}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />

                <label
                  className="text-gray-600 font-medium text-sm uppercase"
                  htmlFor="password"
                >
                  {t('profileScreen.accountPassword')}
                </label>

                <input
                  id="password"
                  type={editMode ? 'text' : 'password'}
                  className="border rounded-md px-2 py-1 text-gray-800 col-span-2"
                  value={editedPassword}
                  disabled={!editMode}
                  placeholder={t('profileScreen.editModePlaceholder')}
                  onChange={(e) => setEditedPassword(e.target.value)}
                />
              </div>
            </div>

            {editMode ? (
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                  onClick={handleEditSave}
                >
                  {t('profileScreen.editSaveButtonLabel')}
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={() => {
                    setEditMode(false);
                    setEditedEmail(users.email);
                  }}
                >
                  {t('profileScreen.editCancelButtonLabel')}
                </button>
              </div>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => setEditMode(true)}
              >
                {t('profileScreen.editModeButtonLabel')}
              </button>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfilePageView;
