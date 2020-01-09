export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        // firestore.collection('projects').add({

        // })
        console.log(project)
        dispatch({ type: 'CREATE_PROJECT', project })
    }
}

export const updateCurrentProjectId = (currentProjectId) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({ type: 'UPDATE_CURRENT_PROJECT_ID', currentProjectId})
    }
}

export const updateNote = (newContent, projectIndex, noteIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'UPDATE_NOTE', newContent, projectIndex, noteIndex})
    }
}

export const createNote = (newNote, parentProjectIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CREATE_NOTE', newNote, parentProjectIndex})
    }
}

export const editNoteTitle = (newNoteTitle, projectIndex, noteIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'EDIT_NOTE_TITLE', newNoteTitle, projectIndex, noteIndex})
    }
}

export const deleteNote = (projectIndex, noteIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DELETE_NOTE', projectIndex, noteIndex })
    }
}

export const renameProject = (newProjectTitle, projectIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'RENAME_PROJECT', newProjectTitle, projectIndex})
    }
}

export const deleteProject = (projectIndex) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DELETE_PROJECT', projectIndex})
    }
}