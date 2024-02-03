import React, { useEffect, useState } from "react";
import "./style.css";
import "./bootstrap.min.css";
import { Loader } from "rsuite";
import {
  AngleDown,
  AngleUp,
  arrowLeft,
  arrowRight,
  chevronLeft,
  chevronRight,
} from "../../SvgsIcons/SvgsImages";

const TableLayout = ({ headers, data, searchHeaderKet }) => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [originalData, setOriginalData] = useState(data);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState();
  const [searchQuery, setSearchQuery] = useState({});
  const [sortQuery, setSortQuery] = useState({});
  useEffect(() => {
    setOriginalData(data);
  }, [data]);
  useEffect(() => {
    if (data && data?.length && Array?.isArray(data)) {
      setPagesNumber(Math.ceil(originalData?.length / 10));
      setPaginatedData(
        originalData?.filter(
          (item, index) => index >= (page - 1) * 10 && index < page * 10
        )
      );
    }
  }, [page, originalData]);

  useEffect(() => {
    searchFunction();
  }, [searchHeaderKet]);

  useEffect(() => {
    if (sortQuery.type == "asc") {
      sortAscFunction();
    } else if (sortQuery.type == "dsc") {
      sortDscFunction();
    }
  }, [sortQuery]);

  const getPageButtons = () => {
    if (pagesNumber <= 5) {
      return Array.from({ length: pagesNumber }, (_, i) => i + 1);
    } else if (page <= 3) {
      return [1, 2, 3, "...", pagesNumber];
    } else if (page > pagesNumber - 2) {
      return [1, "...", pagesNumber - 2, pagesNumber - 1, pagesNumber];
    } else {
      return [1, "...", page - 1, page, page + 1, "...", pagesNumber];
    }
  };

  const searchFunction = () => {
    if (searchHeaderKet && searchHeaderKet?.length) {
      let arr = [];
      let uniqueItems = new Set(); // Use a Set to keep track of unique items

      data?.forEach((item) => {
        Object.keys(item)?.forEach((key) => {
          if (item[key] && item[key]?.length) {
            if (
              item[key]?.includes(searchHeaderKet) &&
              !uniqueItems.has(item)
            ) {
              arr.push(item);
              uniqueItems.add(item);
            }
          }
        });
      });

      setOriginalData([...arr]);
      if (arr?.length) {
        setPage(1);
      }
    } else {
      setOriginalData(data);
    }
  };

  const sortAscFunction = () => {
    if (sortQuery?.dataIndex && sortQuery?.dataIndex?.length) {
      setPaginatedData((prevData) => {
        return [...prevData].sort((a, b) =>
          typeof b[sortQuery?.dataIndex] === "number"
            ? parseInt(b[sortQuery?.dataIndex]) -
              parseInt(a[sortQuery?.dataIndex])
            : b[sortQuery?.dataIndex]?.localeCompare(a[sortQuery?.dataIndex])
        );
      });
    }
  };

  const sortDscFunction = () => {
    if (sortQuery?.dataIndex && sortQuery?.dataIndex?.length) {
      setPaginatedData((prevData) => {
        return [...prevData].sort((a, b) =>
          typeof a[sortQuery?.dataIndex] === "number"
            ? parseInt(a[sortQuery?.dataIndex]) -
              parseInt(b[sortQuery?.dataIndex])
            : a[sortQuery?.dataIndex]?.localeCompare(b[sortQuery?.dataIndex])
        );
      });
    }
  };

  return (
    <>
      <div className="table">
        <table>
          <thead className="tableRow">
            {headers.map((header, index) => (
              <th
                className="tableHeader"
                onClick={() => {
                  if (header?.sort) {
                    if (header.asc) {
                      setSortQuery({
                        dataIndex: header.dataIndex,
                        type: "dsc",
                      });
                      header.asc = false;
                    } else {
                      setSortQuery({
                        dataIndex: header.dataIndex,
                        type: "asc",
                      });
                      header.asc = true;
                    }
                  }
                }}
                key={index}
              >
                <span
                  style={{ cursor: header?.sort ? "pointer" : "initial" }}
                  className="filters"
                >
                  {" "}
                  <span> {header?.label}</span>
                  <span>
                    {" "}
                    {header?.asc && header?.sort
                      ? AngleDown
                      : !header?.asc && header?.sort
                      ? AngleUp
                      : null}
                  </span>
                </span>
                {header?.search ? (
                  <input
                    type="search"
                    onChange={(e) =>
                      setSearchQuery({
                        ...searchQuery,
                        dataIndex: header.dataIndex,
                        value: e.target.value,
                      })
                    }
                  />
                ) : null}
              </th>
            ))}
          </thead>
          <tbody className="tableRow tableBody">
            {!data ? (
              <Loader size="lg" />
            ) : data?.length && Array?.isArray(data) ? (
              paginatedData?.map((row, index) => (
                <tr className="body" key={index}>
                  {headers?.map((column, columnIndex) => {
                    const dataIndex = column?.dataIndex;
                    const cellData = row[dataIndex];
                    if (column)
                      return (
                        <td className="tableCell" key={columnIndex}>
                          {column?.type === "children" ? (
                            <>
                              {column?.children({
                                headers: column,
                                row: row,
                                index: index,
                                lastIndex: data?.length,
                              })}
                            </>
                          ) : (
                            cellData
                          )}
                        </td>
                      );
                  })}
                </tr>
              ))
            ) : (
              <h4>لا يوجد بيانات</h4>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {data && data?.length && Array?.isArray(data) ? (
          <>
            <button
              className="btn"
              onClick={() => setPage(page > 1 ? page - 1 : page)}
            >
              {chevronRight}
            </button>

            {getPageButtons().map((button, index) => (
              <button
                className={
                  button === page
                    ? "btn btn-primary paginated"
                    : "btn paginated"
                }
                key={index}
                onClick={() => setPage(button)}
              >
                {button}
              </button>
            ))}

            <button
              className="btn"
              onClick={() => setPage(page < pagesNumber ? page + 1 : page)}
            >
              {chevronLeft}
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default TableLayout;
