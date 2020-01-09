import React from 'react';

const NotesList = ( props ) => {
    var project = props.currentProjectId && props.projects.find(project => {
        return project.id === props.currentProjectId
    })
    var notes = project ? project.notes : null;

    const handleChange = (e, projectId, noteId) => {
        let newContent = e.target.value;
        props.handleNoteChange(newContent, projectId, noteId);
    }

    // REDO PROJECTHEADER add in divs for title and buttons

    const projectHeader = project ? (
        <li>
            {/* add and edit button to rename project title below */}
            <div className="collection-header notes-header">
                <h5><strong className="notes-header-project-title">{ project.title }</strong></h5>
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

    return (
        <div className="container notes-container">
            <ul className="collapsible expandable with-header" id={`notes-container-${props.currentProjectId}`}>
                { projectHeader }
                { notes && notes.map(note => {
                    return (
                        <li key={note.id} id={note.id}>
                            {/* next line: edit will be gear for more setting options MAYBE */}
                            <div className="collapsible-header note-title">
                                <strong className="note-title-value">{ note.title }</strong>
                                <div className="note-options-btns">
                                    <a href="#!" className="edit-icon right note-edit-btn" onClick={(e) => props.NoteTitleEdit(props.currentProjectId, note.id, e)}><i className="material-icons right">edit</i></a>
                                    <a href="#!" className="delete-icon right note-extra-btn" onClick={() => props.deleteNote(props.currentProjectId, note.id)}><i className="material-icons right">close</i></a>
                                    <a href="#!" className="focus-icon right note-extra-btn"><i className="material-icons right">filter_center_focus</i></a>
                                </div>
                            </div> 
                            <div className="collapsible-body note-body">
                                <textarea className="materialize-textarea" defaultValue={ note.content ? note.content : null } placeholder={ note.content ? null : "Empty Note" } onChange={(e) => handleChange(e, project.id, note.id)}></textarea>         
                            </div>
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default NotesList;