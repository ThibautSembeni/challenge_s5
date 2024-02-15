import React, {Fragment, useEffect, useState} from "react";
import {CheckIcon, StarIcon} from '@heroicons/react/20/solid'
import {
  deleteFeedback,
  getAllFeedbacks,
  getAllFeedbacksForVeterinarian,
  updateFeedback
} from "@/api/feedbacks/index.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {getAllAppointments} from "@/api/appointments/index.jsx";
import {EyeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments().then(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    if (state.type === "success") {
      fetchComments().then(() => setIsLoading(false));
    }
  }, [state]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await getAllFeedbacksForVeterinarian();
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  }

  const handleVerifyFeedback = async (id) => {
    try {
      setIsLoading(true);
      await updateFeedback(id, { verify: true });
      fetchComments().then(() => setIsLoading(false));
    } catch (error) {
      console.error("Error verifying feedback", error);
    }
  }

  const handleDeleteFeedback = async (id) => {
    try {
      setIsLoading(true);
      await deleteFeedback(id);
      fetchComments().then(() => setIsLoading(false));
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <Fragment>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-lg font-medium text-gray-900">Commentaires</h2>
              <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                {comments.map((feedback) => (
                  <div key={feedback.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                    <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                      <div className="flex items-center xl:col-span-1">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                feedback.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="ml-3 text-sm text-gray-700">
                          {feedback.rating}
                          <span className="sr-only"> sur 5 étoiles</span>
                        </p>
                      </div>

                      <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                        <div className="text-sm font-medium text-gray-900">
                          {!feedback.verify && (
                            <>
                              <div className="flex items-center gap-2">
                                <span>Commentaire</span>
                                <span
                                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ml-4">Non vérifié</span>
                                <button
                                  onClick={() => handleVerifyFeedback(feedback.id)}
                                  className="text-green-600 hover:text-green-900">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                </button>
                                <button
                                  onClick={() => handleDeleteFeedback(feedback.id)}
                                  className="text-red-600 hover:text-red-900">
                                  <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                </button>
                              </div>
                            </>
                          )}

                          {feedback.verify && (
                            <div className="flex items-center gap-2">
                              <span>Commentaire</span>
                              <span
                                className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ml-4">Vérifié</span>
                              <button
                                onClick={() => handleDeleteFeedback(feedback.id)}
                                className="text-red-600 hover:text-red-900">
                                <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="mt-3 space-y-6 text-sm text-gray-500">
                          {feedback.comment}
                        </div>
                      </div>
                    </div>

                    <div
                      className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                      <p
                        className="font-medium text-gray-900">{feedback.appointment.userID.firstname} {feedback.appointment.userID.lastname}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}
