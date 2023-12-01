import React from "react";

const MainProduct = ({name, price}) => {
    return (
        <div>
            <div className="col-lg-2 col-sm-6 d-flex" style={{marginTop: "10px"}}>
                <div className="productset flex-fill active">
                  <div className="productsetmain">
                    <h4>{name}</h4>
                    <h4>{price}</h4>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default MainProduct;