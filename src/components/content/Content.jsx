import { useEffect, useRef, useState } from "react";
import "./content.scss";
import xmark from "../../assets/images/x-mark.svg";

function Content() {
  const [modalVisible, setModalVisible] = useState(false);
  const [columnNames, setColumnNames] = useState(["Todo", "Doing", "Done"]);
  const modalRef = useRef();

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
      <div className="content">
        <div className="contentContainer">
          <div className="columns">
            <div className="column">
              <h4 className="columnName">Todo (4)</h4>
              <div className="tasks">
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
              </div>
            </div>
            <div className="column">
              <h4 className="columnName">Doing (2)</h4>
              <div className="tasks">
                <div className="task">
                  <h3>Build UI for onboarding flow </h3>
                  <p>1 of 3 subtasks</p>
                </div>
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
              </div>
            </div>
            <div className="column">
              <h4 className="columnName">Doing (2)</h4>
              <div className="tasks">
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
                <div className="task">
                  <h3>Build UI for onboarding flow</h3>
                  <p>1 of 3 subtasks</p>
                </div>
              </div>
            </div>

            <div className="addColumnButton" onClick={handleNewColumn}>
              <p>+ New Column</p>
            </div>

            {modalVisible && (
              <div className="modalBackdrop">
                <div className="modal" ref={modalRef}>
                  <h3>Edit board</h3>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="name">Board Name</label> <br />
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="e.g. Web Design"
                      value="Platform Launch"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
