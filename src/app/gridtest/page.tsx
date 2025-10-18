"use client";
import React, { useState } from "react";
import { Grid } from "../common/layout/Grid";
import styled from "styled-components";

export const GridTest: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const gridTemplateRows = collapsed ? "0px 1fr auto" : "60px 1fr auto";

  return (
    <StyledGrid className="grid" style={{ gridTemplateRows }}>
      <div className="list-header">
        <button className="btn-collapse" onClick={toggleCollapse}>
          V
        </button>
        <div
          className="search-bar"
          style={{ display: collapsed ? "none" : "flex" }}
        >
          <input type="text" placeholder="검색어를 입력하세요" />
          <button>검색</button>
        </div>
      </div>
      <div className="content">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>선택</th>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 100 }, (_, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{index + 1}</td>
                  <td>제목 {index + 1}</td>
                  <td>작성자 {index + 1}</td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td>{Math.floor(Math.random() * 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="list-footer">
        <div className="pagination">
          <span className="page-number">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">4</span>
          <span className="page-number">5</span>
          <span className="page-number">6</span>
          <span className="page-number">7</span>
          <span className="page-number">8</span>
          <span className="page-number">9</span>
          <span className="page-number">10</span>
        </div>
        <div className="btn-group">
          <button>다운로드</button>
          <button>다운로드</button>
        </div>
      </div>
    </StyledGrid>
  );
};

export const StyledGrid = styled(Grid)`
  display: grid;
  grid-template-rows: 60px 1fr minmax(auto, auto);
  grid-template-columns: 1fr;
  width: 100%;
  height: calc(100vh - 180px);
  .list-header {
    position: relative;
    background-color: #f0f0f0;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    .btn-collapse {
      position: absolute;
      right: 0;
      top: -30px;
      padding: 5px 10px;
    }
    .search-bar {
      display: flex;
      align-items: center;
      padding: 10px;
    }
  }
  .content {
    overflow: auto;
    background-color: #e0e0e0;
    grid-row: 2 / 3;
    grid-column: 1 / -1;
  }
  .list-footer {
    background-color: #d0d0d0;
    grid-row: 3 / 4;
    grid-column: 1 / -1;
    .pagination {
      display: block;
      padding: 10px;
      text-align: center;
    }
    .btn-group {
      display: block;
      padding: 10px;
      text-align: right;
    }
  }
  .table-wrap {
    overflow: hidden;
    height: auto;
    width: 100%;
    table {
      width: 100%;
      border-collapse: collapse;
      th,
      td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

export default GridTest;
