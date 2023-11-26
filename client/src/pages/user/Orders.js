import React,{useState,useEffect} from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from 'moment'
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () =>{
    try {
      const {data} = await axios.get('/api/v1/auth/orders')
      setOrders(data?.orders)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrders();
  },[auth?.token])
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order,index)=>{
              return (
                <div className="border shadow " key={index}>
                  <table className="table">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Status</td>
                        <td>Buyer</td>
                        <td>Time</td>
                        <td>Payment</td>
                        <td>Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{index+1}</th>
                        <th>{order?.status}</th>
                        <th>{auth?.user?.name}</th>
                        <th>{moment(order?.createAt).fromNow()}</th>
                        <th>{order?.payment}</th>
                        <th>{order?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
