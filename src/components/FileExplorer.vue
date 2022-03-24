<template>
  <TreeView
    :folderName='data.folderName'
    :folders='data.folders'
    :depth='0' />
</template>
<script>
import { inject } from "vue";
import TreeView from "./TreeView.vue";

const data = {
   folderName: 'Root Folder',
   folders: [
      {
         folderName: 'Folder 1',
         files: ['Folder 1 file a', 'Folder 1 file b'],
         folders: [
            {
               folderName: 'Folder 2.1',
               files: ['Folder 2.1 file a', 'Folder 2.1 file b']
            },
            {
               folderName: 'Folder 2.2',
               files: ['Folder 2.2 file a', 'Folder 2.2 file b'],
               folders: [
                  {
                     folderName: 'Folder 2.2.1',
                     files: ['Folder 2.2.1 file a', 'Folder 2.2.1 file b']
                  }
               ]
            }
         ]
      }
   ]
};

export default {
  components: { TreeView },
  setup() {
    const { ledger } = inject('ledger');
    return {
      ledger,
      data,
    };
  },
}
</script>