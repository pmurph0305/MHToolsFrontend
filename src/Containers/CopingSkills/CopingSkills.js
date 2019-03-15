import React from 'react'
import Collapsible from '../../Components/Collapsible/Collapsible'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

let sharedSkills = [{
        description: "this is an example description coping skill",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet volutpat. Maecenas nunc felis, aliquam ac tellus id, gravida eleifend tellus. Pellentesque in lectus a arcu dapibus fermentum vel non quam. Morbi eros ipsum, elementum vitae ullamcorper eget, pellentesque id sapien. Vestibulum id ipsum nulla. Sed non est quis est aliquam pulvinar. Quisque at sagittis sapien. Sed porta leo sit amet ipsum hendrerit, consectetur tempor purus hendrerit. Sed eu sapien ultrices, auctor mi eu, varius purus. Maecenas nulla tellus, malesuada tempor tempus consequat, gravida et tellus. In non sapien hendrerit, aliquet nisl vitae, faucibus tortor. Etiam hendrerit est lacus. Nullam non egestas erat. Ut non sodales leo. Nulla ac euismod neque, ac ornare lectus. Donec nisl ipsum, imperdiet in pharetra vel, sodales ac nisl. Maecenas rhoncus ultrices justo, vel eleifend diam lobortis sed. Donec id fermentum lectus.",
        coping_id: 1,
        coping_rank: 1,    
    },
    {
        description: "This is the second example description coping skill.",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet volutpat. Maecenas nunc felis, aliquam ac tellus id, gravida eleifend tellus. Pellentesque in lectus a arcu dapibus fermentum vel non quam. Morbi eros ipsum, elementum vitae ullamcorper eget, pellentesque id sapien. Vestibulum id ipsum nulla. Sed non est quis est aliquam pulvinar. Quisque at sagittis sapien. Sed porta leo sit amet ipsum hendrerit, consectetur tempor purus hendrerit. Sed eu sapien ultrices, auctor mi eu, varius purus. Maecenas nulla tellus, malesuada tempor tempus consequat, gravida et tellus. In non sapien hendrerit, aliquet nisl vitae, faucibus tortor. Etiam hendrerit est lacus. Nullam non egestas erat. Ut non sodales leo. Nulla ac euismod neque, ac ornare lectus. Donec nisl ipsum, imperdiet in pharetra vel, sodales ac nisl. Maecenas rhoncus ultrices justo, vel eleifend diam lobortis sed. Donec id fermentum lectus.",
        coping_id: 2,
        coping_rank: 2,
    },
    {
    description: "This is the second example description coping skill.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla laoreet volutpat. Maecenas nunc felis, aliquam ac tellus id, gravida eleifend tellus. Pellentesque in lectus a arcu dapibus fermentum vel non quam. Morbi eros ipsum, elementum vitae ullamcorper eget, pellentesque id sapien. Vestibulum id ipsum nulla. Sed non est quis est aliquam pulvinar. Quisque at sagittis sapien. Sed porta leo sit amet ipsum hendrerit, consectetur tempor purus hendrerit. Sed eu sapien ultrices, auctor mi eu, varius purus. Maecenas nulla tellus, malesuada tempor tempus consequat, gravida et tellus. In non sapien hendrerit, aliquet nisl vitae, faucibus tortor. Etiam hendrerit est lacus. Nullam non egestas erat. Ut non sodales leo. Nulla ac euismod neque, ac ornare lectus. Donec nisl ipsum, imperdiet in pharetra vel, sodales ac nisl. Maecenas rhoncus ultrices justo, vel eleifend diam lobortis sed. Donec id fermentum lectus.",
    coping_id: 3,
    coping_rank: 3,
}]

    //let testData = []

let mySkills = [{
    description: "Counting things",
    text: "Count things around you, it doesn't matter what they are. Sounds, colors, objects, anything you want. Focus on counting.",
    coping_id: 1,
    coping_rank: 1,
    shared: false,    
},
{
    description: "DeepBreathing",
    text: "Breath deeply in and out for 30 seconds, focusing on only your beathing.",
    coping_id: 2,
    coping_rank: 2,
    shared: true,
}]

let displayedSkills = mySkills;

const initialState = {
    displayedSkills,
}

class CopingSkills extends React.Component {

    constructor(props) {
        super(props);
        this.state=initialState;
        this.onChangeSkillDisplay = this.onChangeSkillDisplay.bind(this);
    }

 

    onAddSkillClick(coping_id) {
        console.log("Add skill:", coping_id);
        let skill = displayedSkills.filter(skill => skill['coping_id'] === coping_id);
        console.log("Found skill:", skill)
        // Use action to send fetch to server to add to coping skills list.
    }

    onChangeSkillDisplay(event) {
        let expanded = document.getElementsByClassName('collapsibleContent')
        for (let i = 0; i < expanded.length; i++) {
            //expanded[i].style.transition = 'max-height 0s'
            expanded[i].style.maxHeight = null; 
        }
        console.log("CHANGE", event.target.value)
        if (Number(event.target.value) === 0) {
            console.log("change to my skills")
            displayedSkills = mySkills;
            console.log(displayedSkills);
            // display user's coping skills
        } else {
            console.log("change to shared")
            displayedSkills = sharedSkills;
            // display shared coping skills
        }
        this.setState({displayedSkills: displayedSkills})
    }


    

    onCollapisbleClick(index) {
        console.log("click: " + index)
        // Get element for the skill clicked on.
        let description = document.getElementById('cDesc_'+index);
        let text = document.getElementById('cText_'+index);
        // Set max height to add transition to expanding card.
        // Move border from bottom of description button to
        // bottom of the text to seperate it better from next coping skill.
        if (text.style.maxHeight) {
            console.log("b");
            text.style.maxHeight = null;
            // listener called once when transition ends to replace the borders.
            // text.addEventListener('transitionend', (e) => {
            // // description.style.borderBottom = '1px solid black';
            // //     e.target.style.borderBottom = '0px';
            // }, {once: true})
        } else {
            text.style.maxHeight = text.scrollHeight + 'px';
        }
    }


    render() {
        return( 
            <section className='ma0 pa1 pa3-ns bt black-90 bg-light-gray tc'>
                <h1 className='ma1 mh2'>Coping Skills</h1>
                <p className='ma2 mh4'>
                    A list of coping skills to use in situations to help tolerate stress and conflict.
                </p>
                <SelectionBox
                    className='black ma2 pa1 hover-bg-black-20 fl'
                    options={['My coping skills', 'Shared coping skills']}
                    onChange={this.onChangeSkillDisplay}

                />
                { displayedSkills.length
                ? displayedSkills.map((skill, index) => {
                    return <Collapsible
                        description = {skill['description']}
                        text={skill['text']}
                        index={index}
                        key={index}
                        coping_id={skill['coping_id']}

                        onExpand={this.onCollapisbleClick}
                        onAddSkill={this.onAddSkillClick}
                    />
                })
                : <div>no data</div>
                }
                
            </section>
        )
    }
}

export default CopingSkills;