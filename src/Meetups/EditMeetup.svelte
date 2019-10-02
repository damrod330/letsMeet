<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/vaidation.js";
  import meetups from "./meetups-store.js";

  export let id = null;

  export let title = "",
    subtitle = "",
    description = "",
    imageUrl = "https://picsum.photos/id/1075/1200",
    address = "",
    contactEmail = "";

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      let selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
      address = selectedMeetup.address;
      contactEmail = selectedMeetup.contactEmail;
    });
    unsubscribe();
  }

  let formIsValid = false;

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: contactEmailValid = !isEmpty(contactEmail) && isValidEmail(contactEmail);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    imageUrlValid &&
    addressValid &&
    contactEmailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      address: address,
      imageUrl: imageUrl,
      contactEmail: contactEmail
    };

    if (id) {
      fetch(`https://let-s-meet-82eef.firebaseio.com/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(meetupData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occured, please try again!");
          }
          meetups.updateMeetup(id, meetupData);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch("https://let-s-meet-82eef.firebaseio.com/meetups.json", {
        method: "POST",
        body: JSON.stringify({ ...meetupData, isFavorite: false }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occured, please try again!");
          }
          return res.json();
        })
        .then(data => {
          meetups.addMeetup({ meetupData, isFavorite: false, id: data.name });
        })
        .catch(err => {
          console.log(err);
        });
    }
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }

  function deleteMeetup() {
    if (id) {
      fetch(`https://let-s-meet-82eef.firebaseio.com/meetups/${id}.json`, {
        method: "DELETE"
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occured, please try again!");
          }
          meetups.deleteMeetup(id);
          dispatch("save");
        })
        .catch(err => {
          console.log(err);
        });
    }
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
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}

  </div>
</Modal>
