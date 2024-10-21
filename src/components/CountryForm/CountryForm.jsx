import React from "react";

import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";
import { useAddCountry } from "../../api/countriesApi";
import { countryInitials } from "../../shared/utils/form initial data/CountryInitials";
const CountryForm = ({ setShowForm }) => {
  const { formState, inputHandler } = useForm(countryInitials);
  const { mutate: addCountry } = useAddCountry();

  const addCountryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formState.inputs.name.value);
    formData.append("videoUrl", formState.inputs.videoUrl.value);
    formData.append("flag", formState.inputs.flag.value);
    addCountry(formData);

    setShowForm(false);
  };
  return (
    <form onSubmit={addCountryHandler}>
      <div>
        <div>
          <Input
            id="name"
            type="text"
            placeholder="Country Name"
            errorText="This field is required"
            onInputChange={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <div>
          <Input
            id="videoUrl"
            type="text"
            placeholder="Video Url"
            errorText="This field is required"
            onInputChange={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <div>
          <ImageUpload
            id="flag"
            type="file"
            label="Flag Image"
            onInputChange={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button
          mid
          warning
          onClick={() => {
            setShowForm(false);
          }}
        >
          Back
        </Button>
        <Button mid success disabled={!formState.isValid} type="submit">
          Add Country
        </Button>
      </div>
    </form>
  );
};

export default CountryForm;
