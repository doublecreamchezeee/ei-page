import React from "react";

import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_REQUIRE_SELECT,
} from "../../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import { useCountries } from "../../api/countriesApi";
import { useAddUniversity } from "../../api/universitiesApi";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { universityInitials } from "../../shared/utils/form initial data/UniversityInitials";
const UniversityForm = ({ setShowForm }) => {
  const { formState, inputHandler } = useForm(universityInitials);

  const { mutate: addUniversity } = useAddUniversity();
  const {
    data: countries,
    isLoading,
    isFetching,
    isSuccess,
    isFetched,
  } = useCountries();

  const selectOptions = countries?.map((country) => (
    <option key={country._id} value={country._id}>
      {country.name}
    </option>
  ));

  const addCountryHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", formState.inputs.name.value);
    formData.append("countryId", formState.inputs.countryId.value);
    formData.append("generalInfo", formState.inputs.generalInfo.value);
    formData.append("logo", formState.inputs.logo.value);
    formData.append("motto", formState.inputs.motto.value);
    formData.append("videoUrl", formState.inputs.videoUrl.value);
    formData.append("infoBox1Header", formState.inputs.infoBox1Header.value);
    formData.append("infoBox1Content", formState.inputs.infoBox1Content.value);
    formData.append("infoBox2Header", formState.inputs.infoBox2Header.value);
    formData.append("infoBox2Content", formState.inputs.infoBox2Content.value);
    formData.append("infoBox3Header", formState.inputs.infoBox3Header.value);
    formData.append("infoBox3Content", formState.inputs.infoBox3Content.value);

    addUniversity(formData);

    setShowForm(false);
  };

  let content;

  if (isLoading || isFetching) {
    content = <LoadingSpinner />;
  }

  if (isFetched && isSuccess) {
    content = (
      <div className="updateForm">
        <form onSubmit={addCountryHandler}>
          <div>
            <div>
              <Input
                id="name"
                type="text"
                placeholder="School Name"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="countryId"
                element="select"
                options={selectOptions}
                type="text"
                defaultText={"Please pick country"}
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE_SELECT()]}
              />
            </div>
            <div>
              <Input
                id="generalInfo"
                type="text"
                placeholder="School General Info"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <ImageUpload
                id="logo"
                type="file"
                label="Logo"
                errorText=""
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="motto"
                type="text"
                placeholder="School Motto"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="videoUrl"
                type="text"
                placeholder="School Youtube Url"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox1Header"
                type="text"
                placeholder="School Box1 Header"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox1Content"
                type="text"
                placeholder="School Box1 Content"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox2Header"
                type="text"
                placeholder="School Box2 Header"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox2Content"
                type="text"
                placeholder="School Box2 Content"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox3Header"
                type="text"
                placeholder="School Box3 Header"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="infoBox3Content"
                type="text"
                placeholder="School Box3 Content"
                errorText="This field is required"
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
      </div>
    );
  }
  return content;
};

export default UniversityForm;
