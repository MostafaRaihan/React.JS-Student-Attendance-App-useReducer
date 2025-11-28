import { useContext } from "react"
import {StudentCtx} from "../contexts/student"

const AbsentStudent = () => {
    const {studentStates, toggleList} = useContext(StudentCtx)
    return (
        <div>
            <div className="list absent-students">
                <h3>Absent Students</h3>
                    <ul>
                        {studentStates.students.filter(student => student.present === false).map(student => (
                            <li key={student.id}>
                                <span>{student.name}</span>
                                <button onClick={() => toggleList(student)}>✘</button>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    )
}

export default AbsentStudent