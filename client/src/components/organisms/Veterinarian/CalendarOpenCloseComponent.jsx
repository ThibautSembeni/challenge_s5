import React from 'react';

function ClinicScheduleComponent({ clinicSchedules, totalRows, renderTimeRows, dayToColumnIndex, timeToRowIndex, formatTime }) {
  return (
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
  );
}

export default ClinicScheduleComponent;
