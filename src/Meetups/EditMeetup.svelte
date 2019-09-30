<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/vaidation.js";

  export let title = "",
    subtitle = "",
    description = "",
    imageUrl = "https://picsum.photos/id/1075/1200",
    address = "",
    contactEmail = "";

    let formIsValid = false;

  // export let titleValid = false,
  //   subtitleValid = false,
  //   descriptionValid = false,
  //   imageUrlValid = false,
  //   addressValid = false,
  //   contactEmailValid = false;

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: contactEmailValid = !isEmpty(contactEmail) && isValidEmail(contactEmail);
  $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && contactEmailValid;

  function submitForm() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: contactEmail
    });
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter valid title"
      value={title}
      on:input={e => (title = e.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter valid subtitle"
      value={subtitle}
      on:input={e => (subtitle = e.target.value)} />
    <TextInput
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter valid description"
      rows="4"
      controlType="textarea"
      bind:value={description} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      valid={addressValid}
      validityMessage="Please enter valid address"
      on:input={e => (address = e.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      valid={imageUrlValid}
      validityMessage="Please enter valid image URL"
      on:input={e => (imageUrl = e.target.value)} />
    <TextInput
      id="contactEmail"
      label="Contact E-Mail"
      value={contactEmail}
      valid={contactEmailValid}
      validityMessage="Please enter valid contact E-Mail"
      type="email"
      on:input={e => (contactEmail = e.target.value)} />
  </form>

  <div slot="footer">
    <Button type="button" className="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
  </div>
</Modal>
