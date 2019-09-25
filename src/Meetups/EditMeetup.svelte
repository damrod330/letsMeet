<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  export let editMode = false;
  export let title = "",
    subtitle = "",
    description = "",
    imageUrl = "https://picsum.photos/id/1075/1200",
    address = "",
    contactEmail = "";

  const dispatch = createEventDispatcher();
</script>

<style>
  form {
    flex-grow: 1;
  }

  h1 {
    text-align: center;
  }
  section {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    width: 40rem;
    box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: auto;
  }

  footer {
    margin-top: 2rem;
  }
</style>

<h1>Create new meetup</h1>
<section>

  <form
    on:submit|preventDefault={() => {
      dispatch('submitmeetup', {
        title: title,
        subtitle: subtitle,
        description: description,
        imageUrl: imageUrl,
        address: address,
        contactEmail: contactEmail
      });
    }}>
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
    <footer>
      <Button type="submit" className="success">
        {editMode ? 'Save changes' : 'Create new meetup'}
      </Button>
      <Button
        className="outline"
        on:click={() => {
          dispatch('cancel');
        }}>
        Cancel
      </Button>
    </footer>

  </form>
</section>
