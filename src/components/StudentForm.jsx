import { useContext } from "react";
import { StudentCtx } from "../contexts/student";

const StudentForm = () => {

    const { 
        studentStates,
        changeNameHandler,
        submitHandler,
    } = useContext(StudentCtx);

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    value={studentStates.studentName}
                    onChange={changeNameHandler}
                />
                <button type="submit">
                    {studentStates.editMode ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
