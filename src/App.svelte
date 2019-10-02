<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  let editMode = null;
  let editedId = null;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error = null;

  fetch("https://let-s-meet-82eef.firebaseio.com/meetups.json")
    .then(res => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed.");
      }
      return res.json();
    })
    .then(data => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key
        });
      }
      meetups.setMeetups(loadedMeetups.reverse());
      isLoading = false;
    })
    .catch(err => {
      isLoading = false;
      error = err;
      console.log(err);
    });

  function saveMeetup() {
    editMode = null;
    editedId = null;
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail ? event.detail : null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    pageData.id = event.detail;
    page = "details";
  }

  function showOverview() {
    pageData = {};
    page = "overview";
  }
</script>

<style>
  main {
    margin-top: 4rem;
  }
</style>

{#if error}
  <Error
    message={error.message}
    on:cancel={() => {
      console.log('click');
      error = null;
    }} />
{/if}

<Header />
<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if !isLoading}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit} />
    {:else}
      <LoadingSpinner />
    {/if}
  {:else}
    <MeetupDetails id={pageData.id} on:close={showOverview} />
  {/if}

</main>
