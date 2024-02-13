// const sections = [
//     {
//         title: "Profile",
//         description: "This information will be displayed publicly so be careful what you share.",
//         fields: [
//             {
//                 id: "website",
//                 label: "Website",
//                 type: "input",
//                 inputType: "text",
//                 className: "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6",
//                 placeholder: "www.example.com",
//                 grid: "sm:col-span-4"
//             },
//             {
//                 id: "about",
//                 label: "About",
//                 type: "textarea",
//                 rows: 3,
//                 className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
//                 defaultValue: "",
//                 grid: "col-span-full"
//             },
//               {
//                   id: "agree",
//                   title: "I agree to the terms and conditions",
//                   subTitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quibusdam.",
//                   type: "checkbox",
//                   className: "form-checkbox h-5 w-5 text-indigo-600",
//                   defaultChecked: false,
//                   grid: "sm:col-span-4"
//               },
//             // Ajoutez plus de champs ici...
//         ]
//     },
//     // Ajoutez plus de sections ici...
// ];
export default function TwoColumnsForm({ sections }) {
  return (
    <form>
      <div className="space-y-12">
        {sections.map((section, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3"
          >
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {section.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {section.description}
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className={field.grid}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {field.label}
                  </label>
                  <div className="mt-2">
                    {field.type === "input" && (
                      <input
                        type={field.inputType}
                        name={field.id}
                        id={field.id}
                        className={field.className}
                        placeholder={field.placeholder}
                      />
                    )}
                    {field.type === "textarea" && (
                      <textarea
                        id={field.id}
                        name={field.id}
                        rows={field.rows}
                        className={field.className}
                        defaultValue={field.defaultValue}
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        id={field.id}
                        name={field.id}
                        className={field.className}
                      >
                        {field.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === "checkbox" && (
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            type="checkbox"
                            id={field.id}
                            name={field.id}
                            className={field.className}
                            defaultChecked={field.defaultChecked}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor={field.id}
                            className="font-medium text-gray-900"
                          >
                            {field.title}
                          </label>
                          <p className="text-gray-500">{field.subTitle}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
