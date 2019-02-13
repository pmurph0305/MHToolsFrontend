import React from 'react';
import Table from '../../Components/Table/Table'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'



class PHQ9 extends React.Component {
    


    constructor(props) {
        super(props);
        this.state = {
            questions:  [
                'Little interest or pleasure in doing things',
                'Feeling down, depressed, or hopeless',
                'Trouble falling asleep, staying asleep, or sleeping too much'
            ],
            answers: [0,0,0,0,0,0,0,0,0,0]
        }
    }
    
    onSubmitPHQ9 = () => {
        console.log("SUBMIT");
    }

    onSelectAnswer = (event) => {
        console.log("Answer selected:" + event + " value:" + event.target.value)
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.key);
    }

    render() {

        const selectionOptions = [
            'Not at all',
            'Several days',
            'More than half days',
            'Nearly every day'
        ]


        const selectionBoxes = this.state.questions.map((question, index) => {
            return <SelectionBox
                id={index}
                key={index}
                options={selectionOptions}
                onChange={this.onSelectAnswer}
            />
        })

    



        
        const headers = [
            'Over the past 2 weeks, how often have you been bothered by any of the following problems?',
            'Select an answer'
        ]

        return (
            <section className="ma0 pa2-ns bt black-90 bg-light-gray tc">
                <h1 className="ma1 mh2 ">PHQ-9</h1>
                <p className="ma2 mh4">The phq-9 is a standard form for diagnosing and monitoring depression</p>
                <Table
                    headers={headers}
                    columns={[this.state.questions, selectionBoxes]}
                />
                <button 
                    className='f6 pointer dim ph3 pv2 mb2 dib white bg-black'
                    onClick={this.onSubmitPHQ9}
                >
                    Submit
                </button>
            </section>
        )
    }
}


export default PHQ9;