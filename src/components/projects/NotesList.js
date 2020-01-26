import React from 'react';

const NotesList = ( props ) => {
    var project = props.currentProjectId && props.projects.find(project => {
        return project.id === props.currentProjectId
    })

    var notes = project ? project.projectNotes : null;

    // sort by date
    var sortedNotes = notes ? notes.sort(function (var1, var2) { 
        var a = new Date(var1.noteCreatedAt.seconds), b = new Date(var2.noteCreatedAt.seconds);
        if (a > b) {
            return -1;
        }
        if (a < b) {    
            return 1;
        }
        return 0;
    }) : null;

    const handleChange = (e, projectId, noteId) => {
        let newContent = e.target.value;
        props.handleNoteChange(newContent, projectId, noteId);
    }


    const projectHeader = project ? (
        <li>
            {/* add and edit button to rename project title below */}
            <div className="collection-header notes-header">
                <h5><strong className="notes-header-project-title">{ project.projectTitle }</strong></h5>
                <div className="btn-container">
                    <a href="#!" className="btn-floating pink lighten-4 right header-main-btn"><i className="material-icons">view_headline</i></a>
                    <a href="#!" className="btn-floating btn-small waves-effect waves-light blue lighten-3 right header-extra-btn" onClick={() => props.addNoteForm(props.currentProjectId)}><i className="material-icons">add</i></a>
                    <a href="#!" className="btn-floating btn-small waves-effect waves-light green lighten-3 right header-extra-btn" onClick={(e) => props.ProjectTitleRename(props.currentProjectId, e)}><i className="material-icons">edit</i></a>
                    <a href="#!" className="btn-floating btn-small waves-effect waves-light yellow darken-1 right header-extra-btn"><i className="material-icons">sort</i></a>
                    <a href="#!" className="btn-floating btn-small waves-effect waves-light red lighten-1 right header-extra-btn" onClick={() => props.deleteProject(props.currentProjectId)}><i className="material-icons">delete</i></a>
                </div>
            </div>
            <hr className="notes-header-separator"></hr>
        </li>
    ) : null;

    const notesToDisplay = sortedNotes ? (
        sortedNotes.map(note => {
            return (
                <li key={note.noteId} id={note.noteId}>
                    <div className="collapsible-header note-title">
                        <strong className="note-title-value">{ note.noteTitle }</strong>
                        <div className="note-options-btns">
                            <a href="#!" className="edit-icon right note-edit-btn" onClick={(e) => props.NoteTitleEdit(props.currentProjectId, note.noteId, e)}><i className="material-icons right">edit</i></a>
                            <a href="#!" className="delete-icon right note-extra-btn" onClick={() => props.deleteNote(props.currentProjectId, note.noteId)}><i className="material-icons right">close</i></a>
                            <a href="#!" className="focus-icon right note-extra-btn"><i className="material-icons right">filter_center_focus</i></a>
                        </div>
                    </div> 
                    <div className="collapsible-body note-body">
                        <textarea className="materialize-textarea" defaultValue={ note.noteContent ? note.noteContent : null } placeholder={ note.noteContent ? null : "Empty Note" } onChange={(e) => handleChange(e, project.id, note.noteId)}></textarea>         
                    </div>
                </li>
            )
        })
    ) : (null)

    return (
        // put it in the div but outisde the
        <div className="container notes-container"> 
            <ul className="collapsible expandable with-header notes-list" id={`notes-container-${props.currentProjectId}`}>
                { projectHeader }
                { notesToDisplay }
            </ul>
        </div>
    )
    
}

export default NotesList;