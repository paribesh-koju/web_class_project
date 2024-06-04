
import React, { useState, useEffect } from "react";
import { createProductApi, getAllProducts } from "../../apis/Api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  //logic for get products
  const [products , setProducts] = useState([])
  // hit API (get all product) auto -> useEffect (list of products)
  useEffect(()=>{
    getAllProducts().then((res) =>{
      //success, message, list of products(products)
      setProducts(res.data.products)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  console.log(products)
  //make a state to save (array format)
  //table row (pn, pp, pd)

  //making a state for product
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')

  //Image State
  const [productImage, setProductImage] = useState(null)
  const [previewImage, setpreviewImage] = useState(null)

  //function to upload and preview image
  const handleImageUpload=(event)=>{
    //0-File, 1-name, 2-Size
    const file=event.target.files[0]
    setProductImage(file)
    setpreviewImage(URL.createObjectURL(file))
  }

//handle image
const handleSubmit = (e) => {
  e.preventDefault()
  console.log(productName, productPrice, productCategory, productDescription, productImage)

//make a logical form data
const formData = new FormData();
formData.append('productName', productName);
formData.append('productPrice', productPrice);
formData.append('productCategory', productCategory);
formData.append('productDescription', productDescription);
formData.append('productImage', productImage);

//make a call or make a api request
createProductApi(formData).then((res) =>{
  if(res.status === 201){
    toast.success(res.data.message)
  }else{
    toast.error('something want wronf in frontend')
  }
}).catch((error) =>{
  if (error.response){
    if(error.response.status ===400){
      toast.error(error.response.data.message)
    }
    //space for 401 error
  }else if(error.response.status ===500){
    toast.error("Internal server error")
  }else{
    toast.error("No response")
  }
})

}

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between mt-2">
          <h1>Admin Dashboard:</h1>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Product
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new product</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form action="">
                    <label>Product Name</label>
                    <input onChange={(e) => setProductName(e.target.value)} type="text" className="form-control" placeholder="Enter your product name" />

                    <label className="mt-2">Product Price</label>
                    <input onChange={(e) => setProductPrice(e.target.value)} type="number" className="form-control" placeholder="Enter your product price" />

                    <div className='mt-2'>
                      <label>Select Category</label>
                      <select onChange={(e) => setProductCategory(e.target.value)} className="form-control">
                        <option value="crafts">Crafts</option>
                        <option value="wedding">Wedding</option>
                        <option value="home and living">Home and Living</option>
                        <option value="gift">Gift</option>
                      </select>

                    </div>
                    <label className='mt-2'>Type product Description</label>
                    <textarea onChange={(e) => setProductDescription(e.target.value)} className="form-control"></textarea>

                    <label className='mt-2'>Product Image</label>
                    <input onChange={handleImageUpload} type="file" className="form-control" />

                    {/* Preview Image */}
                    {
                      previewImage && (
                        <div className=''>
                          <img src={previewImage} alt="" />
                        </div>
                      )
                    }

                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={handleSubmit} type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="table mt-3">
          <thead className="table-dark">
            <tr>
              <th> Product Image</th>
              <th>Product  Name</th>
              <th>Product Price</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((singleProduct) =>(
                <tr>
                <td>
                  <img height={'50px'} width={'50px'} src={`http://localhost:9090/products/${singleProduct.productImage}`} alt="" />
                </td>
                <td>{singleProduct.productName}</td>
                <td>NPR. {singleProduct.productPrice}</td>
                <td>{singleProduct.productCategory}</td>
                <td>{singleProduct.productDescription}</td>
                <td>
                  <div className="button-group" role='group'>
                    <Link to= {`/admin/update/${singleProduct._id}`} className="btn btn-success">Edit</Link>
                    <Link className="btn btn-danger">Delete</Link>
                  </div>
                </td>
              </tr>
              ))
            }
          </tbody>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;


//New Page (update product)
//Form (required field) n, p, d,c,old image , new image
//useState 7
//fill the previous values
//call the api (single product)
//backend
//based on _id (Admin Dashboard)
//transport _id to update product
//receive in update product page
