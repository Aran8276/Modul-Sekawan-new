import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FetcherProdDetail from "../Fetcher/FetchProdDetail";

const ProdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [prod, setProd] = useState(null); // null initially
  const [newReview, setNewReview] = useState({ name: "", review: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted review:", newReview);
    setNewReview({ name: "", review: "" }); // Clear form after submission
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-100 text-white dark:text-black p-5">
        <FetcherProdDetail onFetch={setProd} id={id} />
        {prod ? (
          <div className="max-w-4xl mx-auto bg-gray-800 dark:bg-gray-100 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <img
                src={prod.image}
                alt={prod.title}
                className="w-[350px] h-full object-cover rounded-lg mb-4"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2 dark:text-black">
              {prod.title}
            </h1>
            <p className="mb-4">{prod.description}</p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="mt-6 text-xl font-semibold dark:text-black">
                  Price:
                </h3>
                <p className="text-gray-300 dark:text-black">
                  {"$" + prod.price}
                </p>
              </div>

              <div>
                <h3 className="mt-6 text-xl font-semibold dark:text-black">
                  Rating:
                </h3>
                <p className="text-gray-300 dark:text-black">
                  {prod.rating.rate +
                    " / 5 (" +
                    prod.rating.count +
                    " reviews)"}
                </p>
              </div>

              <div>
                <h3 className="mt-6 text-xl font-semibold dark:text-black">
                  Category:
                </h3>
                <p className="text-gray-300 dark:text-black">{prod.category}</p>
              </div>
            </div>

            {/* Display Reviews */}
            <h3 className="mt-6 text-xl font-semibold dark:text-black">
              Customer Reviews:
            </h3>
            <ul className="space-y-4">
              {/* Assuming prod has a customerReviews array similar to resto */}
              {prod.customerReviews?.map((review, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  <p className="text-gray-400 mb-2">
                    <b className="text-white">{review.name}</b> ({review.date})
                  </p>
                  <p className="text-gray-300 mb-4">{review.review}</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition-colors">
                    Reply
                  </button>
                </li>
              ))}
            </ul>

            {/* Add Review Section */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Leave a Review:</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-gray-400 mb-1 dark:text-black"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newReview.name}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded-md bg-gray-700 dark:bg-gray-500 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-400 mb-1 dark:text-black"
                    htmlFor="review"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    value={newReview.review}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-2 rounded-md bg-gray-700 dark:bg-gray-500 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Back to Products Button */}
            <button
              onClick={() => navigate(-1)}
              className="mt-8 bg-gray-700 dark:bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back to Products
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400">Loading...</div>
        )}
      </div>
    </>
  );
};

export default ProdDetail;
