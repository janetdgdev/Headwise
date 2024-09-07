import { Button } from "components/Common/Button";

export function Form({Children}) {
  return (
    <div className="content">
      <h3 className="form-title">{Children}</h3>
      <form className="editor-form">
        <label htmlFor="fname">{Children}</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">{Children}</label>
        <input type="text" id="lname" name="lname" />
        <label htmlFor="fname">{Children}</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">{Children}</label>
        <input type="text" id="lname" name="lname" />
        <label htmlFor="fname">{Children}</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">{Children}</label>
        <input type="text" id="lname" name="lname" />
        <label htmlFor="fname">{Children}</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">{Children}</label>
        <input type="text" id="lname" name="lname" />
      </form>
      <Button>Save</Button>
    </div>
  );
}
