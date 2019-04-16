import React from 'react';
import Table from '../../Components/Table/Table'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

import './PHQ9.scss'


const phq9Headers = [
    'Over the past 2 weeks, how often have you been bothered by any of the following problems?',
    'Select an answer'
]

const phq9Questions = [
    "1. Little interest or pleasure in doing things",
    "2. Feeling down, depressed, or hopeless",
    "3. Trouble falling asleep, staying asleep, or sleeping too much",
    "4. Feeling tired or having little energy",
    "5. Poor appetite or overeating",
    "6. Feeling bad about yourself - or that you're a failure or have let yourself or your family down",
    "7. Trouble concentrating on things, such as reading the newspaper or watching television",
    "8. Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
    "9. Thoughts that you would be better off dead or of hurting yourself in some way",
    "10. If you checked off any problems, how difficult have those problems made it for you to do your work, take care of things at home, or get along with other people?",
]

const phq9SelectionOptions = [
    'Not at all',
    'Several days',
    'More than half days',
    'Nearly every day'
]

const phq9Q10SelectionOptions = [
    "Not difficult at all",
    "Somewhat difficult",
    "Very difficult",
    "Extremely difficult"
]

const initialState = {
    answers: [0,0,0,0,0,0,0,0,0,0],
}


class PHQ9 extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onSubmitPHQ9 = () => {
        this.props.onSubmitPHQ9(this.state.answers);
    }

    onSelectAnswer = (event) => {
        // get current state's answers
        let answers = this.state.answers;
        // update proper index (event.target.id is the correct index)
        answers[event.target.id] = Number(event.target.value);
        // use object.assign to assign the new array to update the state's answers.
        this.setState(Object.assign(this.state.answers, answers));
    }

    getFooters = () => {
        return [
            ! this.props.submissionResult 
            ? ''
            : this.props.submissionResult === 'PHQ-9 submission successful.'
            ? <p className='SubmissionSuccess'>{this.props.submissionResult}</p>
            : <p className='SubmissionFailed'>{this.props.submissionResult}</p>,
            <button 
                className="SubmitButton"
                onClick={this.onSubmitPHQ9}
            >Submit
            </button>
        ]
    }

    render() {
        const rows = phq9Questions.map((question, index) => {
            var selection;
            if (index < 9) {
                selection = <SelectionBox
                    
                    id={index}
                    key={index}
                    label={'select answer for question ' + (index+1)}
                    value={this.state.answers[index]}
                    options={phq9SelectionOptions}
                    onChange={this.onSelectAnswer}
                />
            } else {
                selection = <SelectionBox
                    id={index}
                    key={index}
                    label={'select answer for question ' + (index+1)}
                    value={this.state.answers[index]}
                    options={phq9Q10SelectionOptions}
                    onChange={this.onSelectAnswer}
                />
            }
            return [question, selection];
        })

        

        return (
            <section 
               className="PHQ9Section"
            >
                <h1 className="PHQ9Title">PHQ-9</h1>
                <p className="PHQ9Description">
                    The Patient Health Questionnaire (PHQ-9) is a multipurpose tool used for screening, diagnosing, and monitoring
                    the severity of depression.
                </p>
                <Table
                    tClass="TableClass"
                    trClass="TableRow"
                    tdClass="TableCell"
                    thClass="TableHeader"
                    tfClass="TableFooter"
                    headers={phq9Headers}
                    rows={rows}
                    footers={this.getFooters()}
                    // thClass="TableHeaders"
                    // thClass= "fw6 tl pa3 bg-white bb br"
                    // tdClass="pa3 tl bb br"
                    // tClass="f6 ma2 pa2 w-100 mw8 center lh-copy"
                    // trClass="striped--moon-gray"
                    // tfClass="pa3 tr bb br"
                />
                <p>{this.state.total}</p>
            </section>
        )
    }
}

export default PHQ9;