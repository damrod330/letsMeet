<script>
  export let value;
  export let controlType = null;
  export let rows = null;
  export let type = "text";
  export let id;
  export let label;
  export let valid = true;
  export let validityMessage = "";

  let touched = false;
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.35rem 0.7rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    color: #8a4a63;
    display: block;
    margin-bottom: 0.3rem;
    margin-left: 0.7rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
  }

  .invalid {
    border-color: red;
    background: rgb(255, 244, 244);
  }

  .error-message {
    color: red;
    margin: 0.25tem 0;
  }
</style>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <textarea
      class:invalid={!valid && touched}
      {rows}
      {id}
      bind:value
      on:blur={() => (touched = true)} />
  {:else}
    <input
      class:invalid={!valid && touched}
      {type}
      {id}
      {value}
      on:input
      on:blur={() => (touched = true)} />
  {/if}
  {#if validityMessage && !valid && touched}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
