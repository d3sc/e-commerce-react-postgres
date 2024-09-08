import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Check from "../../middleware/auth/Check";
import { AuthContext } from "../../context/AuthContext";
import { ApiProducts } from "../../helpers/api";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  // authorization
  const isGuest = Check.isGuest();
  const { user } = useContext(AuthContext);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    async function render() {
      const { data } = await ApiProducts.show(id);
      setPreview(data.image);
      setData(data);
    }
    render();
  }, []);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", e.target.querySelector('input[name="name"]').value);
    formData.append(
      "price",
      e.target.querySelector('input[name="price"]').value
    );
    formData.append(
      "description",
      e.target.querySelector('textarea[name="description"]').value
    );

    const { data: data2 } = await ApiProducts.update(formData, data.id);

    // alert(data2);
    if (data2?.success) {
      Swal.fire({
        title: "Success!",
        text: data2.success,
        icon: "success",
      });
      navigate(
        `/dashboard/products?message=${encodeURIComponent(data2.success)}`
      );
    } else if (data2?.error) {
      Swal.fire({
        title: "Error!",
        text: data2.error,
        icon: "error",
      });
      navigate(
        `/dashboard/products?message=${encodeURIComponent(data2.error)}`
      );
    }
  };

  if (!user || !data) return "Loading..";
  if (isGuest || user?.name != "admin")
    return <NotFound code={401} message="Unauthorized user" />;
  return (
    <>
      {/* Card Section */}
      <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Card */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-7">
          <form onSubmit={submit}>
            {/* Section */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
              <div className="sm:col-span-12">
                <h2 className="text-lg font-semibold text-gray-800">
                  Edit Product
                </h2>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-application-name"
                  className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                >
                  Name
                </label>
              </div>
              <div className="sm:col-span-9">
                <input
                  defaultValue={data.name}
                  name="name"
                  id="af-submit-application-name"
                  type="text"
                  className="py-2 px-3 pe-11 block w-full shadow-sm text-sm outline outline-blue-200 outline-2 rounded-lg focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>
              {/* End Col */}
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-submit-application-price"
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                  >
                    Price
                  </label>
                </div>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <input
                  defaultValue={data.price}
                  name="price"
                  id="af-submit-application-price"
                  type="number"
                  className="py-2 px-3 pe-11 block w-full text-sm outline outline-blue-200 outline-2 rounded-lg focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>
              {/* End Col */}
            </div>
            {/* End Section */}
            {/* Section */}
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200">
              {/* End Col */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="af-submit-app-upload-images"
                  className="inline-block text-sm font-medium text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  Preview image
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <label
                  htmlFor="af-submit-app-upload-images"
                  className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-neutral-700"
                >
                  <input
                    id="af-submit-app-upload-images"
                    name="af-submit-app-upload-images"
                    type="file"
                    className="sr-only"
                    onChange={loadImage}
                  />
                  <svg
                    className="size-10 mx-auto text-gray-400 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                    />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                  <span className="mt-2 block text-sm text-gray-800 dark:text-neutral-200">
                    Browse your device
                  </span>
                  <span className="mt-1 block text-xs text-gray-800 dark:text-neutral-500">
                    Maximum file size is 5 MB
                  </span>
                </label>
              </div>

              {preview ? (
                <>
                  <div className="sm:col-span-3">
                    <div className="inline-block">
                      <label
                        htmlFor="af-submit-application-bio"
                        className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                      >
                        Preview
                      </label>
                    </div>
                  </div>
                  <figure className="sm:col-span-9">
                    <img src={preview} alt="Preview" className="w-72" />
                  </figure>
                </>
              ) : null}
              {/* End Col */}
              <div className="sm:col-span-3">
                <div className="inline-block">
                  <label
                    htmlFor="af-submit-application-bio"
                    className="inline-block text-sm font-medium text-gray-800 mt-2.5"
                  >
                    Description
                  </label>
                </div>
              </div>
              {/* End Col */}
              <div className="sm:col-span-9">
                <textarea
                  name="description"
                  id="af-submit-application-bio"
                  className="py-2 px-3 block w-full text-sm outline outline-blue-200 outline-2 rounded-lg focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  rows={6}
                  placeholder="Add a cover letter or anything else you want to share."
                  defaultValue={data.description}
                />
              </div>
              {/* End Col */}
            </div>
            {/* End Section */}

            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Submit
            </button>
          </form>
        </div>
        {/* End Card */}
      </div>
    </>
  );
}
