import update from 'immutability-helper';

function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

const initState = {
    projects: [
        {
            id: ID(), 
            title: 'BusMan',
            notes: [
                {id: ID(), title: 'term1', content: 'going for a 50'},
                {id: ID(), title: 'note2', content: 'gonna get a solid score in this hopefully 50 too'},
                {id: ID(), title: 'the Third', content: 'need a 45+ in this'}
            ]
        },
        {
            id: ID(), 
            title: 'Econ',
            notes: [
                {id: ID(), title: 'term1', content: 'pretty confident but not cocky gonna need some serious work'},
            ]
        },
        {id: ID(), title: 'EAL'}
    ],
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
                    notes: {
                        [action.noteIndex]: {
                            "content": {$set: action.newContent}
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
                    notes: notes => update(notes || [], { $unshift: [action.newNote] })
                }
            })
            return {
                ...state,
                projects: ProjectsWithNewNote
            }
        case 'EDIT_NOTE_TITLE':
            const ProjectsWithUpdatedNote = update(state.projects, {
                [action.projectIndex]: {
                    notes: {
                        [action.noteIndex]: {
                            "title": {$set: action.newNoteTitle}
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
                    notes: {
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
                    "title": {$set: action.newProjectTitle}
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