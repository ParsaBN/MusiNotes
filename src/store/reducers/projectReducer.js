import update from 'immutability-helper';
import fbConfig from '../../config/fbConfig';

const projectList = []

fbConfig.db.collection('projects').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        // console.log(doc.id, " => ", doc.data())
        projectList.push(doc.data())
    })
})

const initState = {
    projects: projectList,
    currentProjectId: ''
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_PROJECT_ID':
            // console.log('updated current project')
            state.currentProjectId = action.currentProjectId
            return state
        case 'CREATE_PROJECT':
            // console.log('creating a new project')
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.project
                ]
            }
        case 'UPDATE_NOTE':
            // console.log('updating note')
            const newProjects = update(state.projects, {
                [action.projectIndex]: {
                    projectNotes: {
                        [action.noteIndex]: {
                            "noteContent": {$set: action.newContent}
                        }
                    }
                }
            })
            return {
                ...state,
                projects: newProjects
            }
        case 'CREATE_NOTE':
            const ProjectsWithNewNote = update(state.projects, {
                [action.parentProjectIndex]: {
                    projectNotes: projectNotes => update(projectNotes || [], { $unshift: [action.newNote] })
                }
            })
            return {
                ...state,
                projects: ProjectsWithNewNote
            }
        case 'EDIT_NOTE_TITLE':
            const ProjectsWithUpdatedNote = update(state.projects, {
                [action.projectIndex]: {
                    projectNotes: {
                        [action.noteIndex]: {
                            "noteTitle": {$set: action.newNoteTitle}
                        }
                    }
                }
            })
            return {
                ...state,
                projects: ProjectsWithUpdatedNote
            }
        case 'DELETE_NOTE':
            const UpdatedProjectsWithoutNote = update(state.projects, {
                [action.projectIndex]: {
                    projectNotes: {
                        $splice: [[action.noteIndex, 1]]
                    }
                }
            })
            return {
                ...state, 
                projects: UpdatedProjectsWithoutNote
            }
        case 'RENAME_PROJECT':
            const ProjectsWithRenamedProject = update(state.projects, {
                [action.projectIndex]: {
                    "projectTitle": {$set: action.newProjectTitle}
                }
            })
            return {
                ...state,
                projects: ProjectsWithRenamedProject
            }
        case 'DELETE_PROJECT':
            const UpdatedProjectsWithoutProject = update(state.projects, {
                $splice: [[action.projectIndex, 1]]
            })
            return {
                ...state,
                projects: UpdatedProjectsWithoutProject
            }
        default:
            return state
    }
}

export default projectReducer;