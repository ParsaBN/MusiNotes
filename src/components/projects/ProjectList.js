import React from 'react';

const ProjectList = ({ projects, addProjectForm, handleCurrentProject }) => {
    const handleClick = (id) => {
        handleCurrentProject(id)
    }

    return ( 
        <div className="project-list-container">
            <table className="project-list-table">
                <thead>
                    <tr><th>Projects</th></tr>
                    <tr><td className="header-separator-cell"><hr className="projects-header-separator"></hr></td></tr>
                </thead>
                <tbody className="projects-container">
                    { projects && projects.map(project => {
                        return (
                            <tr className="project-name-row" key={ project.id }>
                                <td className="project-name-cell">
                                    <button onClick={() => handleClick(project.id)} className="waves-effect waves-light btn pink lighten-4 project-name-button">{ project.projectTitle }</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
                <tfoot className="add-button-container">
                    <tr>
                        <td>
                            <a href="#!" className="btn-floating btn-small waves-effect waves-light pink lighten-4 right" onClick={() => addProjectForm()}><i className="material-icons">add</i></a>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}


export default ProjectList;