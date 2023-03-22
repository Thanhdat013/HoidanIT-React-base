const TableQuizzes = ({ listQuiz, handleClickDeleteQuiz }) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Difficult</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan="4">Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuizzes;
