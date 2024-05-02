import { useContext, useEffect, useRef, useState } from "react";
import "./emptyBoard.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import xmark from "../../assets/images/x-mark.svg";
import { TaskContext } from "../../context/TaskContext";

function EmptyBoard() {
  const { createBoards } = useContext(TaskContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [columnNames, setColumnNames] = useState(["Todo", "Doing"]);

  const modalRef = useRef();

  const { handleSubmit, handleChange, values, setValues, resetForm, errors } =
    useFormik({
      initialValues: {
        name: "",
        columns: [],
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Can't be empty"),
        columns: Yup.array()
          .of(Yup.string().required("Can't be empty"))
          .required("At least one column is required"),
      }),
      onSubmit: ({ name, columns }) => {
        createBoards({
          name: name,
          isActive: true,
          columns: columns.map((column) => ({ name: column, tasks: [] })),
        });

        setModalVisible(false);

        resetForm({
          name: "",
          columns: columnNames,
        });
      },
    });

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      columns: columnNames,
    }));
  }, [columnNames, setValues]);

  const handleAddNewBoard = () => {
    setModalVisible(true);
    setColumnNames(["Todo", "Doing"]);
  };

  const handleAddColumn = () => {
    setColumnNames([...columnNames, ""]);
  };

  return (
    <>
      <div className="noBoardsPage">
        <div className="noBoardsPageContainer">
          <h2>
            There are no boards available. Create a new board to get started
          </h2>
          <button onClick={handleAddNewBoard} className="addNewBoardBtn">
            + Add New Board
          </button>
        </div>

        {modalVisible && (
          <div className="modalBackdrop">
            <div className="modal" ref={modalRef}>
              <h3>Add new board</h3>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Board Name</label> <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. Web Design"
                  onChange={handleChange}
                  value={values.name}
                />
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
                      marginTop: "-10px",
                    }}
                  >
                    {errors?.name}
                  </p>
                </div>
                <label htmlFor="boardColumns">Board Columns</label>
                {columnNames.map((columnName, index) => (
                  <div key={index}>
                    <div className="input">
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
                    <div
                      style={{
                        height: "10px",
                        marginTop: "0px",
                      }}
                    >
                      <p
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginTop: "-3px",
                        }}
                      >
                        {errors?.columns && errors.columns[index]}
                      </p>
                    </div>
                  </div>
                ))}
                <button
                  className="addNewColumnBtn"
                  onClick={handleAddColumn}
                  type="button"
                >
                  + Add New Column
                </button>{" "}
                <br />
                <button className="createNewBoardBtn" type="submit">
                  Create New Board
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EmptyBoard;
