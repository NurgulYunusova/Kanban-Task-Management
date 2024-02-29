import "./header.scss";

function Header() {
  return (
    <>
      <header>
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
            <h3>Platform Launch</h3>
          </div>

          <div className="rightSide">
            <button>+ Add New Task</button>
            <div className="menu">
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308" />
                  <circle cx="2.308" cy="10" r="2.308" />
                  <circle cx="2.308" cy="17.692" r="2.308" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
