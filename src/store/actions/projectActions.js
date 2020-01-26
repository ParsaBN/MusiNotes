import M from "materialize-css";

export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;
        firestore.collection('projects').add({
            ...project,
            userId: authorId,
            projectCreatedAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project })
        }).catch((err) => {
            console.log("Error creating new project: ", err)
        })
    }
}

export const updateCurrentProjectId = (currentProjectId) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({ type: 'UPDATE_CURRENT_PROJECT_ID', currentProjectId})
    }
}

export const updateNote = (newContent, projectId, noteId, projectIndex, noteIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const projectRef = firestore.collection('projects').doc(projectId);
        projectRef.get().then((doc) => {
            let project = doc.data();
            let projectNotes = project.projectNotes
            let note = projectNotes.find(note => note.noteId === noteId)
            let newProjectNotes = firestore.FieldValue.arrayRemove(note);
            firestore.collection('projects').doc(projectId).update({
                projectNotes: newProjectNotes
            }).then(() => {
                let newNote = note
                newNote.noteContent = newContent;
                let newAddedProjectNotes = firestore.FieldValue.arrayUnion(newNote);
                firestore.collection('projects').doc(projectId).update({
                    projectNotes: newAddedProjectNotes
                })
            })
        }).then(() => {
            dispatch({ type: 'EDIT_NOTE_TITLE', newContent, projectIndex, noteIndex})
        })
    }
}

export const createNote = (newNote, parentProjectId, parentProjectIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const newProjectNotes = firestore.FieldValue.arrayUnion(newNote);
        firestore.collection('projects').doc(parentProjectId).update({
            projectNotes: newProjectNotes
        }).then(() => {
            let col = document.querySelectorAll(".collapsible")[0];
            var inst = M.Collapsible.getInstance(col);
            inst.open(1)
            dispatch({ type: 'CREATE_NOTE', newNote, parentProjectIndex})
        }).catch((err) => {
            console.log("Error creating new note: ", err)
        })   
    }
}

export const editNoteTitle = (currentProjectId, currentNoteId, newNoteTitle, projectIndex, noteIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const projectRef = firestore.collection('projects').doc(currentProjectId);
        projectRef.get().then((doc) => {
            let project = doc.data();
            let projectNotes = project.projectNotes
            let note = projectNotes.find(note => note.noteId === currentNoteId)
            let newProjectNotes = firestore.FieldValue.arrayRemove(note);
            firestore.collection('projects').doc(currentProjectId).update({
                projectNotes: newProjectNotes
            }).then(() => {
                let newNote = note
                newNote.noteTitle = newNoteTitle;
                let newAddedProjectNotes = firestore.FieldValue.arrayUnion(newNote);
                firestore.collection('projects').doc(currentProjectId).update({
                    projectNotes: newAddedProjectNotes
                })
            })
        }).then(() => {
            // console.log(projectIndex, noteIndex)
            dispatch({ type: 'EDIT_NOTE_TITLE', newNoteTitle, projectIndex, noteIndex})
        })
    }
}

export const deleteNote = (currentProjectId, currentNoteId, projectIndex, noteIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const projectRef = firestore.collection('projects').doc(currentProjectId);
        projectRef.get().then((doc) => {
            let project = doc.data();
            let projectNotes = project.projectNotes
            let note = projectNotes.find(note => note.noteId === currentNoteId)
            let newProjectNotes = firestore.FieldValue.arrayRemove(note);
            firestore.collection('projects').doc(currentProjectId).update({
                projectNotes: newProjectNotes
            })
        }).then(() => {
            dispatch({ type: 'DELETE_NOTE', projectIndex, noteIndex })
        })
    }
}

export const renameProject = (newProjectTitle, projectId, projectIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('projects').doc(projectId).update({
            projectTitle: newProjectTitle
        }).then(() => {
                dispatch({ type: 'RENAME_PROJECT', newProjectTitle, projectIndex})
        }).catch((err) => {
            console.log("Error renaming project: ", err)
        })
    }
}

export const deleteProject = (projectId, projectIndex) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('projects').doc(projectId).delete().then(() => {
            dispatch({ type: 'DELETE_PROJECT', projectIndex})
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}