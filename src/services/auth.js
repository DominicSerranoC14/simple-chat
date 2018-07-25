import firebase from 'firebase/app';

export const getCurrentUsersToken = () => {
    return firebase.auth().currentUser.getIdToken();
};