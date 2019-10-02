<script>
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import meetups from "./meetups-store.js";
  import { createEventDispatcher } from "svelte";
  import Loadingspinner from "../UI/LoadingSpinner.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let contactEmail;
  export let isFavorite;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  function toggleFavorite() {
    isLoading = true;
    fetch(`https://let-s-meet-82eef.firebaseio.com/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFavorite }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occured, please try again!");
        }
        isLoading = false;
        meetups.toggleFavorite(id);
      })
      .catch(err => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<style>
  article {
    box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .content {
    height: 4rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  footer {
    display: flex;
    align-content: flex-end;
  }
</style>

<article>
  <header>
    <h1>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt="profile Image" />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button
      type="button"
      className="outline"
      on:click={() => dispatch('edit', id)}>
      Edit
    </Button>
    {#if isLoading}
      <Loadingspinner/>
    {:else}
      <Button
        className={isFavorite ? null : 'success'}
        type="button"
        on:click={toggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </Button>
    {/if}

    <Button type="button" on:click={() => dispatch('showdetails', id)}>
      Show Details
    </Button>
  </footer>
</article>
