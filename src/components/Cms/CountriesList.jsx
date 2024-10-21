import React, { useState } from "react";
import { useCountries, useRemoveCountry } from "../../api/countriesApi";
import { useSearchStore } from "../../store/searchStore";
import CountryForm from "../CountryForm/CountryForm";
import Button from "../../shared/components/Form-Elements/Button";
import Card from "../../shared/components/UI-Elements/Card";
import SearchBar from "../../shared/components/UI-Elements/SearchBar";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";

import styles from "./UserList.module.css";
const CountriesList = () => {
  const search = useSearchStore((state) => state.search);

  const [showForm, setShowForm] = useState(false);

  const { data: countries, isLoading, isFetching, isFetched } = useCountries();
  const { mutate: removeCountry } = useRemoveCountry();
  const deleteCountryHandler = (id) => {
    removeCountry(id);
  };

  let content;

  if (isLoading || isFetching) {
    content = <LoadingSpinner asOverlay />;
  }

  if (isFetched) {
    content = (
      <div className={styles.listPage}>
        {showForm && (
          <div
            style={{ width: "100%", display: "flex", placeContent: "center" }}
          >
            <CountryForm setShowForm={setShowForm} />
          </div>
        )}
        {!showForm && (
          <>
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
            <div className={styles.addEmp}>
              <Button
                onClick={() => {
                  setShowForm(true);
                }}
                mid
                success
              >
                Add Country
              </Button>
            </div>
            <div className={styles.list}>
              {countries
                ?.filter((c) =>
                  c.name?.toLowerCase().includes(search.toLowerCase())
                )
                .map((country) => (
                  <Card
                    key={country._id}
                    name={country.name}
                    image={country.flag.url}
                    actions={
                      <>
                        <Button warning to={`/cms/countries/${country._id}`}>
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            deleteCountryHandler(country._id);
                          }}
                          danger
                        >
                          Del
                        </Button>
                      </>
                    }
                  />
                ))}
            </div>
          </>
        )}
      </div>
    );
  }
  return content;
};

export default CountriesList;
