

import {Firebase, FirebaseUser as FirebaseUserForImport} from './firebase';

const firebase = new Firebase();

function useFirebase() {
    return firebase;
}

export {
    useFirebase, // firebase hook
    firebase
}

export type FirebaseUser = FirebaseUserForImport;
