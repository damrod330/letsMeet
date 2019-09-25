<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

  let currentPage = "meetupgrid";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description: "In this meetup, we will learn stuff and it will be great!",
      imageUrl: "https://picsum.photos/id/1075/1200",
      address: "Wojska Polskiego 8, 41-205 Sosnowiec",
      contactEmail: "learn.code@gmail.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Lear Svelte",
      subtitle: "Learn Svelte!",
      description: "Great place to get started learning Svelte.",
      imageUrl: "https://picsum.photos/id/1076/1200",
      address: "Wojska Polskiego 8, 41-205 Sosnowiec",
      contactEmail: "svelte.code@test.com",
      isFavorite: false
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

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  {#if currentPage === 'editmeetup'}
    <EditMeetup />
  {:else}
    <Button
      on:click={() => {
        currentPage = 'editmeetup';
      }}>
      Create new meetup
    </Button>
    <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
  {/if}
</main>
