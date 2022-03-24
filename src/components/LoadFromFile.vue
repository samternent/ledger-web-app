<template>
  <label>
    <div class="truncate flex items-center text-xs items-center justify-center px-3 py-2 border border-a text-base font-medium rounded-tl-md rounded-br-md text-a border-2 hover:bg-a hover:text-primary-background cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <span class="hidden md:block ml-2">Import from File</span>
    </div>
    <input type="file" class="hidden" @change="importLedger">
  </label>
</template>
<script>
export default {
  setup(props, { emit }) {
     async function onLoadFileHandler(e) {
      emit('load', { pending_records: [], ...JSON.parse(e.target.result) });
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