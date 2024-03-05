import "./content.scss";

function Content() {
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

            <div className="addColumnButton">
              <p>+ New Column</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
