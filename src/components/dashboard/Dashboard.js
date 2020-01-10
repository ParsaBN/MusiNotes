import React, { Component } from 'react';
import ProjectList from '../projects/ProjectList';
import NotesList from '../projects/NotesList';
import M from "materialize-css";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateCurrentProjectId, createProject, updateNote, createNote, editNoteTitle, deleteNote, renameProject, deleteProject } from '../../store/actions/projectActions';

function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

class Dashboard extends Component {
    state = {
        currentProjectId: ''
    }

    handleCurrentProject = (id) => {
        let currentProject = this.props.projects.find(project => {
            return project.id === id
        })
        this.setState({currentProjectId: currentProject.id})
        this.props.updateCurrentProjectId(this.state.currentProjectId)
    }

    handleNoteChange = (newContent, projectId, noteId) => {
        let projectIndex = this.props.projects.findIndex(project => {
            return project.id === projectId;
        });

        let noteIndex = this.props.projects[projectIndex].notes.findIndex(note => {
            return note.id === noteId;
        });

        this.props.updateNote(newContent, projectIndex, noteIndex);
    }

    componentDidMount = () => {
        let collapsible = document.querySelectorAll(".collapsible");
        M.Collapsible.init(collapsible, { accordion: false });
    }


    addProjectForm = () => {
        let table = document.querySelector(".projects-container")
        let new_project_row = document.createElement("tr")
        new_project_row.id = "project-item-no." + table.rows.length;

        let new_project_cell = document.createElement("td")
        new_project_cell.height = "30px";

        let new_project_form = document.createElement("form")
        new_project_form.id = "project-form-no." + table.rows.length;
        new_project_form.onsubmit = this.ProjectFormSubmission;

        let new_project_input = document.createElement("input")
        new_project_input.type = "text";
        new_project_input.name = "project-name";
        new_project_input.placeholder = "enter project name";
        new_project_input.className = "project-name-input";
        new_project_input.id = "project-name-input." + table.rows.length;

        table.appendChild(new_project_row)
        new_project_row.appendChild(new_project_cell)
        new_project_cell.appendChild(new_project_form)
        new_project_form.appendChild(new_project_input)
    }

    ProjectFormSubmission = (e) => {
        e.preventDefault();
        let id = ID();
        let no = e.target.id.replace(/\D/g, "") // probs dont need this either
        let elem = document.getElementById("project-item-no." + no);
        let inputValue = document.getElementById("project-name-input." + no).value;
        let parent = elem.parentNode
        parent.removeChild(elem);

        if (/\S/.test(inputValue)) {
            // string is not empty and not just whitespace
            let new_project = {id, title: inputValue, notes: []};
            this.props.createProject(new_project);
        } else {
            return null
        }
    }

    addNoteForm = (currentProjectId) => { // note will be an object of title and content
        let containerID = `notes-container-${currentProjectId}`
        let notesList = document.querySelector('#' + containerID);
        let newNoteItem = document.createElement("li");
        let newNoteTitleForm = document.createElement("form");
        let newNoteTitleInput = document.createElement("input");

        let noteId = ID();
        newNoteItem.key = noteId;
        newNoteItem.id = "note-title-item"
        newNoteTitleForm.id = "note-title-form"
        newNoteTitleForm.onsubmit = (e) => this.NoteFormSubmission(currentProjectId, e);
        newNoteTitleInput.type = "text";
        newNoteTitleInput.defaultValue = "Untitled";
        newNoteTitleInput.id = "note-title-input";
        newNoteTitleInput.onfocus = () => {
            setTimeout(() => {
              document.execCommand('selectAll', false, null)
            }, 0)
        }

        // console.log(notesList)

        notesList.insertBefore(newNoteItem, notesList.childNodes[1]);
        newNoteItem.appendChild(newNoteTitleForm);
        newNoteTitleForm.appendChild(newNoteTitleInput);
    }

    NoteFormSubmission = (currentProjectId, e) => {
        e.preventDefault();
        let createdNoteItem = document.getElementById("note-title-item");
        let createdNoteInput = document.getElementById("note-title-input");
        let parent = createdNoteItem.parentNode;
        let noteTitle = createdNoteInput.value;
        parent.removeChild(createdNoteItem);

        if (/\S/.test(noteTitle)) {
            let id = ID();
            let newNote = {id, title: noteTitle, content: ''};
            let projectIndex = this.props.projects.findIndex(project => {
                return project.id === currentProjectId;
            });
            this.props.createNote(newNote, projectIndex)
            let col = document.querySelectorAll(".collapsible")[0];
            var inst = M.Collapsible.getInstance(col);
            inst.open(1)
        } else {
            return null
        }

    }

    NoteTitleEdit = (currentProjectId, currentNoteId, e) => {
        e.preventDefault();
        let noteTitleItem = document.getElementById(currentNoteId);
        let noteTitleDiv = noteTitleItem.getElementsByClassName("note-title")[0];
        let noteTitleStrong = noteTitleDiv.getElementsByClassName("note-title-value")[0];
        if (noteTitleStrong) {
            let noteTitleValue = noteTitleStrong.textContent;

            noteTitleDiv.removeChild(noteTitleStrong);

            let noteTitleForm = document.createElement("form");
            let noteTitleInput = document.createElement("input");
            noteTitleInput.className = "edited-note-title";
            noteTitleInput.defaultValue = noteTitleValue;
            noteTitleInput.onfocus = () => {
                setTimeout(() => {
                document.execCommand('selectAll', false, null);
                }, 0)
            }

            noteTitleForm.appendChild(noteTitleInput);
            noteTitleForm.onsubmit = () => {
                let newNoteTitle = noteTitleInput.value;
                if (/\S/.test(newNoteTitle)) {
                    let projectIndex = this.props.projects.findIndex(project => {
                        return project.id === currentProjectId;
                    });
            
                    let noteIndex = this.props.projects[projectIndex].notes.findIndex(note => {
                        return note.id === currentNoteId;
                    });

                    noteTitleDiv.removeChild(noteTitleForm);
                    let newNoteTitleStrong = document.createElement("strong");
                    newNoteTitleStrong.className = "note-title-value";
                    newNoteTitleStrong.textContent = newNoteTitle;
                    noteTitleDiv.insertBefore(newNoteTitleStrong, noteTitleDiv.childNodes[0] || null);
                    this.props.editNoteTitle(newNoteTitle, projectIndex, noteIndex);
                }
            }

            noteTitleDiv.insertBefore(noteTitleForm, noteTitleDiv.childNodes[0] || null);
        }
        
    }

    deleteNote = (currentProjectId, currentNoteId) => {
        let projectIndex = this.props.projects.findIndex(project => {
            return project.id === currentProjectId;
        });

        let noteIndex = this.props.projects[projectIndex].notes.findIndex(note => {
            return note.id === currentNoteId;
        });
        this.props.deleteNote(projectIndex, noteIndex)
    }

    ProjectTitleRename = (projectId, e) => {
        e.preventDefault();
        let projectTitleDiv = document.getElementsByClassName("notes-header")[0];
        let projectTitleStrong = projectTitleDiv.getElementsByClassName("notes-header-project-title")[0];
        let projectTitleValue = projectTitleStrong.textContent

        let projectTitleForm = document.createElement("form");
        let projectTitleInput = document.createElement("input");
        projectTitleForm.className = "project-header-form"
        projectTitleInput.defaultValue = projectTitleValue;
        projectTitleInput.onfocus = () => {
            setTimeout(() => {
              document.execCommand('selectAll', false, null);
            }, 0)
        }

        projectTitleForm.onsubmit = () => {
            let newProjectTitle = projectTitleInput.value;
            if (/\S/.test(newProjectTitle)) {
                let projectIndex = this.props.projects.findIndex(project => {
                    return project.id === projectId;
                });
                projectTitleStrong.innerHTML = newProjectTitle;
                this.props.renameProject(newProjectTitle, projectIndex)
            }
        }

        projectTitleStrong.innerHTML = "";
        projectTitleStrong.appendChild(projectTitleForm)
        projectTitleForm.appendChild(projectTitleInput)

    }

    deleteProject = (projectId) => {
        let projectIndex = this.props.projects.findIndex(project => {
            return project.id === projectId;
        });
        this.props.deleteProject(projectIndex)
    }

    render() {
        // console.log(this.props)
        const { projects, auth } = this.props;
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m3 l4"> {/* probs will make this even less and the notes even wider and shift to the & FIX RESIZING */}
                        <ProjectList projects={projects} addProjectForm={this.addProjectForm} handleCurrentProject={this.handleCurrentProject}/>
                    </div>
                    <div className="col s12 m8 l8 offset-m1"> 
                        <NotesList projects={projects} addNoteForm={this.addNoteForm} currentProjectId={this.state.currentProjectId} handleNoteChange={this.handleNoteChange} NoteTitleEdit={this.NoteTitleEdit} deleteNote={this.deleteNote} ProjectTitleRename={this.ProjectTitleRename} deleteProject={this.deleteProject}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.project.projects,
        currentProjectId: state.project.currentProjectId,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentProjectId: (currentProjectId) => dispatch(updateCurrentProjectId(currentProjectId)),
        createProject: (project) => dispatch(createProject(project)),
        updateNote: (newContent, projectIndex, noteIndex) => dispatch(updateNote(newContent, projectIndex, noteIndex)),
        createNote: (newNote, parentProjectIndex) => dispatch(createNote(newNote, parentProjectIndex)),
        editNoteTitle: (newNoteTitle, projectIndex, noteIndex) => dispatch(editNoteTitle(newNoteTitle, projectIndex, noteIndex)),
        deleteNote: (projectIndex, noteIndex) => dispatch(deleteNote(projectIndex, noteIndex)),
        renameProject: (newProjectTitle, projectIndex) => dispatch(renameProject(newProjectTitle, projectIndex)),
        deleteProject: (projectIndex) => dispatch(deleteProject(projectIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);