import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Input, Button } from "@nextui-org/react";
import { z } from "zod";
import { BottomGradient } from "../../../SignIn";
import { useSetRecoilState } from "recoil";
import { storeAtom } from "../../../../../context/atoms/storeAtom";
import { useNavigate } from "react-router-dom";
import { encryptData } from "../../../../../lib/crypto";
import { useSelector } from "react-redux";
import {addToast} from '@heroui/toast'
const storeSchema = z.object({
  storeLocation: z.string().min(1, "Store location is required"),
  storeName: z.string().min(1, "Store name is required"),
  storeCurrency: z.string().min(1, "Store currency is required"),
  locationFlag: z.string().min(1, "Location flag is required"),
  userId: z.string().min(1, "User id is required"),
});

const StoreForm = ({ setAnimationTime }) => {
  const { user } = useSelector((state) => state.user); // Retrieve user data from Redux
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeLocation: "",
      storeName: "",
      storeCurrency: "",
      locationFlag: "",
      ...(user && { userId: user._id }),
    },
  });

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const formattedData = data.map((country) => ({
          name: country.name.common,
          currency: Object.keys(country.currencies || {})[0] || "",
          flag: country.flags.svg,
        }));
        setCountries(formattedData);
        setFilteredCountries(formattedData); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (input) => {
    if (!input) {
      setFilteredCountries(countries);
      return;
    }
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const [loading, setLoading] = useState(false);
  const setStore = useSetRecoilState(storeAtom);
  const navigate = useNavigate();

  const buildStore = async (data) => {
    if (!user) {
      // Redirect to signup if user data is missing
      navigate("/signup");
      return;
    }

    console.log(user);
    setLoading(true);
    setAnimationTime({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: "hsla(0,0%,100%,1)",
      minHeight: "100vh",
      backgroundImage:
        "radial-gradient(at 17% 0%, hsla(281deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 98% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 33% 87%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 65% 86%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 61% 21%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 36% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 31% 31%, hsla(248deg, 100%, 66%, 0.8) 0, transparent 50%), radial-gradient(at 42% 32%, hsla(248deg, 83%, 76%, 1) 0, transparent 50%), radial-gradient(at 0% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 10% 66%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 64% 56%, hsl(222.1, 100%, 57.3%) 0, transparent 50%), radial-gradient(at 68% 46%, hsla(180deg, 43%, 53%, 1) 0, transparent 50%), radial-gradient(at 99% 98%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 67% 59%, hsla(194deg, 100%, 73%, 1) 0, transparent 50%)",
      animation: "pulseGradient 1s infinite alternate ease-in-out",
    });

    try {
      const res = await fetch("http://localhost:8080/api/add-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const results = await res.json();
      if (results.error) {
        console.log("Error", results.error, "error");
        setLoading(false);
        return;
      }

      localStorage.removeItem("store");
      localStorage.setItem("store", encryptData(results));
      setStore(results);
      console.log(results);

      setTimeout(() => {
        navigate(`/store-panel/home`);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Error", error, "error");
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    buildStore(data); // Call buildStore on form submit
  };

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState("");

  return !loading ? (
    <div className="flex items-center w-[500px] shadow-input h-auto flex-col p-5 pb-6 bg-white rounded-xl">
      <div className="grid gap-0 w-full text-[#303030]">
        <h1 className="text-[1.4rem] leading-tight">Give your store a name and a location</h1>
        <p style={{ fontWeight: "500" }} className="text-[.9rem]  text-gray-400 leading-tight">
          This helps us suggest the best choices
        </p>
      </div>
      <div className="w-full flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mt-3 flex-col w-full gap-4">
          <Controller
            name="storeName"
            control={control}
            render={({ field }) => <Input {...field} label="Store Name" error={errors.storeName?.message} />}
          />
          <div className="w-full grid grid-cols-2 items-center gap-2">
            <Controller
              name="storeCurrency"
              control={control}
              render={({ field }) => <Input {...field} label="Store Currency" error={errors.storeCurrency?.message} readOnly />}
            />

            <Controller
              name="storeLocation"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  label="Store Location"
                  placeholder="Search or select a country"
                  selectedKey={selectedCountry}
                  inputValue={inputValue}
                  onInputChange={(value) => {
                    setInputValue(value);
                    handleSearch(value);
                  }}
                  onSelectionChange={(selected) => {
                    setSelectedCountry(selected);
                    const country = countries.find((c) => c.name === selected);
                    if (country) {
                      setValue("storeLocation", country.name);
                      setValue("storeCurrency", country.currency);
                      setValue("locationFlag", country.flag);
                      setInputValue(country.name); // Set the input value to the selected country name
                    }
                  }}
                >
                  {filteredCountries.map((country) => (
                    <AutocompleteItem key={country.name} value={country.name}>
                      <div className="flex items-center gap-2">
                        <img src={country.flag} alt={country.name} className="w-5 h-5" />
                        {country.name}
                      </div>
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              )}
            />
          </div>

          <button type="submit" className="relative group/btn flex space-x-2 mb-0 pb-0 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]">
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">Submit</span>
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  ) : (
    addToast({
      title: "Creating New Store",
      promise: new Promise((resolve) => setTimeout(resolve, 3000)),
    })
  );
};

export default StoreForm;


