import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/organisms/Search/SearchInput.jsx";
//translation
import { useTranslation } from "react-i18next";

export default function HeroSection() {
    //translation
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?city=${searchValue}`);
    };

    return (
        <div className="bg-blue-500 text-white h-60 flex items-center justify-center">
            <div className="text-center w-full">
                <h1 className="text-3xl font-bold mb-4">
                    {t("components.organisms.home.heroSection.h1")}
                </h1>
                <p className="text-md mb-6">
                    {t("components.organisms.home.heroSection.p")}
                </p>
                <form
                    className="flex flex-1 items-center justify-center px-2 lg:ml-6 w-full"
                    onSubmit={handleSubmit}
                >
                    <SearchInput
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </form>
            </div>
        </div>
    );
}
