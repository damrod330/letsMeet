<script>
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let meetups;

  let favsOnly = false;

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<style>
  #meetup-controlls {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem;
    margin-top: 5rem;
  }

  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
  }

  #no-meetups {
    margin: 1rem;
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
  <Button on:click={() => dispatch('edit')}>Create new meetup</Button>
</section>
{#if filteredMeetups.length === 0}
   <p id="no-meetups">No meetups found, you can start adding some.</p>
{:else}
  <section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem
        {...meetup}
        contactEmail={meetup.contactEmail}
        on:showdetails
        on:edit />
    </div>
  {/each}
</section>
{/if}

