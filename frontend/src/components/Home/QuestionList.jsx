import React from "react";

class QuestionList extends React.Component {

    handleDeleteQues = async (event, id) => {
        if (window.confirm("Are you sure?") === false) {
            event.preventDefault();
        } else {
            window.location.reload()
            await fetch(`http://localhost:3001/questions/${id}`, { method: 'DELETE' });
        }
    }

    render(){
        
        return (
            <tbody>
                {this.props.questions.map((question, index) => {
                    return (
    
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{question.text}</td>
                            <td>{question.correctAnswer}</td>
                            <td>
                                <button onClick={() => window.location.assign(`/questions/${question._id}`)} className="btn btn-blue"><i className="far fa-edit"></i> Edit</button>
                                <button type="button" onClick={(e) => this.handleDeleteQues(e, question._id)} className="btn btn-orange"><i className="far fa-trash-alt"></i> Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        );
    }
}

export default QuestionList;