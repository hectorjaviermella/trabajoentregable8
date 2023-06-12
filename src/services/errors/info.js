export const generateUserErrorInfo = (product) => {
    return `* pTitle: needs to be a string, received ${product.pTitle}
      * pDescription: needs to be a string, received ${product.pDescription}
      * pCode: needs to be a string, received ${product.pCode}
      * pPrice: needs to be a string, received ${product.pPrice}
      * pStatus: needs to be a string, received ${product.pStatus}
      * pStock: needs to be a string, received ${product.pStock}
      * pCategory: needs to be a string, received ${product.pCategory}`;
    };
