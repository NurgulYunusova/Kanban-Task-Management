/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import "./header.scss";
import xmark from "../../assets/images/x-mark.svg";
import { TaskContext } from "../../context/TaskContext";
import { DarkModeContext } from "../../context/DarkModeContext";

function Header() {
  const { boards, setBoards } = useContext(TaskContext);
  const { darkMode } = useContext(DarkModeContext);

  const activeBoardIndex = boards.findIndex((b) => b.isActive);
  const board = boards?.find((board) => board.isActive == true);
  const columns = board?.columns;

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [columnNames, setColumnNames] = useState([]);
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
  }, [board]);

  useEffect(() => {
    let newColumns = columns?.map((column) => column.name);
    setColumnNames(newColumns);
  }, [columns]);

  const handleInputChange = (index, e) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = e.target.value;
    setSubtasks(updatedSubtasks);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const deleteButton = () => {
    setIsDeleteOpen(true);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    const remainingBoards = boards.filter((board) => board.isActive !== true);

    if (remainingBoards.length > 0) {
      remainingBoards[0].isActive = true;
    }

    setBoards(remainingBoards);

    closeDeleteModal();
  };

  const handleEdit = () => {
    setEditModalVisible(true);
    setIsEditOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBoards = [...boards];
    const activeBoard = updatedBoards[activeBoardIndex];

    activeBoard.name = boardName;
    activeBoard.columns = columns
      .filter((column, index) => columnNames[index])
      .map((column, index) => ({
        ...column,
        name: columnNames[index],
      }));

    updatedBoards[activeBoardIndex] = activeBoard;

    setBoards(updatedBoards);

    setEditModalVisible(false);
  };

  const handleAddColumn = () => {
    const newColumn = { name: "" };

    const updatedColumns = [...columns, newColumn];

    setColumnNames([...columnNames, ""]);

    const updatedBoard = { ...board, columns: updatedColumns };
    const updatedBoards = [...boards];

    updatedBoards[activeBoardIndex] = updatedBoard;

    setBoards(updatedBoards);
  };

  const handleAddNewTask = () => {
    setModalVisible(true);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const subtaskObjects = subtasks.map((subtask) => ({
      title: subtask,
      isCompleted: false,
    }));

    const newTask = {
      title: taskName,
      status: selectedStatus,
      subtasks: subtaskObjects,
    };

    const columnIndex = boards[activeBoardIndex].columns.findIndex(
      (column) => column.name === selectedStatus
    );

    if (columnIndex !== -1) {
      boards[activeBoardIndex].columns[columnIndex].tasks.push(newTask);

      setBoards([...boards]);

      setTaskName("");
      setDescription("");
      setSubtasks(["", ""]);
      setBoardName("");
      setColumnNames([]);
    }

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
        setColumnNames(columns?.map((column) => column.name || []));
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
              {boards
                .filter((board) => board.isActive)
                .map((board, index) => (
                  <span key={index}>{board.name}</span>
                ))}
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
                      required
                    />{" "}
                    <br />
                    <label htmlFor="description">Description</label> <br />
                    <textarea
                      name="description"
                      id="description"
                      rows="7"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                    <label htmlFor="boardColumns">Subtasks</label>
                    {subtasks.map((subtask, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          name={`subtask-${index}`}
                          id={`subtask-${index}`}
                          value={subtask || ""}
                          onChange={(event) => handleInputChange(index, event)}
                          required
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
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {columns?.map((column, index) => (
                        <option value={column.name} key={index}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                    <button className="createTaskBtn">Create Task</button>
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
                      <button className="saveChangesBtn">Save Changes</button>
                    </form>
                  </div>
                </div>
              )}

              {isDeleteOpen && (
                <div className="deleteModal">
                  <div className="modalContent">
                    <h4>Delete this board?</h4>
                    <p>
                      Are you sure you want to delete the "Platform Launch"
                      board? This action will remove all columns and tasks and
                      cannot be reversed.
                    </p>
                    <div className="modalActions">
                      <button onClick={handleDelete} id="delete">
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
