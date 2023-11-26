import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

// total price
const totalPrice = () => {
  try {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  } catch (error) {
    console.log(error);
  }
};
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

    //checout func
    const handleCheckout = async () => {
      try {
        const response = await axios.get("/api/v1/payments/getKey");
        const {data} = await axios.post("/api/v1/payments/checkout",{
          cart,
          auth
        })
        var options = {
          key : response?.data?.key, 
          amount: data?.order?.amount, 
          currency: "INR",
          name: "Express Ecommerce",
          description: "Checkout payment",
          image: "https://avatars.githubusercontent.com/u/70438464?v=4",
          order_id: data?.order?.id, 
          callback_url: "/api/v1/payments/payment-varification",
          prefill: {
              name: auth?.user?.name,
              email: auth?.user.email,
              contact: auth?.user?.phone
          },
          notes: {
              "address": "Express Ecommerce Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open()
    localStorage.removeItem('cart')
    setCart([]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.token ? (
              <>
                <div className="mb-3 d-flex flex-column gap-2 ">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address ? auth?.user?.address : "Please update you address" }</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleCheckout}
                    disabled={auth?.user?.address ? false : true}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
