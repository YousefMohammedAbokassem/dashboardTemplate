import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slices/auth/authSlice";

export default function SocialProducts({
  loading,
  todos,
  setTodos,
  navigate,
  fetchTodos,
}) {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTodos = Array.from(todos);
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    updatedTodos.splice(result.destination.index, 0, reorderedItem);
    setTodos(updatedTodos);
    const fetchTodo = updatedTodos.map((todo, i) => {
      return {
        id: todo.id,
        sort: i + 1,
      };
    });

    try {
      // إرسال طلب إلى الخادم لتحديث ترتيب العناصر
      await axios.post(
        `${process.env.REACT_APP_API_URL}admin/socialMedia/sort_images`,
        {
          sort: JSON.stringify(fetchTodo),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      // تحديث العناصر في الواجهة المستخدم
    } catch (error) {
      console.error("Error updating todos:", error);
      if (error.response.status === 401) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };

  //   change page table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //   delete
  const [deleteItemId, setDeleteItemId] = useState(null);

  const deleteTodo = async (id) => {
    setDeleteItemId(id);
    try {
      await axios.get(
        `${process.env.REACT_APP_API_URL}admin/socialMedia/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // refresh api in the page
      await fetchTodos();
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setDeleteItemId(null);

      if (error.response.status === 401) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };
  return (
    <div className="table-responsive DivSubTable fontChangeSmall">
      <table className="table subTable table table-striped table-hover">
        {/* <caption>List of users</caption> */}
        <thead>
          <tr className="text-center">
            <th scope="col">{t("Image")}</th>
            {/* <th scope="col">{t("arabic")}</th>
                <th scope="col">{t("english")}</th>
                <th scope="col">{t("orderNumber")}</th> */}
            <th scope="col">{t("Delete")}</th>
          </tr>
        </thead>
        {loading ? (
          <div className="text-center noData">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : todos.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <>
              <>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {todos
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )

                        .map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <td scope="row">
                                  {item.image_url && (
                                    <img
                                      className="tableImg"
                                      src={`${process.env.REACT_APP_API_URL_IMAGE}${item.image_url}`}
                                      alt="Item"
                                    />
                                  )}
                                </td>
                                <td>
                                  <div
                                    className="d-flex"
                                    style={{
                                      width: "fit-content",
                                      margin: "0 auto",
                                    }}
                                  >
                                    {deleteItemId === item.id ? (
                                      <span
                                        className="spinner-border spinner-border-sm mainColorText"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                    ) : (
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => deleteTodo(item.id)}
                                        className="mainColorText pointer"
                                        size="lg"
                                      />
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </>
            </>
          </DragDropContext>
        ) : (
          <div className="noData fw-bold text-capitalize text-center position-absolute">
            {t("noData")}
          </div>
        )}
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={todos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "var(--clr-product)" }} // يتم تعيين لون النص لجميع الأبناء هنا
      />
    </div>
  );
}
