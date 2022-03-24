<template>
  <button @click="saveKey" class="btn btn-primary btn-sm">
    <slot />
  </button>
</template>
<script>

export default {
  props: {
    fileName: {
      type: String,
      default: 'concords.json',
    },
    data: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    async function saveKey() {
      const filename = `${props.fileName}.json`;
      const blob = new Blob([props.data], {type: 'application/x-pem-file'});

      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
      }
    }

    return { saveKey };
  }
}
</script>