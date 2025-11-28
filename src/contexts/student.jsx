import { createContext, useState, useReducer } from "react";

export const StudentCtx = createContext();

const  studentReducer = (state , action) => {
    switch (action.type) {
        case "change_student_name" : {
            return {
                ...state,
                studentName: action.payload,
            }
        }
        case "Create_student" : {
            const newStudent = {
                id: Date.now() + "",
                name: state.studentName,
            };
            return {
                ...state,
                students: [...state.students, newStudent],
                studentName : "",
            }
        }
        case "edit_student" : {
            return{
                ...state,
                editMode :true,
                editableStudent : action.payload,
                studentName : action.payload.name,
            }
        }
        case "update_student" : {
            return {
                ...state,
                students: state.students.map((item) => {
                    if (item.id === state.editableStudent.id){
                        return {...item, name :state.studentName};
                    }
                    return item;
                }),
                editMode: false,
                editableStudent: null,
                studentName: "",
            }
        }
        case "remove_student" : {
            return {
                ...state,
                students: state.students.filter(
                    (student) => student.id != action.payload
                )
            }
        }
        case "change_isPresent_student" : {
            return{
                ...state,
                students: state.students.map((item) => {
                    if (item.id === action.payload.id ){
                        return {...item, present: action.payload.present};
                    }
                    return item
                })
            }
        }
        default : {
            return state
        }
    }
};

const initState = {
    studentName: "",
    students: [],
    editMode: false,
    editableStudent: null,
}


const StudentProvider = ({ children }) => {
    
    const [studentStates, dispatch] = useReducer(studentReducer, initState)
    const changeNameHandler = (e) => {
        dispatch({type: "change_student_name" , payload: e.target.value});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (studentStates.studentName.trim() === "") {
            return alert("Please provide a valid name");
        }

        studentStates.editMode ? 
        dispatch({type: "update_student"})
        : dispatch ({type: "Create_student"})
    };

    
    const makePresent = (student) => {
        if (student.present !== undefined) {
            return alert(
                `This student is already in the ${student.present == true ? "Present List" : "Absent List"} list.`
            );
        }
        
        dispatch({type : "change_isPresent_student" , payload: {id : student.id, present:true}})
    };


    const makeAbsent = (student) => {
        if (student.present !== undefined) {
            return alert(
                `This student is already in the ${student.present ? "Present" : "Absent"} list.`
            );
        }
        dispatch({type : "change_isPresent_student" , payload: {id : student.id, present:false}})
    };

    const toggleList = (student) => {
        dispatch({type : "change_isPresent_student" , payload: {id : student.id, present: !student.present }})
    };

    
    // const [students, setStudents] = useState([]);
    // const [studentName, setStudentName] = useState("");
    // const [editMode, setEditMode] = useState(false);
    // const [editableStudent, setEditableStudent] = useState(null);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     if (studentName.trim() === "") {
    //         return alert("Please provide a valid name");
    //     }

    //     if (editMode) {
    //         updateHandler();
    //     } else {
    //         createHandler();
    //     }
    // };

    // const createHandler = () => {
    //     const newStudent = {
    //         id: Date.now().toString(),
    //         name: studentName,
    //         present: undefined,
    //     };
    //     setStudents([...students, newStudent]);
    //     setStudentName("");
    // };

    // const updateHandler = () => {
    //     const updatedList = students.map((item) =>
    //         item.id === editableStudent.id ? { ...item, name: studentName } : item
    //     );
    //     setStudents(updatedList);
    //     setEditMode(false);
    //     setEditableStudent(null);
    //     setStudentName("");
    // };

    // const editHandler = (student) => {
    //     setEditMode(true);
    //     setEditableStudent(student);
    //     setStudentName(student.name);
    // };

    // const removeHandler = (studentId) => {
    //     const updatedList = students.filter((student) => student.id !== studentId);
    //     setStudents(updatedList);
    // };

    // const makePresent = (student) => {
    //     if (student.present !== undefined) {
    //         return alert(
    //             `This student is already in the ${student.present ? "Present" : "Absent"} list.`
    //         );
    //     }
    //     const updatedList = students.map((item) =>
    //         item.id === student.id ? { ...item, present: true } : item
    //     );
    //     setStudents(updatedList);
    // };

    // const makeAbsent = (student) => {
    //     if (student.present !== undefined) {
    //         return alert(
    //             `This student is already in the ${student.present ? "Present" : "Absent"} list.`
    //         );
    //     }
    //     const updatedList = students.map((item) =>
    //         item.id === student.id ? { ...item, present: false } : item
    //     );
    //     setStudents(updatedList);
    // };

    // const toggleList = (student) => {
    //     const updatedList = students.map((item) =>
    //         item.id === student.id ? { ...item, present: !item.present } : item
    //     );
    //     setStudents(updatedList);
    // };


    const ctxValue = {
        studentStates,
        dispatch,
        changeNameHandler,
        submitHandler,
        makePresent,
        makeAbsent,
        toggleList,
    };

    return (
        <StudentCtx.Provider value={ctxValue}>
            {children}
        </StudentCtx.Provider>
    );
};

export default StudentProvider;
