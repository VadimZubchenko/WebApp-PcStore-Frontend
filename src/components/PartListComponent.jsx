import React from "react";

const ListPartComponent = (props) => {
  return (
    <div>
      <h2 className="text-center">Parts</h2>
      <div className="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Part ID</th>
              <th>Part Name</th>
              <th>Part Type</th>
              <th>Stock Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {props.list.length
              ? props.list.map((part) => (
                  <tr key={part.partID}>
                    <td>{part.partID}</td>
                    <td>{part.partName}</td>
                    <td>{part.partType}</td>
                    <td>{part.stockQuantity}</td>
                    <td>{part.partPrice}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      {/* {props.errorMsg ? <div>{props.errorMsg}</div> : null} */}
    </div>
  );
};

export default ListPartComponent;
