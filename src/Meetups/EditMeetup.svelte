<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";

  export let editMode = false;
  export let title = "",
    subtitle = "",
    description = "",
    imageUrl = "https://picsum.photos/id/1075/1200",
    address = "",
    contactEmail = "";

  const dispatch = createEventDispatcher();

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
      value={title}
      on:input={e => (title = e.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={e => (subtitle = e.target.value)} />
    <TextInput
      id="description"
      label="Description"
      value={description}
      rows="4"
      controlType="textarea"
      on:input={e => (description = e.target.value)} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={e => (address = e.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={e => (imageUrl = e.target.value)} />
    <TextInput
      id="contactEmail"
      label="Contact E-Mail"
      value={contactEmail}
      type="email"
      on:input={e => (contactEmail = e.target.value)} />
  </form>

  <div slot="footer">
    <Button type="button" className="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>
