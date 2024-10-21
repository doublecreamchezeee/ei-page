import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { useUniversityById } from "../../api/universitiesApi";
import Button from "../../shared/components/Form-Elements/Button";
import Input from "../../shared/components/Form-Elements/Input";
import {
  VALIDATOR_REQUIRE_SELECT,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../hooks/form-hook";
import ImageUpload from "../../shared/components/Form-Elements/FileUpload";
import LoadingSpinner from "../../shared/components/UI-Elements/LoadingSpinner";
import { useCountries } from "../../api/countriesApi";
import { useUpdateUniversity } from "../../api/universitiesApi";

const UniversityUpdateForm = () => {
  const { formState, inputHandler } = useForm();

  const uId = useParams().uid;
  const history = useHistory();

  const { mutate: updateUniversity } = useUpdateUniversity();
  const {
    data: university,
    isLoading: universitiesLoading,
    isFetching: universitiesFetching,
    isFetched: universitiesFetched,
  } = useUniversityById(uId);
  const {
    data: countries,
    isLoading: countriesLoading,
    isFetching: countriesFetching,
    isFetched: countriesFetched,
  } = useCountries();

  const selectOptions = countries?.map((country) => (
    <option key={country._id} value={country._id}>
      {country.name}
    </option>
  ));

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("universityId", uId);
    formData.append("name", formState.inputs.name.value);
    formData.append("countryId", formState.inputs.countryId.value);
    formData.append("info", formState.inputs.info.value);
    formData.append("motto", formState.inputs.motto.value);
    formData.append("videoUrl", formState.inputs.videoUrl.value);
    formData.append("infoBox1Header", formState.inputs.infoBox1Header.value);
    formData.append("infoBox1Content", formState.inputs.infoBox1Content.value);
    formData.append("infoBox2Header", formState.inputs.infoBox2Header.value);
    formData.append("infoBox2Content", formState.inputs.infoBox2Content.value);
    formData.append("infoBox3Header", formState.inputs.infoBox3Header.value);
    formData.append("infoBox3Content", formState.inputs.infoBox3Content.value);

    if (formState.inputs.logo?.value) {
      formData.append("logo", formState.inputs.logo.value);
    }

    updateUniversity(formData);
    history.goBack();
  };

  let content;

  if (
    universitiesLoading ||
    universitiesFetching ||
    countriesLoading ||
    countriesFetching
  ) {
    content = <LoadingSpinner asOverlay />;
  }
  if (universitiesFetched && countriesFetched) {
    content = (
      <div className="updateForm">
        <h2>Update {university.name}</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <div>
              <Input
                id="name"
                type="text"
                placeholder="School Name"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={university.name}
                initialValid={true}
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
                defaultValue={university.country}
                initialValid={true}
                initialValue={university.country}
              />
            </div>
            <div>
              <Input
                id="info"
                type="text"
                placeholder="School Info"
                errorText="This field is required"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
                initialValue={university.generalInfo}
                initialValid={true}
              />
            </div>
            <div>
              <ImageUpload
                id="logo"
                type="file"
                label="University Logo"
                onInputChange={inputHandler}
                errorText="Supported extensions are : .jpg, .png, .jpeg"
                validators={[VALIDATOR_REQUIRE()]}
                initialValid={true}
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
                initialValue={university.motto}
                initialValid={true}
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
                initialValue={university.videoUrl}
                initialValid={true}
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
                initialValue={university.infoBoxes.box1.header}
                initialValid={true}
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
                initialValue={university.infoBoxes.box1.content}
                initialValid={true}
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
                initialValue={university.infoBoxes.box2.header}
                initialValid={true}
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
                initialValue={university.infoBoxes.box2.content}
                initialValid={true}
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
                initialValue={university.infoBoxes.box3.header}
                initialValid={true}
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
                initialValue={university.infoBoxes.box3.content}
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
              Save University
            </Button>
          </div>
        </form>
      </div>
    );
  }
  return content;
};

export default UniversityUpdateForm;
