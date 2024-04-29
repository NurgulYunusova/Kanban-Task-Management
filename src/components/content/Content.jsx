/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import "./content.scss";
import xmark from "../../assets/images/x-mark.svg";
import { TaskContext } from "../../context/TaskContext";
import { DarkModeContext } from "../../context/DarkModeContext";
import { HideSidebarContext } from "../../context/HideSidebarContext";
import showSidebar from "../../assets/images/show-sidebar.svg";

function Content() {
  const { boards, setBoards, setActiveIndex, activeIndex } =
    useContext(TaskContext);
  const { darkMode } = useContext(DarkModeContext);
  const { isSidebarHidden, hideSidebar } = useContext(HideSidebarContext);

  const board = boards?.find((board) => board.isActive == true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [task, setTask] = useState(null);
  const [boardName, setBoardName] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [columns, setColumns] = useState([]);

  const modalRef = useRef();

  useEffect(() => {
    setBoardName(board?.name);
    setColumns(board?.columns);
  }, [board]);

  useEffect(() => {
    setSelectedStatus(columns[0]?.name);
  }, [columns]);

  useEffect(() => {
    setTaskName(task?.title);
    setDescription(task?.description);
    setSubtasks(task?.subtasks.map((q) => q));
  }, [task]);

  const handleNewColumn = () => {
    setModalVisible(true);
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
    setModalVisible(false);
  };

  const openTaskModal = (data) => {
    setTaskModalVisible(true);
    setSelectedStatus(data.status);
    setTask(data);
  };

  const handleInputClick = (index) => {
    const subtask = task.subtasks.find((subtask, i) => i === index);

    subtask.isCompleted = !subtask.isCompleted;
  };

  const handleAddSubtask = () => {
    setSubtasks([
      ...subtasks,
      {
        title: "",
        isCompleted: false,
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const updatedSubtasks = [...subtasks];

    updatedSubtasks[index] = {
      ...updatedSubtasks[index],
      title: e.target.value,
    };

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

  const deleteButton = () => {
    setIsDeleteOpen(true);
    setMenuModalVisible(false);
  };

  const editButton = () => {
    setIsEditOpen(true);
    setMenuModalVisible(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const handleDelete = () => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((t) => t.title !== task.title),
    }));

    const updatedBoards = boards.map((board, index) => ({
      ...board,
      columns: index === activeIndex ? updatedColumns : board.columns,
    }));

    setBoards(updatedBoards);
    setActiveIndex(0);

    closeDeleteModal();
    setTaskModalVisible(false);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    task.title = taskName;
    task.description = description;
    task.subtasks = subtasks;

    if (task.status !== selectedStatus) {
      changeStatus();
      task.status = selectedStatus;
    }

    const updatedBoards = boards.map((board, index) => ({
      ...board,
      columns: index === activeIndex ? columns : board.columns,
    }));

    setBoards(updatedBoards);
    setIsEditOpen(false);
    setTaskModalVisible(false);
  };

  const changeStatus = () => {
    if (task && selectedStatus !== task.status) {
      const updatedBoards = [...boards];
      const columnIndex = columns.findIndex((col) => col.name === task.status);
      const taskIndex = columns[columnIndex].tasks.findIndex(
        (t) => t.title === task.title
      );

      if (taskIndex !== -1) {
        const updatedTask = { ...task, status: selectedStatus };
        columns[columnIndex].tasks.splice(taskIndex, 1);
        const newColumnIndex = columns.findIndex(
          (col) => col.name === selectedStatus
        );
        columns[newColumnIndex]?.tasks?.push(updatedTask);
        setBoards(updatedBoards);
      }

      setTaskModalVisible(false);
      setSelectedStatus("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (modalVisible || taskModalVisible) &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModalVisible(false);
        setTaskModalVisible(false);
        setIsEditOpen(false);
        setTask(null);
        setColumns(board?.columns);
      }
    };

    if (modalVisible || taskModalVisible) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    modalVisible,
    taskModalVisible,
    selectedStatus,
    boards,
    activeIndex,
    setBoards,
    task,
    columns,
    board,
  ]);

  return (
    <>
      <div
        className={`content ${darkMode ? "dark" : "light"} ${
          isSidebarHidden ? "hide" : ""
        }`}
      >
        {isSidebarHidden ? (
          <div className="showSidebar" onClick={hideSidebar}>
            <img src={showSidebar} alt="Show Sidebar" />
          </div>
        ) : (
          ""
        )}
        <div className="contentContainer">
          <div className="columns">
            {board?.columns?.map((column, index) => (
              <div className="column" key={index}>
                <h4 className="columnName">
                  {column?.name}({column.tasks?.length})
                </h4>
                <div className="tasks">
                  {column.tasks?.map((task, index) => (
                    <div
                      className="task"
                      key={index}
                      onClick={() => openTaskModal(task)}
                      draggable
                    >
                      <h3>{task.title}</h3>
                      <p>
                        {
                          task.subtasks.filter((subtask) => subtask.isCompleted)
                            .length
                        }{" "}
                        of {task.subtasks.length} subtasks
                      </p>
                    </div>
                  ))}{" "}
                </div>
              </div>
            ))}

            {taskModalVisible && (
              <div className="modalBackdrop">
                <div className="modal" ref={modalRef}>
                  <div className="topSection">
                    <h3 className="taskTitle">{task?.title}</h3>
                    <div className="menu">
                      <svg
                        width="5"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setMenuModalVisible(!menuModalVisible)}
                      >
                        <g fill="#828FA3" fillRule="evenodd">
                          <circle cx="2.308" cy="2.308" r="2.308" />
                          <circle cx="2.308" cy="10" r="2.308" />
                          <circle cx="2.308" cy="17.692" r="2.308" />
                        </g>
                      </svg>

                      {menuModalVisible && (
                        <div className="menuContent">
                          <ul>
                            <li className="edit" onClick={() => editButton()}>
                              Edit task
                            </li>
                            <li
                              className="delete"
                              onClick={() => deleteButton()}
                            >
                              Delete task
                            </li>
                          </ul>
                        </div>
                      )}

                      {isEditOpen && (
                        <div className="modalBackdrop editModal">
                          <div className="modal" ref={modalRef}>
                            <h3>Edit Task</h3>
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
                              <br />
                              <label htmlFor="description">Description</label>
                              <br />
                              <textarea
                                name="description"
                                id="description"
                                rows="7"
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
                                        value={subtask.title || ""}
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
                                  </div>
                                ))}
                              <div
                                className="addNewSubtaskBtn"
                                onClick={handleAddSubtask}
                              >
                                + Add New Subtask
                              </div>
                              <label htmlFor="status">Current Status</label>{" "}
                              <br />
                              <select
                                id="selectOption"
                                value={selectedStatus}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
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

                      {isDeleteOpen && (
                        <div className="deleteModal">
                          <div className="modalContent">
                            <h4>Delete this board?</h4>
                            <p>
                              Are you sure you want to delete the "{taskName}"
                              task and its subtasks? This action cannot be
                              reversed.
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

                  {description && (
                    <div className="descriptionSection">
                      <p className="description">{description}</p>
                    </div>
                  )}

                  <div className="middleSection">
                    <p className="subtasksLength">
                      Subtasks (
                      {
                        task?.subtasks.filter((subtask) => subtask.isCompleted)
                          .length
                      }{" "}
                      of {task?.subtasks.length})
                    </p>
                    <ul className="subtasks">
                      {task?.subtasks.map((q, index) => (
                        <li
                          className={
                            q.isCompleted ? "subtask completed" : "subtask"
                          }
                          key={index}
                        >
                          <input
                            className="subtaskCheckbox"
                            type="checkbox"
                            defaultChecked={q.isCompleted ? true : false}
                            onClick={() => handleInputClick(index)}
                          ></input>
                          <p>{q.title}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bottomSection">
                    <label htmlFor="status">Current Status</label> <br />
                    <select
                      id="selectOption"
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      defaultValue={task?.status}
                    >
                      {columns?.map((column, index) => (
                        <option value={column.name} key={index}>
                          {column.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="changeStatus">
                    <button
                      className="changeStatusBtn"
                      type="submit"
                      onClick={changeStatus}
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="addColumnButton" onClick={handleNewColumn}>
              <p>+ New Column</p>
            </div>

            {modalVisible && (
              <div className="modalBackdrop">
                <div className="modal" ref={modalRef}>
                  <h3 className="editHeading">Edit board</h3>
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
                              value={column.name || ""}
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
                    <div className="addNewColumnBtn" onClick={handleAddColumn}>
                      + Add New Column
                    </div>
                    <button className="saveChangesBtn" type="submit">
                      Save Changes
                    </button>
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
