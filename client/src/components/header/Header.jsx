/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import "./header.scss";
import xmark from "../../assets/images/x-mark.svg";
import { DarkModeContext } from "../../context/DarkModeContext";
import { UserContext } from "../../context/UserContext";

function Header() {
  const { boards, setBoards, activeIndex, deleteBoard } =
    useContext(UserContext);
  const { darkMode } = useContext(DarkModeContext);

  const board = boards?.find((board) => board.isActive == true);

  const [columns, setColumns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(columns[0]?.name);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState(["", ""]);

  const modalRef = useRef();

  useEffect(() => {
    setBoardName(board?.name);
    setColumns(board?.columns);
  }, [board]);

  const handleInputChange = (index, e) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };

  const handleColumnInputChange = (index, e) => {
    const updatedColumns = [...columns];

    updatedColumns[index] = {
      ...updatedColumns[index],
      name: e.target.value,
    };

    setColumns(updatedColumns);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const deleteButton = () => {
    setIsDeleteOpen(true);
    setIsEditOpen(false);
  };

  const handleDelete = (id) => {
    deleteBoard(id);

    closeDeleteModal();
  };

  const handleEdit = () => {
    setEditModalVisible(true);
    setIsEditOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      boardName.trim().length === 0 ||
      columns.some((column) => column.name.trim().length === 0)
    ) {
      return;
    }

    const updatedBoards = [...boards];
    const activeBoard = updatedBoards[activeIndex];

    activeBoard.name = boardName;
    activeBoard.columns = columns;

    setBoards(updatedBoards);
    setEditModalVisible(false);
  };

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      {
        name: "",
        tasks: [],
      },
    ]);
  };

  const handleAddNewTask = () => {
    setModalVisible(true);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (
      taskName.trim().length === 0 ||
      subtasks.some((subtask) => subtask.trim().length === 0)
    ) {
      return;
    }

    const subtaskObjects = subtasks.map((subtask) => ({
      title: subtask,
      isCompleted: false,
    }));

    const newTask = {
      title: taskName,
      status: selectedStatus,
      subtasks: subtaskObjects,
      description: description.length !== 0 ? description : "",
    };

    let columnIndex = boards[activeIndex].columns.findIndex(
      (column) => column.name === selectedStatus
    );

    if (columnIndex === -1) {
      columnIndex = 0;
    }

    boards[activeIndex].columns[columnIndex].tasks.push(newTask);

    setBoards([...boards]);

    setTaskName("");
    setDescription("");
    setSubtasks(["", ""]);
    setBoardName("");
    setSelectedStatus(boards[activeIndex].columns[0].name);
    setModalVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalVisible(false);
        setEditModalVisible(false);
        setTaskName("");
        setDescription("");
        setSubtasks(["", ""]);
        setBoardName(board?.name || "");
        setColumns(board?.columns);
      }
    };

    if (modalVisible || editModalVisible) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalVisible, editModalVisible]);

  return (
    <>
      <header className={darkMode ? "dark" : "light"}>
        <div className="container">
          <div className="leftSide">
            <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
              <g fill="#635FC7" fillRule="evenodd">
                <rect width="6" height="25" rx="2" />
                <rect opacity=".75" x="9" width="6" height="25" rx="2" />
                <rect opacity=".5" x="18" width="6" height="25" rx="2" />
              </g>
            </svg>
            <h3>kanban</h3>
          </div>

          <div className="middleSide">
            <h3>
              {boards &&
                boards
                  .filter((board) => board.isActive)
                  .map((board, index) => <span key={index}>{board.name}</span>)}
            </h3>
          </div>

          <div className="rightSide">
            <button onClick={handleAddNewTask} className="addNewTaskBtn">
              + Add New Task
            </button>

            {modalVisible && (
              <div className="modalBackdrop">
                <div className="modal" ref={modalRef}>
                  <h3>Add New Task</h3>
                  <form onSubmit={(e) => handleTaskSubmit(e)}>
                    <label htmlFor="name">Task Name</label> <br />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g. Take coffee break"
                      onChange={(e) => setTaskName(e.target.value)}
                      value={taskName}
                    />
                    {taskName.length === 0 ? (
                      <div
                        style={{
                          height: "10px",
                          marginTop: "-10px",
                        }}
                      >
                        <p
                          style={{
                            color: "red",
                            fontSize: "10px",
                            marginTop: "0px",
                          }}
                        >
                          Can't be empty
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <label htmlFor="description">Description</label> <br />
                    <textarea
                      name="description"
                      id="description"
                      rows="7"
                      placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                    <label htmlFor="boardColumns">Subtasks</label>
                    {subtasks &&
                      subtasks.map((subtask, index) => (
                        <div key={index}>
                          <div className="input">
                            <input
                              type="text"
                              name={`subtask-${index}`}
                              id={`subtask-${index}`}
                              value={subtask || ""}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            />
                            <img
                              src={xmark}
                              alt="xmark"
                              onClick={() => {
                                const updatedSubtasks = [...subtasks];
                                updatedSubtasks.splice(index, 1);
                                setSubtasks(updatedSubtasks);
                              }}
                            />
                          </div>
                          {subtask.trim().length == 0 ? (
                            <div
                              style={{
                                height: "10px",
                                marginTop: "-3px",
                              }}
                            >
                              <p
                                style={{
                                  color: "red",
                                  fontSize: "10px",
                                  marginTop: "0",
                                }}
                              >
                                Can't be empty
                              </p>
                            </div>
                          ) : (
                            <div
                              style={{
                                height: "10px",
                                marginTop: "-3px",
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                    <button
                      className="addNewSubtaskBtn"
                      onClick={handleAddSubtask}
                    >
                      + Add New Subtask
                    </button>{" "}
                    <br />
                    <label htmlFor="status">Current Status</label> <br />
                    <select
                      id="selectOption"
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {columns?.map((column, index) => (
                        <option value={column.name} key={index}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                    <button className="createTaskBtn" type="submit">
                      Create Task
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="menu">
              <svg
                width="5"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setIsEditOpen(!isEditOpen)}
              >
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>

              {isEditOpen && (
                <div className="menuContent">
                  <ul>
                    <li className="edit" onClick={handleEdit}>
                      Edit board
                    </li>
                    <li className="delete" onClick={deleteButton}>
                      Delete board
                    </li>
                  </ul>
                </div>
              )}

              {editModalVisible && (
                <div className="modalBackdrop">
                  <div className="modal" ref={modalRef}>
                    <h3>Edit board</h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <label htmlFor="name">Board Name</label> <br />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="e.g. Web Design"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                      />
                      {boardName.length === 0 ? (
                        <div
                          style={{
                            height: "10px",
                            marginTop: "-10px",
                          }}
                        >
                          <p
                            style={{
                              color: "red",
                              fontSize: "10px",
                              marginTop: "0px",
                            }}
                          >
                            Can't be empty
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <label htmlFor="boardColumns">Board Columns</label>
                      {columns &&
                        columns.map((column, index) => (
                          <div key={index}>
                            <div className="input">
                              <input
                                type="text"
                                name={`column-${index}`}
                                id={`column-${index}`}
                                value={column.name}
                                onChange={(event) => {
                                  handleColumnInputChange(index, event);
                                }}
                              />
                              {
                                <img
                                  src={xmark}
                                  alt="xmark"
                                  onClick={() => {
                                    const updatedColumns = [...columns];
                                    updatedColumns.splice(index, 1);
                                    setColumns(updatedColumns);
                                  }}
                                />
                              }
                            </div>
                            {column.name.trim().length == 0 ? (
                              <div
                                style={{
                                  height: "10px",
                                  marginTop: "-3px",
                                }}
                              >
                                <p
                                  style={{
                                    color: "red",
                                    fontSize: "10px",
                                    marginTop: "0",
                                  }}
                                >
                                  Can't be empty
                                </p>
                              </div>
                            ) : (
                              <div
                                style={{
                                  height: "10px",
                                  marginTop: "-3px",
                                }}
                              ></div>
                            )}
                          </div>
                        ))}
                      <div
                        className="addNewColumnBtn"
                        onClick={handleAddColumn}
                      >
                        + Add New Column
                      </div>
                      <button className="saveChangesBtn" type="submit">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {isDeleteOpen && (
                <div className="deleteModal">
                  <div className="modalContent">
                    <h4>Delete this board?</h4>
                    <p>
                      Are you sure you want to delete the "{board.name}" board?
                      This action will remove all columns and tasks and cannot
                      be reversed.
                    </p>
                    <div className="modalActions">
                      <button
                        onClick={() => handleDelete(board._id)}
                        id="delete"
                      >
                        Delete
                      </button>
                      <button onClick={closeDeleteModal} id="cancel">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
