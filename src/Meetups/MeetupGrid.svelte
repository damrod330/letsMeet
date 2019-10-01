<script>
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  export let meetups;

  let favsOnly = false;

  $: filteredMeetups = favsOnly
    ? meetups.filter(m => m.isFavorite)
    : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<style>
  #meetup-controlls {
    margin: 1rem;
  }

  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1200px) {
    #meetups {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>

<section id="meetup-controlls">
  <MeetupFilter on:select={setFilter} />
</section>

<section id="meetups">
  {#each filteredMeetups as meetup}
    <MeetupItem
      {...meetup}
      contactEmail={meetup.contactEmail}
      on:showdetails
      on:edit />
  {/each}
</section>
