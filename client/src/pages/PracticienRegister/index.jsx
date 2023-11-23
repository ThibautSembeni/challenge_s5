import Input from "@/components/atoms/Inputs/Input.jsx";
import { Button } from "@/components/atoms/Buttons/Button.jsx";
import { useEffect, useState } from "react";

export default function PracticienRegister() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-blue-100 ring-1 ring-blue-900/10 lg:w-1/2"></div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              La nouvelle génération de solutions pour les vétérinaires
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Équipez vous de VétoLib et gagnez du temps au quotidien, gagnez en
              confort de travail et renforcez la communication avec vos patients
              !
            </p>
            <ul className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <li> Des solutions tout-en-un, conçues avec vous</li>
              <li>
                {" "}
                L'innovation au coeur de notre ADN Un service client haut de
                gamme
              </li>
              <li> Le plus haut niveau de protection des données de santé</li>
            </ul>
          </div>
        </div>
        <div className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="relative grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <Input
                  type={"text"}
                  label={"Nom"}
                  required={true}
                  className={"w-full"}
                  name={"lastname"}
                  onChange={handleChange}
                  value={form.lastname}
                />
              </div>
              <div>
                <Input
                  type={"text"}
                  label={"Prénom"}
                  required={true}
                  name={"firstname"}
                  onChange={handleChange}
                  value={form.firstname}
                />
              </div>
              <div>
                <Input
                  type={"text"}
                  label={"Code postal cabinet"}
                  required={true}
                  name={"postalCode"}
                  onChange={handleChange}
                  value={form.postalCode}
                />
              </div>
              <div>
                <Input
                  type={"tel"}
                  label={"Téléphone portable"}
                  required={true}
                  onChange={handleChange}
                  name={"phone"}
                  value={form.phone}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type={"email"}
                  label={"Adresse email"}
                  required={true}
                  name={"email"}
                  onChange={handleChange}
                  value={form.email}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button size="m" color={"blue"} onClick={handleSubmit}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
