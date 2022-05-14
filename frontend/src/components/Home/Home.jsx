import React from "react";
import { Link } from "react-router-dom";
import QuestionList from "./QuestionList";
import './Home.css'

class Home extends React.Component {
    constructor() {
        super()

        this.state = {
            queArr: [],
            keyword: ''
        }

        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;

        const response = await fetch('http://localhost:3001/questions')
        const array = await response.json()

        this.setState({ queArr: array })
    }

    handleChange = (event) => {
        const value = event.target.value

        this.setState({keyword: value })
    }

    componentWillUnmount() {
        this._isMounted = false;
    } 

    render() {
        const filteredQuestions = []

        for (const elemnt of this.state.queArr) {

            if (elemnt.text.toLowerCase().includes(this.state.keyword.toLowerCase())) {
                filteredQuestions.push(elemnt)
            }
        }
        
        return (

            <div className="Home">
                <aside>

                    <h3>WPR</h3>
                    <header>
                        <h2>HTML Quiz</h2>
                    </header>

                    <ul>
                        <li><Link className="active" to="/"><i className="far fa-question-circle"></i> All questions</Link></li>
                        <li><Link to="/add"><i className="far fa-plus"></i> New question</Link></li>
                    </ul>
                </aside>

                <main>
                    <div className="container">
                        <h1>All questions</h1>

                        <div id="search">
                            <input type="text" placeholder="Search..." value={this.state.keyword} onChange={this.handleChange} />
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th width="210">Actions</th>
                                </tr>
                            </thead>

                            <QuestionList questions={filteredQuestions} />

                        </table>
                    </div>
                </main>
            </div>
        )
    }

}

export default Home;