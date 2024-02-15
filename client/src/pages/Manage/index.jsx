import React, {Fragment, useState} from "react";
import { CalendarIcon, BookOpenIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

import Sidebar from "@/components/molecules/Sidebar/index.jsx";
import Schedules from "@/components/organisms/Schedules/index.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import Modal from "@/components/organisms/Modal/Modal.jsx";
import { generateSchedules } from "@/api/schedules/index.jsx";
import Alert from "@/components/atoms/Alerts/index.jsx";
import MyServices from "@/pages/Manage/services/index.jsx";
import Comments from "@/pages/Manage/comments/index.jsx";
import Appointments from "@/components/organisms/Appointment/index.jsx";

export default function Manage({ type = "calendar" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({});


const navigation = [
    {
        name: "Calendrier",
        href: "/gestion/calendrier",
        icon: CalendarIcon,
        current: false,
    },
    {
        name: "Services",
        href: "/gestion/services",
        icon: CalendarIcon,
        current: false,
    },
    {
        name: "Rendez-vous",
        href: "/gestion/rendez-vous",
        icon: BookOpenIcon,
        current: false,
    },
    {
      name: "Commentaires",
      href: "/gestion/commentaires",
      icon: ChatBubbleLeftEllipsisIcon,
      current: false,
    },
];

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataInfo = new FormData(e.currentTarget);
        const data = Object.fromEntries(dataInfo.entries());

        generateSchedules(user.veterinarian.uuid, {
            end_date: data.endDate,
            start_date: data.startDate,
        })
            .then((res) => {
                if (res.status === 201) {
                    if (res.data.length === 0) {
                        setState({
                            type: "error",
                            title: "Aucun créneau n'a été ajouté ! Veuillez vérifier les horaires d'ouvertures de la clinique.",
                        });
                    } else {
                        setState({
                            type: "success",
                            title: `Vos horaires ont bien été générés, ${res.data.length} créneaux ont été ajoutés !`,
                        });
                    }
                }
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setState({
                        type: "error",
                        title: `${err.response.data["hydra:description"]}`,
                    });
                } else {
                    setState({
                        type: "error",
                        title: "Impossible de générer vos horaires ! Veuillez réessayer.",
                    });
                }
            })
            .finally(() => setOpenModal(false));
    };

    return (
        <>
            <div>
                <Sidebar
                    navigation={navigation}
                    topBarDisplay={true}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                >
                    {type === "dashboard" && "Dashboard"}
                    {type === "calendar" && (
                        <>
                            {state && (
                                <Alert
                                    title={state?.title}
                                    type={state?.type}
                                    content="bonjour"
                                    close={() => setState({})}
                                />
                            )}
                            <Schedules
                                view={"day"}
                                veterinarian={user.veterinarian}
                                addEvent={() => setOpenModal(true)}
                            />
                            <Modal
                                isOpen={openModal}
                                onClose={() => setOpenModal(false)}
                                title={"Générer vos horaires"}
                            >
                                <form onSubmit={handleSubmit}>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor={"startDate"}
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Date de départ des créneaux
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    name={"startDate"}
                                                    type={"date"}
                                                    required={true}
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="endDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Date de fin des créneaux
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    name={"endDate"}
                                                    type={"date"}
                                                    required={true}
                                                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        {/*{TimeSelect()}*/}
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        >
                                            Enregistrer
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            </Modal>
                        </>
                    )}
                    {type === "services" && <MyServices />}
                    {type === "appointments" && <Appointments />}
                    {type === "comments" && <Comments />}
                </Sidebar>
            </div>
        </>
    );
}
