import { useContext } from "react";
import { StudentCtx } from "../contexts/student";

const AllStudent = () => {
    const { studentStates, 
        dispatch, 
        makePresent, 
        makeAbsent 
    } = useContext(StudentCtx);

    return (
        <div>
            <h3>All Students</h3>

            <ul>
                {studentStates.students.map((student) => (
                    <li key={student.id}>
                        <button onClick={() => dispatch({ type: "edit_student", payload: student })}>
                            Edit
                        </button>

                        <button onClick={() => dispatch({ type: "remove_student", payload: student.id })}>
                            Delete
                        </button>

                        <button onClick={() => makePresent(student)}>Present</button>
                        <button onClick={() => makeAbsent(student)}>Absent</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllStudent;
