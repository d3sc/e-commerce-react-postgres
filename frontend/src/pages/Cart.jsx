import React, { useEffect, useState } from "react";
import { ApiCarts, ApiPayment } from "../helpers/api";
import { BsCartPlus } from "react-icons/bs";
import EmptyData from "../components/dashboard/EmptyData";
import Check from "../middleware/auth/Check";
import Swal from "sweetalert2";
import formatRupiah from "../helpers/formatRupiah";

function calculateTotalPrice(cartItems) {
  return cartItems
    ?.map((item) => item.quantity * item.product.price)
    .reduce((total, item) => total + item, 0);
}

export default function Cart() {
  const isGuest = Check.isGuest();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState();
  const [cartId, setCartId] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    if (!isGuest) {
      ApiCarts.get().then(({ data }) => {
        setUserId(data.userId);
        // membuat inisial cartItem agar bisa diubah nilainya jika dimasukkan ke useState, mudah nya seperti duplikat dari data asli
        const initialCartItems = data.cart_item.map((item) => ({
          ...item,
          quantity: item.quantity, // Simpan initial quantity
        }));
        // memasang data duplikasi itemCard dari hasil data yang sudah GET dari api
        setCartItems(initialCartItems);
        // memasang data total price dari duplikasi hasil data yang sudah di GET dari api
        setTotalPrice(calculateTotalPrice(initialCartItems));
      });
    }
  }, [isGuest]);

  const updateQuantity = (index, newQuantity) => {
    const updatedCartItems = cartItems;
    if (newQuantity < 1) return; // Untuk mencegah quantity menjadi 0 atau negatif
    // merubah quantity dari duplikasi data cart item yang ada di state
    updatedCartItems[index].quantity = newQuantity;
    // mengupdate state cart item yang sudah dirubah quantity nya pada kode di atas
    setCartItems(updatedCartItems);
    // menghitung total harga dengan data state yang baru,(yang baru saja dirubah quantity nya, pada code di atas)
    setTotalPrice(calculateTotalPrice(updatedCartItems));

    // mengupdate data quantity ke database
    ApiCarts.changeQty(
      updatedCartItems[index].id,
      updatedCartItems[index].quantity
    );
  };

  function deleteHandle(id) {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    setTotalPrice(calculateTotalPrice(updatedCartItems));

    ApiCarts.deleteCart(id);
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandle(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const checkOut = async (cartId) => {
    const { data } = await ApiPayment.pay(cartId, userId);
    if (data.error) return alert("error");
    setCartId(cartId);
    setToken(data.token);
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: async (result) => {
          if (result) {
            localStorage.setItem("pembayaran", JSON.stringify(result));
            await ApiCarts.deleteAllItem(cartId);
            await ApiPayment.check(cartId, userId, result);
            setToken("");
          }
        },
        onPending: (result) => {
          localStorage.setItem("pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (error) => {
          console.log(error);
          setToken("");
        },
        onClose: () => {
          console.log("Anda belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    // memberikan ini wajib
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    scriptTag.setAttribute(
      "data-client-key",
      import.meta.env.VITE_REACT_CLIENT_KEY
    );

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  if (!cartItems.length)
    return (
      <EmptyData
        message={"it seems like you didnt have any item in cart"}
        icon={BsCartPlus}
        link={"/dashboard/likes"}
      />
    );

  return (
    <div className="relative h-screen w-full">
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Image
                </th>
                <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Quantity
                </th>
                <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Price
                </th>
                <th className="px-4 py-2 text-start">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {cartItems
                ?.sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-32 h-32 rounded-md border-4 border-white object-cover"
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 capitalize font-bold">
                      {item.product.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <div className="flex justify-start items-center gap-4">
                        <button
                          className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 font-bold">
                      {formatRupiah(item.quantity * item.product.price)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full absolute bottom-0 left-0 bg-white h-2/5 p-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Total Product
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-xl">
                  {cartItems.length}
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Total Price
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <span className="text-3xl">{formatRupiah(totalPrice)}</span>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700"></td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <button
                    className="inline-block rounded bg-indigo-600 px-6 py-3 text-xl font-medium text-white hover:bg-indigo-700"
                    onClick={() => checkOut(cartItems[0].cartId)}
                  >
                    Check Out
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
