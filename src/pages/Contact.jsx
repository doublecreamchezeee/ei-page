import React from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "../hooks/form-hook";
import { ContactInitials } from "../shared/utils/form initial data/ContactUsInitials";
import Input from "../shared/components/Form-Elements/Input";
import Button from "../shared/components/Form-Elements/Button";
import contactUs from "../assets/images/contactUs.jpg";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../shared/utils/validators";
import styles from "./Contact.module.css";
import { toast } from "react-toastify";
import { toastSuccessOpt } from "../shared/utils/toastOptions";
const Contact = () => {
  const { formState, inputHandler } = useForm(ContactInitials);

  const contactSubmitHandler = (e) => {
    e.preventDefault();

    const templateParams = {
      email: formState.inputs.email.value,
      fullname: formState.inputs.fullname.value,
      message: formState.inputs.message.value,
    };
    emailjs
      .send(
        "service_79sivws",
        "template_9vi5fpi",
        templateParams,
        import.meta.env.VITE_EMAILJS_API_KEY
      )
      .then((response) => {
        if (response.status === 200)
          toast.success(
            "We recieved your email and we will get back to you ASAP!",
            toastSuccessOpt
          );
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className={styles.content}>
      <div className={styles.sideBar}>
        <div className={styles.contactInfo}>
          <h3>Direct Email</h3>
          <strong>asd@info.com</strong>
        </div>
        <div className={styles.contactInfo}>
          <h3>Phone Number</h3>
          <strong>+321321321</strong>
        </div>
      </div>

      <div className={styles.topRow}>
        <img src={contactUs} alt="confused" />
      </div>
      <div className={styles.botRow}>
        <div className={styles.form}>
          <form onSubmit={contactSubmitHandler}>
            <h3 className={styles.formTitle}>Contact Us</h3>
            <div>
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="ex@example.com"
                errorText="Enter a valid email"
                onInputChange={inputHandler}
                validators={[VALIDATOR_EMAIL()]}
              />
            </div>
            <div>
              <Input
                id="fullname"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                errorText="Enter a valid name"
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div>
              <Input
                id="message"
                type="text"
                element="textarea"
                label="Your Message"
                placeholder="Enter your message here"
                errorText="Please don't leave this section empty."
                initialValue={"I'd like to get information about your service."}
                initialValid={true}
                onInputChange={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </div>
            <div className={styles.formAction}>
              <Button type="submit" disabled={!formState.isValid} success mid>
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
