<script>
  import Header from "./UI/Header.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  let title = "",
    subtitle = "",
    description = "",
    imageUrl = "https://picsum.photos/id/1075/1200",
    address = "",
    contactEmail = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "In this meetup, we will learn stuff and it will be great!",
      imageUrl: "https://picsum.photos/id/1075/1200",
      address: "Wojska Polskiego 8, 41-205 Sosnowiec",
      contactEmail: "learn.code@gmail.com"
    },
    {
      id: "m2",
      title: "Lear Svelte",
      subtitle: "Learn Svelte!",
      description: "Great place to get started learning Svelte.",
      imageUrl: "https://picsum.photos/id/1076/1200",
      address: "Wojska Polskiego 8, 41-205 Sosnowiec",
      contactEmail: "svelte.code@test.com"
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      address: address,
      imageUrl: imageUrl,
      contactEmail: contactEmail
    };

    // meetups.push(newMeetup); // does not WORK!
    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>

  <form on:submit|preventDefault={addMeetup}>
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
    <Button type="submit" caption="Save" />
  </form>

  <MeetupGrid {meetups} />
</main>
