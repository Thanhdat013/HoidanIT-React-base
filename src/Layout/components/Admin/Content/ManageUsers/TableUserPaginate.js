import ReactPaginate from "react-paginate";

const TableUserPaginate = ({
  listUser,
  handleClickUpdate,
  handleClickViewDetail,
  handleClickDelete,
  fetchListUsersWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageClick = (e) => {
    fetchListUsersWithPaginate(+e.selected + 1);
    setCurrentPage(+e.selected + 1);
    console.log(`User requested page number ${e.selected}, which is offset `);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickViewDetail(item)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleClickUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClickDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan="4">Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
