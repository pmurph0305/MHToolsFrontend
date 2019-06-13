import React from "react";

import SectionInfo from "../../Components/SectionInfo/SectionInfo";

import "./Homepage.scss";

class Homepage extends React.Component {
  render() {
    return (
      <section className="Homepage">
        <SectionInfo
          title={"Mental Health Tools"}
          description={
            "This website is designed to help you track, manage, and cope with mental health issues."
          }
        />
        <div className="tool-list-container">
          <div className="tool-item-container">
            <label htmlFor="dm-tool">Daily Maintenance</label>
            <p id="dm-tool">
              A list of tasks you need to get done throughout the day to stay
              healthy. Writing these down and remembering to do them daily is an
              important step towards wellness. An important thing to remember is
              that this is a list of things you must do to stay healthy, not
              things you would normally choose to do. Try to keep the list a
              reasonable length, so you can accomplish all the tasks each day.
              Some examples of tasks would be brushing your teeth, having a
              shower, taking medication, eating 3 meals, and 15 minutes of
              physical activity
            </p>
          </div>
          <div className="tool-item-container">
            <label htmlFor="phq9-tool">PHQ-9</label>
            <p id="phq9-tool">
              The Patient Health Questionnaire (PHQ-9) is a multipurpose tool
              used for screening, diagnosing, and monitoring the severity of
              depression. It is often used by psychiatrists to monitor a
              patients depression. Generally, the form is filled out for each
              appointment with a psychiatrist. To achieve something similar, use
              a specific day and time each week to submit the form.
            </p>
          </div>
          <div className="tool-item-container">
            <label htmlFor="cbt-tool">CBT</label>
            <p id="cbt-tool">
              A tool to use to train yourself to think more positively.
              Cognitive behavioral therapy focuses on challenging and changing
              unhelpful thinking styles. In this tool, a thought record is
              created for each specific events. You write down the event and
              negative thoughts of the event, and try your best to draw
              realistic evidence and conclusions about the event. Over time,
              this helps a person to more easily identify and challenge negative
              thoughts as well as cope with stressful events.
            </p>
          </div>
          <div className="tool-item-container">
            <label htmlFor="cs-tool">Coping Skills</label>
            <p id="cs-tool">
              A list of coping skills to use in situations to help tolerate
              stress and conflict. This tool allows you to create a list of
              coping skills to use when you are experiencing stressful events.
              You can create your own list by writing down your own coping
              skills, or adding skills that other people have created and
              shared.
            </p>
          </div>
          <div className="tool-item-container">
            <label htmlFor="history-tool">History</label>
            <p id="history-tool">
              A tool to use to track progress when using other tools available
              on this website. This tool allows you to track the usage of other
              tools provided on this website.
              <br />
              <br />Daily Maintenance history allows you to track the percent of
              tasks you marked as completed each day.
              <br />
              <br />PHQ-9 history allows you to track the score of your PHQ-9
              submissions over time.
              <br />
              <br />CBT history allows you to see what unhelpful thinking styles
              are most present in your thoughts, as well as showing how much you
              believe your negative thoughts before and after writing a thought
              record.
            </p>
            <p />
          </div>
        </div>
      </section>
    );
  }
}

export default Homepage;
