import React from "react";
import { Link } from "react-router-dom";
import './Add.css'

class Add extends React.Component {
    constructor() {
        super();

        this.state = {
            text: '',
            answersDivArr: [],
            correctAnswer: -1
        }
    }

    handleAddBtn = () => {
        const answersArr = this.state.answersDivArr
        answersArr.push('')

        this.setState({ answersDivArr: answersArr })
    }

    handleOption = (e, index) => {
        const optionStr = e.target.value
        const answersArr = this.state.answersDivArr

        answersArr[index] = optionStr

        this.setState({ answersDivArr: answersArr })
    }

    handleRemoveBtn = (k) => {
        const answersArr = this.state.answersDivArr
        answersArr.splice(k, 1)

        this.setState({ answersDivArr: answersArr })
    }

    handleQueText = (event) => {
        const queText = event.target.value
        this.setState({ text: queText })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        let bool = true
        let fooz = true

        const { text, answersDivArr, correctAnswer } = this.state

        if (text.trim() === "") {
            event.preventDefault();
            bool = false
            alert("Please enter question!")
        }

        for (const eachAnswer of answersDivArr) {
            if (eachAnswer.trim() === "") {
                event.preventDefault();
                fooz = false
            }
        }

        if (fooz === false) alert("Answer should not be empty!")


        if (bool === true && fooz === true) {

            alert("Question has been created successfully.")
            window.location.assign("/")

            await fetch('http://localhost:3001/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    answers: answersDivArr,
                    correctAnswer: correctAnswer
                })

            }).then((res) => { return res.json() })

        }

    }

    handleKeydown = (e) => {
        if (e.key === 'Enter') e.preventDefault();
    }


    render() {

        return (

            <div className="Add">
                <aside>
                    <h3>WPR</h3>
                    <header>
                        <h2>HTML Quiz</h2>
                    </header>

                    <ul>
                        <li><Link to="/"><i className="far fa-question-circle"></i> All questions</Link></li>
                        <li><Link className="active" to="/add"><i className="far fa-plus"></i> New question</Link></li>
                    </ul>
                </aside>

                <main>
                    <div className="container">
                        <h1>New question</h1>

                        <form id="frm-create" onSubmit={this.handleSubmit} onKeyDown={this.handleKeydown}>

                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <input type="text" name="text" value={this.state.text} onChange={this.handleQueText} />
                            </div>

                            <div className="form-group">
                                <label>Answers: </label>

                                {this.state.answersDivArr.map((elemnt, i) => {

                                    return (
                                        <div className="answer" key={i} >

                                            <input type="text" name="answers" placeholder={`Option ${i + 1}`} value={this.state.answersDivArr[i]} onChange={(event) => this.handleOption(event, i)} />
                                            <div>
                                                <input name="correctAnswer" type="radio" value={i} id={`answer${i}`} onChange={() => { this.setState({ correctAnswer: i }) }} /> <label htmlFor={`answer${i}`}>correct</label>
                                            </div>
                                            <button type="button" onClick={() => this.handleRemoveBtn(i)} className="btn btn-orange"><i className="fas fa-times"></i> Remove</button>
                                        </div>

                                    )
                                })}


                                <div className="text-right">
                                    <button type="button" onClick={this.handleAddBtn} className="btn btn-blue"><i className="fas fa-plus"></i> Add</button>
                                </div>
                            </div>

                            <div className="actions">
                                <button type="submit" className="btn btn-blue btn-large" ><i className="fas fa-save"></i> Save</button>
                            </div>
                        </form>

                    </div>
                </main>
            </div>
        );
    };
};

export default Add;