import Navbar from "@/components/molecules/Navbar/index.jsx";
import React, {Fragment, useEffect, useState} from 'react'
import imgBanner from "@/assets/images/veterinayBanner.jpg";
import {getOneClinics} from "@/api/veterinarian/Clinic.jsx";
import Loading from "@/components/molecules/Loading.jsx";
import {useParams} from "react-router-dom";
import Footer from "@/components/molecules/Footer/index.jsx";

const featuredTestimonial = {
  body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
  author: {
    name: 'Brenna Goyette',
    handle: 'brennagoyette',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
  },
}
const testimonials = [
  [
    [
      {
        body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
        author: {
          name: 'Leslie Alexander',
          handle: 'lesliealexander',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
        author: {
          name: 'Lindsay Walton',
          handle: 'lindsaywalton',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
  ],
  [
    [
      {
        body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
        author: {
          name: 'Tom Cook',
          handle: 'tomcook',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
    [
      {
        body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
        author: {
          name: 'Leonard Krasner',
          handle: 'leonardkrasner',
          imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
      // More testimonials...
    ],
  ],
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ClinicProfil() {
  const { uuid } = useParams();

  const [clinic, setClinic] = useState(null);
  const [informations, setInformations] = useState([]);
  const [complementaryInformations, setComplementaryInformations] = useState([]);
  const [teams, setTeams] = useState([]);
  const [clinicSchedules, setClinicSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOneClinics(uuid).then((clinicData) => {
      setClinic(clinicData.data);

      setInformations([
        { label: 'Numéro de téléphone', value: clinicData.data.phone },
        { label: 'Email', value: clinicData.data.email },
        { label: 'Avis client', value: '5/5 ##étoiles##' },
      ]);

      setComplementaryInformations(
        clinicData.data.clinicComplementaryInformation.map(information => ({
          name: information.name,
          description: information.description,
        }))
      );

      const schedules = clinicData.data.clinicSchedules.map(schedule => ({
        day: schedule.day,
        startTime: new Date(schedule.timeslot_id.start_time),
        endTime: new Date(schedule.timeslot_id.end_time),
        isOpen: schedule.timeslot_id.isOpen,
      }));

      setClinicSchedules(schedules);

      setTeams(
        clinicData.data.veterinarians.map(veterinarian => ({
          name: veterinarian.firstname + ' ' + veterinarian.lastname,
          role: veterinarian.specialties,
          uuid: veterinarian.uuid,
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        }))
      );

      setIsLoading(false);
    }).catch((error) => {
      console.error("Erreur lors de la récupération des données : ", error);
      setIsLoading(false);
    });
  }, [uuid]);

  const [earliestStart, setEarliestStart] = useState(24);
  const [latestEnd, setLatestEnd] = useState(0);

  useEffect(() => {
    if (clinicSchedules.length > 0) {
      let minStart = 24;
      let maxEnd = 0;

      clinicSchedules.forEach(schedule => {
        const startHour = new Date(schedule.startTime).getHours();
        const endHour = new Date(schedule.endTime).getHours();
        minStart = Math.min(minStart, startHour);
        maxEnd = Math.max(maxEnd, endHour);
      });

      setEarliestStart(minStart);
      setLatestEnd(maxEnd);
    }
  }, [clinicSchedules]);

  const renderTimeRows = () => {
    const rows = [];
    for (let hour = earliestStart; hour <= latestEnd; hour++) {
      rows.push(
        <div key={hour}>
          <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
            {hour}h00
          </div>
        </div>
      );
    }
    return rows;
  };

  const totalRows = latestEnd - earliestStart;

  const formatTime = (date) => `${date.getHours()}h${date.getMinutes() === 0 ? '00' : date.getMinutes()}`;

  const dayToColumnIndex = (day) => {
    const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
    return days.indexOf(day.toLowerCase()) + 1;
  };

  const timeToRowIndex = (time) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    return hour + (minute >= 30 ? 1 : 0) - 5;
  };

  return (
    <>
      <Navbar/>

      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
            <img
              src={imgBanner}
              alt="veterinarian"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div
              className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
              aria-hidden="true"
            >
              <div
                className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{clinic.name}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">{clinic.address} </p>
              </div>
            </div>
          </div>

          <div className="isolate">
            {/* Content section */}
            <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">À propos</h2>
                <div className="mt-6 flex flex-col gap-x-8 gap-y-20 xl:flex-row">
                  <div className="xl:w-full xl:max-w-2xl xl:flex-auto">
                    <p className="text-xl leading-8 text-gray-600">
                      {clinic.description}
                    </p>
                  </div>
                  <div className="xl:flex xl:flex-auto xl:justify-center">
                    <dl className="w-64 space-y-8 xl:w-80">
                      {informations.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                          <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                          <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Image section */}
            <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nous trouver</h2>
              </div>
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                alt=""
                className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
              />
            </div>

            {complementaryInformations.length && (
              <div>
                {/* Information section */}
                <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
                  <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Informations
                      complémentaires</h2>
                  </div>
                  <dl
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {complementaryInformations.map((information) => (
                      <div key={information.name}>
                        <dt className="font-semibold text-gray-900">{information.name}</dt>
                        <dd className="mt-1 text-gray-600">{information.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* Calendar */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 mb-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Horaires d'ouverture</h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Attention, ces horaires peuvent varier en fonction des jours fériés.
                </p>
              </div>
              <div className="flex h-full flex-col">
                <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
                  <div style={{width: '165%'}} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                    <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
                    >
                      <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">L</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">M</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">M</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">J</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">V</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">S</button>
                        <button type="button" className="flex flex-col items-center pb-3 pt-2">D</button>
                      </div>

                      <div
                        className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                        <div className="col-end-1 w-14"/>
                        <div className="flex items-center justify-center py-3">Lundi</div>
                        <div className="flex items-center justify-center py-3">Mardi</div>
                        <div className="flex items-center justify-center py-3">Mercredi</div>
                        <div className="flex items-center justify-center py-3">Jeudi</div>
                        <div className="flex items-center justify-center py-3">Vendredi</div>
                        <div className="flex items-center justify-center py-3">Samedi</div>
                        <div className="flex items-center justify-center py-3">Dimanche</div>
                      </div>
                    </div>
                    <div className="flex flex-auto">
                      <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"/>
                      <div className="grid flex-auto grid-cols-1 grid-rows-1">
                        {/* Horizontal lines */}
                        <div
                          className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                          style={{ gridTemplateRows: `repeat(${totalRows + 1}, minmax(3.5rem, 1fr))` }}
                        >
                          <div className="row-end-1 h-7"></div>
                          {renderTimeRows()}
                        </div>

                        {/* Vertical lines */}
                        <div
                          className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                          <div className="col-start-1 row-span-full"/>
                          <div className="col-start-2 row-span-full"/>
                          <div className="col-start-3 row-span-full"/>
                          <div className="col-start-4 row-span-full"/>
                          <div className="col-start-5 row-span-full"/>
                          <div className="col-start-6 row-span-full"/>
                          <div className="col-start-7 row-span-full"/>
                          <div className="col-start-8 row-span-full w-8"/>
                        </div>

                        {/* Events */}
                        <ol
                          className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8 pt-7"
                          style={{gridTemplateRows: `repeat(${totalRows + 1}, minmax(3.5rem, 1fr))`}}
                        >
                          {clinicSchedules.map((schedule, index) => {
                            const colStart = dayToColumnIndex(schedule.day);
                            const rowStart = timeToRowIndex(new Date(schedule.startTime));
                            const rowEnd = timeToRowIndex(new Date(schedule.endTime));

                            return (
                              <li key={index} className={`relative mt-px flex sm:col-start-${colStart}`} style={{ gridRowStart: rowStart, gridRowEnd: rowEnd }}>
                                <a href="#" className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ${schedule.isOpen ? 'bg-green-100' : 'bg-red-100'} p-2 text-xs leading-5`}>
                                  <p className={`order-1 font-semibold ${schedule.isOpen ? 'text-green-700' : 'text-red-700'}`}>{schedule.isOpen ? 'Ouvert' : 'Fermé'}</p>
                                  {schedule.isOpen ? (
                                    <p className="text-green-500">
                                      <time dateTime={schedule.startTime.toISOString()}>{`${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`}</time>
                                    </p>
                                  ) : (
                                    <p className="text-red-500">
                                      <time dateTime={schedule.startTime.toISOString()}>{`${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`}</time>
                                    </p>
                                  )}
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="relative isolate -z-10 mt-32 sm:mt-48">
              <div
                className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
                <svg className="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
                  <defs>
                    <pattern
                      id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                      width={200}
                      height={200}
                      x="50%"
                      y="50%"
                      patternUnits="userSpaceOnUse"
                      patternTransform="translate(-100 0)"
                    >
                      <path d="M.5 200V.5H200" fill="none"/>
                    </pattern>
                  </defs>
                  <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                    <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0}/>
                  </svg>
                  <rect width="100%" height="100%" strokeWidth={0} fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"/>
                </svg>
              </div>
            </div>

            {/* Team section */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Notre équipe</h2>
              </div>
              <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
              >
                {teams.map((person) => (
                  <li key={person.name}>
                    <a href={`/veterinaire/${person.uuid}`}>
                      <img className="mx-auto h-24 w-24 rounded-full" src={person.imageUrl} alt=""/>
                      <h3
                        className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 uppercase">DR. {person.name}</h3>
                      <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonials */}
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
              <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
                <div
                  className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
                  aria-hidden="true"
                >
                  <div
                    className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                  />
                </div>
                <div
                  className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
                  aria-hidden="true"
                >
                  <div
                    className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                  />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Avis</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Avis clients
                    </p>
                  </div>
                  <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                    <figure
                      className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                      <blockquote
                        className="p-6 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:p-12 sm:text-xl sm:leading-8">
                        <p>{`“${featuredTestimonial.body}”`}</p>
                      </blockquote>
                      <figcaption
                        className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                        <img
                          className="h-10 w-10 flex-none rounded-full bg-gray-50"
                          src={featuredTestimonial.author.imageUrl}
                          alt=""
                        />
                        <div className="flex-auto">
                          <div className="font-semibold">{featuredTestimonial.author.name}</div>
                          <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                        </div>
                        <img className="h-10 w-auto flex-none" src={featuredTestimonial.author.logoUrl} alt=""/>
                      </figcaption>
                    </figure>
                    {testimonials.map((columnGroup, columnGroupIdx) => (
                      <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                        {columnGroup.map((column, columnIdx) => (
                          <div
                            key={columnIdx}
                            className={classNames(
                              (columnGroupIdx === 0 && columnIdx === 0) ||
                              (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                                ? 'xl:row-span-2'
                                : 'xl:row-start-1',
                              'space-y-8'
                            )}
                          >
                            {column.map((testimonial) => (
                              <figure
                                key={testimonial.author.handle}
                                className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                              >
                                <blockquote className="text-gray-900">
                                  <p>{`“${testimonial.body}”`}</p>
                                </blockquote>
                                <figcaption className="mt-6 flex items-center gap-x-4">
                                  <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl}
                                       alt=""/>
                                  <div>
                                    <div className="font-semibold">{testimonial.author.name}</div>
                                    <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                  </div>
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}