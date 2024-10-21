import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { useCountryById, useUpdateCountry } from "../../api/countriesApi";
import { useForm } from "../../hooks/form-hook";
import Button from "../../shared/components/Form-Elements/Button";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";
import Input from "../../shared/components/Form-Elements/Input";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";

const CountryUpdateForm = () => {
  const { formState, inputHandler } = useForm();

  const history = useHistory();
  const cId = useParams().cid;

  const {
    data: country,
    isLoading,
    isFetching,
    isFetched,
  } = useCountryById(cId);
  const { mutate: updateCountry } = useUpdateCountry();

  const updateHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("cid", cId);
    formData.append("name", formState.inputs.name.value);
    formData.append("videoUrl", formState.inputs.videoUrl.value);
    if (formState.inputs.flag?.value) {
      formData.append("flag", formState.inputs.flag.value);
    }
    updateCountry(formData);
    history.replace("/cms/countries");
  };

  let content;

  if (isLoading || isFetching) {
    content = <LoadingSpinner asOverlay />;
  }
  if (isFetched) {
    content = (
      <div className="updateForm">
        <h2>Update {country.name}</h2>
        <form onSubmit={updateHandler}>
          <div>
            <div>
              <Input
                id="name"
                type="text"
                placeholder="Country Name"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={country.name}
                initialValid={true}
              />
            </div>
            <div>
              <Input
                id="videoUrl"
                type="text"
                placeholder="Country Name"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={country.videoUrl}
                initialValid={true}
              />
            </div>
            <div>
              <ImageUpload
                id="flag"
                type="file"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                label="Country Flag"
                errorText="Supported extensions are : .jpg, .png, .jpeg"
                initialValid={true}
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
                history.goBack();
              }}
            >
              Back
            </Button>
            <Button mid success disabled={!formState.isValid} type="submit">
              Update Country
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return content;
};

export default CountryUpdateForm;
