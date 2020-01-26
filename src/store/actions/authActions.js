export const logIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
}

export const logOut = () => {
    return (dispatch, state, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" });
        })
        firebase.logout() // this makes sure u dont get permissions error after logout
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0], // or make this all capital letters
                email: newUser.email
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err });
        })
    }
}