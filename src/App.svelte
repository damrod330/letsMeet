<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

  let editMode = null;
  let editedId = null;
  let page = "overview";
  let pageData = {};

  function saveMeetup() {
    editMode = null;
    editedId = null;
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
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

  .meetup-controls {
    margin: 1rem;
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    <div class="meetup-controls">
      <Button
        on:click={() => {
          editMode = 'edit';
        }}>
        Create new meetup
      </Button>
    </div>
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit} />
  {:else}
    <MeetupDetails id={pageData.id} on:close={showOverview} />
  {/if}

</main>
