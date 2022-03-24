<template>
  <label>
    <div class="btn btn-outline btn-secondary">
      <slot />
    </div>
    <input type="file" class="hidden" @change="importLedger">
  </label>
</template>
<script>
export default {
  props: {

  },
  setup(props, { emit }) {
     async function onLoadFileHandler(e) {
      emit('load', e.target.result);
    }

    function importLedger(event) {
      let input = event.target;
      if (!input.files)
          throw ("This browser does not support the `files` property of the file input.");
      if (!input.files[0])
          return undefined;
      const file = input.files[0];
      let fr = new FileReader();
      fr.onload = onLoadFileHandler;
      fr.readAsText(file);
    }

    return {
      importLedger
    }
  },
}
</script>