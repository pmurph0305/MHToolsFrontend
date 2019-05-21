import React from "react";

import InputRange from "../../Components/InputRange/InputRange";
import InputText from "../../Components/InputText/InputText";
import InputTextArea from "../../Components/InputTextArea/InputTextArea";

class CBTEventForm extends React.Component {
  render() {
    const { onSubmit, cbtSituation } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <InputText
          inputDesc="Situation"
          placeholder="Enter a short description of the situation"
          idAndName="cbtSituation"
          defaultValue={cbtSituation}
        />
        {/* <div className="form-input-container">
          <label className="form-label" htmlFor="cbtAutomaticThoughts">
            Automatic Negative Thoughts
          </label>
          <textarea
            className="form-input-textarea"
            type="text"
            placeholder="Enter automatic negative thoughts you had when the situation took place, or when thinking about the situation."
            name="cbtAutomaticThoughts"
          />
        </div> */}
        <InputTextArea
          idAndName={"cbtAutomaticThoughts"}
          inputDesc={"Automatic Thoughts"}
          inputExpl={
            "Write down some automatic thoughts and predictions you had about the situation."
          }
          placeholder={
            "I'm going to embarass myself. Everyone is going to laugh at me and think I'm stupid. I should have prepared more."
          }
        />
        <InputRange
          idAndName={"cbtBeforeRange"}
          inputDesc={
            "Rate your belief in your automatic thoughts and predictions when the situation happened."
          }
          startDesc={"Less"}
          endDesc={"More"}
        />

        <InputRange
          idAndName={"cbtAfterRange"}
          inputDesc={
            "Rate your belief in your automatic thoughts and predictions now."
          }
          startDesc={"Less"}
          endDesc={"More"}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CBTEventForm;
