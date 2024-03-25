/* eslint-disable no-undef */
import { useContext, useEffect, useRef, useState } from "react";
import "./content.scss";
import xmark from "../../assets/images/x-mark.svg";
import { TaskContext } from "../../context/TaskContext";
import { DarkModeContext } from "../../context/DarkModeContext";

function Content() {
  const { boards } = useContext(TaskContext);
  const { darkMode } = useContext(DarkModeContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [columnNames, setColumnNames] = useState([]);

  const board = boards?.find((board) => board.isActive === true);
  const columns = board?.columns;

  const modalRef = useRef();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Board name is required"),
    }),
    onSubmit: (values) => {
      console.log("hello", values);
    },
  });

  const handleNewColumn = () => {
    setModalVisible(true);
  };

  const handleAddColumn = () => {
    setColumnNames([...columnNames, ""]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    if (modalVisible) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible]);

  return (
    <>
      <div className={darkMode ? "content dark" : "content light"}>
        <div className="contentContainer">
          <div className="columns">
            {columns?.map((column, index) => (
              <div className="column" key={index}>
                <h4 className="columnName">
                  {column?.name}({column.tasks?.length})
                </h4>
                <div className="tasks">
                  {column.tasks?.map((task, index) => (
                    <div className="task" key={index}>
                      <h3>{task.title}</h3>
                      <p>
                        {
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        }{" "}
                        of {task.subtasks.length} subtasks
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="addColumnButton" onClick={handleNewColumn}>
              <p>+ New Column</p>
            </div>

            {modalVisible && (
              <div className="modalBackdrop">
                <div className="modal" ref={modalRef}>
                  <h3>Edit board</h3>
                  <form onSubmit={handleSubmit}>
                    {boards
                      .filter((board) => board.isActive === true)
                      .map((q, index) => (
                        <span key={index}>
                          <label htmlFor="name">Board Name</label> <br />
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="e.g. Web Design"
                            value={q.name}
                            onChange={handleChange}
                            required
                          />{" "}
                          <br />
                          <label htmlFor="boardColumns">Board Columns</label>
                          {columnNames.map((columnName, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                name={`column-${index}`}
                                id={`column-${index}`}
                                value={columnName}
                                onChange={(e) => {
                                  const updatedColumns = [...columnNames];
                                  updatedColumns[index] = e.target.value;
                                  setColumnNames(updatedColumns);
                                }}
                                required
                              />
                              {
                                <img
                                  src={xmark}
                                  alt="xmark"
                                  onClick={() => {
                                    const updatedColumns = [...columnNames];
                                    updatedColumns.splice(index, 1);
                                    setColumnNames(updatedColumns);
                                  }}
                                />
                              }
                            </div>
                          ))}
                          <button
                            className="addNewColumnBtn"
                            onClick={handleAddColumn}
                          >
                            + Add New Column
                          </button>{" "}
                          <br />
                          <button className="saveChangesBtn">
                            Save Changes
                          </button>
                        </span>
                      ))}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
